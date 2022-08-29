import { Dependencies, Logger, Module, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import Web3 from 'web3';
import fs from 'fs'
import moment from 'moment';
import path from 'path';

import { Collection } from '../../database/Models/collection.model';
import { Asset } from '../../database/Models/asset.model';
import { Trait } from '../../database/Models/trait.model';
import { TraitValue } from '../../database/Models/traitValue.model';
import { Event } from '../../database/Models/event.model';
import { OriginalCollection } from '../../database/Models/originalCollection.model';
import { CollectionStat } from '../../database/Models/collectionStat.model';
import { BullQueueProvider } from '../BullQueue/bullQueue.provider';
import { GlobalSettings } from '../../database/Models/globalSettings.model';

@Dependencies(BullQueueProvider)
@Injectable()
export class ParseProvider {
  constructor(bullQueueProvider, @Inject('SEQUELIZE') sequelize, @Inject('winston') winston) {
    /**
     * Axios Экземплят HTTP клиента Axios
     * @var {Axios}
     * */
    this.http = new HttpService();

    /**
     * Web3 socket provider
     * @var {Web3.providers}
     * */
    this.provider = new Web3.providers.WebsocketProvider(process.env.WEB3_PROVIDER);

    /**
     * Экземпляр Web3
     * @var {Web3}
     * */
    this.web3 = new Web3(this.provider);

    /**
     * Экземпляр sequelize
     * @var {sequelize}
     * */
    this.sequelize = sequelize;

    /**
     * Экземпляр winston
     * @var {winston}
     * */
    this.winston = winston;

    /**
     * Флаг для работы цикла парсинга
     * @var {bool}
     * @default true
     * */
    this.isParserEnabled = true;

    /**
     * Таймаут для каждой итерации цикла парсинга  по умолчанию
     * @var {number}
     * @default 100
     * */
    this.parserTimeout = 100;

    /**
     * Экземпляр сервиса отложенных очередей bull
     * @var {bullQueueProvider}
     * */
    this.queueProvider = bullQueueProvider;
  }

  /**
   * Запуск очереди записи коллекций в базу данных
   *
   * @function
   * @deprecated
   */
  async setCollections() {
    const originals = await OriginalCollection.findAll({raw: true});

    for (let original of originals) {
      await this.queueProvider.createSetCollectionJob({
        original_collection_id: original.id,
        slug: original.slug
      })
    }

    this.queueProvider.allCollections.resume(false);
  }

  /**
   * Метод для записи коллекций в базу данных. Используется процессором очереди setAllCollections
   *
   * @function
   * @deprecated
   */
  setCollection({ slug, original_collection_id }) {
    return this.http.get(`https://api.opensea.io/api/v1/collection/${slug}`, {
      headers: {
        'X-API-KEY': process.env.OPENSEA_KEY
      }
    }).toPromise()
      .then(async (response) => {
        const collectionData = response.data.collection;

        console.log(collectionData.name);
        console.log(collectionData.primary_asset_contracts[0].address);

        const collection = await Collection.create({
          original_collection_id,
          name: collectionData.name,
          slug,
          // contract: collectionData.primary_asset_contracts[0].address,
          image_url: collectionData.image_url,
          link_opensea: `https://opensea.io/collection/${slug}`,
          link_website: collectionData.external_url,
          link_discord: collectionData.discord_url,
          link_twitter: `https://twitter.com/${collectionData.twitter_username}`,
        });

        await CollectionStat.create({
          collection_id: collection.id,
          one_day_volume: collectionData.stats.one_day_volume,
          one_day_change: collectionData.stats.one_day_change,
          one_day_sales: collectionData.stats.one_day_sales,
          one_day_average_price: collectionData.stats.one_day_average_price,
          seven_day_volume: collectionData.stats.seven_day_volume,
          seven_day_change: collectionData.stats.seven_day_change,
          seven_day_sales: collectionData.stats.seven_day_sales,
          seven_day_average_price: collectionData.stats.seven_day_average_price,
          thirty_day_volume: collectionData.stats.thirty_day_volume,
          thirty_day_change: collectionData.stats.thirty_day_change,
          thirty_day_sales: collectionData.stats.thirty_day_sales,
          thirty_day_average_price: collectionData.stats.thirty_day_average_price,
          total_volume: collectionData.stats.total_volume,
          total_sales: collectionData.stats.total_sales,
          total_supply: collectionData.stats.total_supply,
          count: collectionData.stats.count,
          num_owners: collectionData.stats.num_owners,
          average_price: collectionData.stats.average_price,
          num_reports: collectionData.stats.num_reports,
          market_cap: collectionData.stats.market_cap,
          floor_price: collectionData.stats.floor_price,
        })
      })
  }

  /**
   * Запуск цикла обновления статистики для всех коллекций
   *
   * @function
   * @param {Object} params
   * @param {number} params.limit Размер списка самых неактуальных коллекций
   * @param {number} params.order Номер обрабатываемой коллекции
   */
  async setStats({ limit, order }) {
    while(this.isParserEnabled) {
      await GlobalSettings.update(
        { value_date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z' },
        { where: { sysName: 'parserLastUpdate' } }
      );

      await this.startSetStatJob({ limit, order })
       .then(async () => {
            await this.timeout(this.parserTimeout);
       })
       .catch(async err => {
           if (err.response.status === 429) {
             await this.timeout(10000);
           } else if (err.response.status >= 500) {
             await this.timeout(300000);
           } else {
             await this.timeout(30000);
           }

           console.log(err);
       });
    }
  }

  /**
   * Поиск и запуск обновления статистики для коллекции с самыми  старыми данным
   *
   * @function
   * @param {Object} params
   * @param {number} params.limit Размер списка самых неактуальных коллекций
   * @param {number} params.order Номер обрабатываемой коллекции
   */
  async startSetStatJob({ limit, order }) {
    const [lastCollections] = await this.sequelize.query(`SELECT max(stat."createdAt") AS last, stat.collection_id FROM collection_stats stat, collections
      WHERE stat.collection_id = collections.id AND collections.parse_collection IS TRUE
      GROUP BY collection_id ORDER BY last LIMIT :limit;`,
      { replacements: { limit } }
    );

    let collection = await Collection.findOne({
      where: { id: lastCollections[order].collection_id},
      raw: true
    });

    console.log('before  craerte start job');

    await this.setSingleStat({
      collection_id: collection.id,
      slug: collection.slug
    });
  }

  /**
   * Запись статистики для одной коллекции
   *
   * @function
   * @param {Object} params
   * @param {number} params.collection_id ID коллекции.
   * @param {string} params.slug Slug коллекции.
   *
   * @return {Promise} Promise
   */
  async setSingleStat({ collection_id, slug }) {
    console.log(collection_id, ' === ', slug);

    return this.http.get(`https://api.opensea.io/api/v1/collection/${slug}/stats`, {
      headers: {
        'X-API-KEY': process.env.OPENSEA_KEY
      }
    }).toPromise()
      .then(async (response) => {
        this.writeAdvancedLogs(`Collection: ${slug} - ${collection_id}. Opensea response status 200: ${JSON.stringify(response.data, 2, '\t')}`)

        if (!response.data.stats) {
          this.writeAdvancedLogs(`Collection: ${slug} - ${collection_id}. Opensea response status 200: no stats`)
          this.sendErrorToSlack(`${collection_id}:${slug} - Collection not found`);
        }

        const collectionStats = response.data.stats;

        console.log({
          collection_id,
          ...collectionStats
        }, ' values');

        await CollectionStat.create({
          collection_id,
          ...collectionStats
        }).catch(err  => {
          this.sendErrorToSlack(`DB error`);
          this.writeAdvancedLogs(`ERROR. Unexpected error`)
          this.writeLogs(`ERROR. Unexpected error`)
          throw err;
        })

        this.writeAdvancedLogs(`Collection: ${slug} - ${collection_id}. Collections stat written: ${collection_id}`)
      })
      .catch(async err => {
        if (err.response.status === 404) {
          await Collection.update(
            { show_collection: false, parse_collection: false },
            { where: { id: collection_id } }
          )
          this.sendErrorToSlack(`${collection_id}:${slug} - Collection not found`);
        } else if (err.response.status === 429) {
          this.sendErrorToSlack(`${collection_id}:${slug} - Too Many Requests`);
          this.writeAdvancedLogs(`ERROR (${err.response.statusText}). Collection: ${slug} - ${collection_id}`)
          this.writeLogs(`ERROR (${err.response.statusText}). Collection: ${slug} - ${collection_id}`)

          throw err;
        } else if (err.response.status > 500) {
          this.sendErrorToSlack(`Opensea Unavailable`);
          this.writeAdvancedLogs(`ERROR (${err.response.status} : ${err.response.statusText}). Opensea Unavailable`)
          this.writeLogs(`ERROR (${err.response.status} : ${err.response.statusText}). Opensea Unavailable`)
          throw err;
        } else {
          this.sendErrorToSlack(`Unexpected error`);
          this.writeAdvancedLogs(`ERROR (${err.response.status} : ${err.response.statusText}). Unexpected error`)
          this.writeLogs(`ERROR (${err.response.status} : ${err.response.statusText}). Unexpected error`)
          throw err;
        }
      })
  }

  /**
   * Получение рандомного целого числа
   *
   * @function
   * @param {number} min Наименьшее число диапазона.
   * @param {number} max Наибольшее число диапазона.
   *
   * @return {number} Random number
   */
  getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Метод для отсрочки выполнения следующего блока кода.
   *
   * @function
   * @param {number} ms Время в ms.
   */
  async timeout(ms) {
    return new Promise((res) => setTimeout((() => {
      console.log(`DELAYED ${ms}ms`);
      res();
    }), ms));
  };

  /**
   * Обновление картинок всех коллекций
   *
   * @function
   */
  async editImages() {
    const collections = await Collection.findAll();

    for (let collection of collections) {
      await this.timeout(400);

      this.http.get(`https://api.opensea.io/api/v1/collection/${collection.get().slug}`, {
        headers: {
          'X-API-KEY': process.env.OPENSEA_KEY
        }
      }).toPromise()
        .then(async (response) => {
          if (!response.data.collection) {
            throw new Error(response.data.success)
          }
          const data = response.data.collection;

          collection.set({
            image_url: data.image_url
          })

          collection.save()
          console.log(collection.get().name, ' saved!');
        })
    }
  }

  /**
   * Запуск удаления дубликатов статистики в цикле.
   *
   * @function
   */
  async startRemoveDuplicates() {
    const collections = await Collection.findAll({raw: true})

    for (const collection of collections) {
      await this.removeDuplicates({ collection_id: collection.id })
    }

    process.exit();
  }

  /**
   * Поиск и удаление дублирующейся статистики для коллекции.
   *
   * @function
   * @param {Object} params
   * @param {string} params.collection_id ID коллекции для удаления дублирующихся статов
   */
  async removeDuplicates({ collection_id }) {
    console.log(collection_id, ' started!!');

    const stats = await CollectionStat.findAll({
      where: { collection_id },
      raw: true,
      order: [
        ['createdAt', 'ASC']
      ]
    });

    let currentValues = {
      total_volume: null,
      floor_price: null,
      total_sales: null,
      num_owners: null,
    }

    const temp1 = []

    stats.forEach((item, index) => {
      temp1.unshift({
        id: item.id,
        isDuplicated: item.one_day_volume === currentValues.one_day_volume
          && item.one_day_change === currentValues.one_day_change
          && item.one_day_sales === currentValues.one_day_sales
          && item.one_day_average_price === currentValues.one_day_average_price
          && item.seven_day_volume === currentValues.seven_day_volume
          && item.seven_day_change === currentValues.seven_day_change
          && item.seven_day_sales === currentValues.seven_day_sales
          && item.seven_day_average_price === currentValues.seven_day_average_price
          && item.thirty_day_volume === currentValues.thirty_day_volume
          && item.thirty_day_change === currentValues.thirty_day_change
          && item.thirty_day_sales === currentValues.thirty_day_sales
          && item.thirty_day_average_price === currentValues.thirty_day_average_price
          && item.total_volume === currentValues.total_volume
          && item.total_sales === currentValues.total_sales
          && item.total_supply === currentValues.total_supply
          && item.count === currentValues.count
          && item.num_owners === currentValues.num_owners
          && item.average_price === currentValues.average_price
          && item.num_reports === currentValues.num_reports
          && item.market_cap === currentValues.market_cap
          && item.floor_price === currentValues.floor_price
      })

      currentValues = {
        one_day_volume: item.one_day_volume,
        one_day_change: item.one_day_change,
        one_day_sales: item.one_day_sales,
        one_day_average_price: item.one_day_average_price,
        seven_day_volume: item.seven_day_volume,
        seven_day_change: item.seven_day_change,
        seven_day_sales: item.seven_day_sales,
        seven_day_average_price: item.seven_day_average_price,
        thirty_day_volume: item.thirty_day_volume,
        thirty_day_change: item.thirty_day_change,
        thirty_day_sales: item.thirty_day_sales,
        thirty_day_average_price: item.thirty_day_average_price,
        total_volume: item.total_volume,
        total_sales: item.total_sales,
        total_supply: item.total_supply,
        count: item.count,
        num_owners: item.num_owners,
        average_price: item.average_price,
        num_reports: item.num_reports,
        market_cap: item.market_cap,
        floor_price: item.floor_price,
      }
    })

    const temp2 = [];

    temp1.forEach((item, index) => {
      if (index > 0 && index < temp1.length) {
        if (temp1[index - 1].isDuplicated
          && item.isDuplicated
          // && temp1[index + 1].isDuplicated
        ) {
          temp2.push(item.id);
        }
      }
    })

    console.log(temp2, ' to delete');

    await CollectionStat.destroy({
      where: { id: temp2 }
    })
  }

  /**
   * Добавление/обновление коллекций в базу данных из файла
   *
   * @function
   * @param {string} filename Путь к JSON файлу от корня Nest.
   */
  async updateCollections(filename) {
    if (typeof filename !== 'string') {
      throw new Error('filename param must be a string');
    }

    const __configFolder = __dirname.replace('src/Modules', '');
    function getFile(filename) {
      return JSON.parse(fs.readFileSync(`${__configFolder}/${filename}`));
    }

    const config = getFile(filename);

    for (const item of config) {

      console.log(item.slug, ' in work now');

      const [collection] = await Collection.findOrCreate({
        where: { slug: item.slug },
        defaults: {
          slug: item.slug,
          art_blocks: +item.art_blocks || null
        }
      }).catch(err => {
        console.log(err, ' err');
      });

      console.log(typeof collection.get().name, '   ', collection.get().name, '   ', item.slug, ' ---- ', collection.get().slug);

      if (collection.get().name == null) {
        await this.http.get(`https://api.opensea.io/api/v1/collection/${collection.get().slug}`, {
          headers: {
            'X-API-KEY': process.env.OPENSEA_KEY
          }
        }).toPromise()
          .then(async (response) => {
            const data = response.data.collection

            collection.set({
              name: data.name,
              image_url: data.image_url,
              link_opensea: `https://opensea.io/collection/${data.slug}`,
              link_website: data.external_url,
              link_discord: data.discord_url,
              link_twitter: data.twitter_username ? `https://twitter.com/${data.twitter_username}` : null,
            });

            collection.save();

            await CollectionStat.create({
              collection_id: collection.get().id,
              one_day_volume: data.stats.one_day_volume,
              one_day_change: data.stats.one_day_change,
              one_day_sales: data.stats.one_day_sales,
              one_day_average_price: data.stats.one_day_average_price,
              seven_day_volume: data.stats.seven_day_volume,
              seven_day_change: data.stats.seven_day_change,
              seven_day_sales: data.stats.seven_day_sales,
              seven_day_average_price: data.stats.seven_day_average_price,
              thirty_day_volume: data.stats.thirty_day_volume,
              thirty_day_change: data.stats.thirty_day_change,
              thirty_day_sales: data.stats.thirty_day_sales,
              thirty_day_average_price: data.stats.thirty_day_average_price,
              total_volume: data.stats.total_volume,
              total_sales: data.stats.total_sales,
              total_supply: data.stats.total_supply,
              count: data.stats.count,
              num_owners: data.stats.num_owners,
              average_price: data.stats.average_price,
              num_reports: data.stats.num_reports,
              market_cap: data.stats.market_cap,
              floor_price: data.stats.floor_price,
            })

            await this.timeout(200);
          })
          .catch(err => {
            console.log(err, ' https err');
            process.exit(err);
          })
      } else {
        collection.set({
          art_blocks: +item.art_blocks || null,
          parse_collection: true,
          show_collection: true
        })

        collection.save();

        console.log(collection.get().name, ' UPDATED');
      }
    }

    process.exit();
  }

  /**
   * Отправка сообщения в Slack
   *
   * @function
   * @param {string} message Сообщение.
   */
  sendErrorToSlack(message) {
    console.error(message);

    this.winston.error(message);
  }

  async checkParser() {
    const parserCheckTimeout = (await GlobalSettings.findOne({ where: { sysName: 'parserCheckTimeout' }, raw: true })).value_int
    const lastParserCheck = (await GlobalSettings.findOne({ where: { sysName: 'parserLastUpdate' }, raw: true })).value_date;
    const shouldParserContinueAfterError = (await GlobalSettings.findOne({ where: { sysName: 'parserShouldContinueAfterError' }, raw: true })).value_bool;


    fs.appendFileSync(__dirname.replace('src/Modules', 'logs') + '/test.txt', `test -- [${moment().format('YYYY-MM-DD HH:mm:ss')}] \r\n`)

    console.log(lastParserCheck);
    console.log(moment().diff(moment(lastParserCheck), 'minutes'));
    console.log(shouldParserContinueAfterError);

    if (moment().diff(moment(lastParserCheck), 'minutes') > parserCheckTimeout) {
      this.sendErrorToSlack(`Parser was disabled more than ${parserCheckTimeout} min ago.`);

      if (shouldParserContinueAfterError) {
        this.sendErrorToSlack(`Parser is restarting.`);

        await this.setStats();
      }
    }

    process.exit();
  }

  /**
   * Запись сообщения в упрощенный файл логов.
   *
   * @function
   * @param {string} message Сообщение.
   */
  writeLogs(message) {
    fs.appendFileSync(__dirname.replace('src/Modules', 'logs') + '/logs-simple.txt', `${message} -- [${moment().format('YYYY-MM-DD HH:mm:ss')}] \r\n`)
  }

  /**
   * Запись сообщения в расширенный файл логов.
   *
   * @function
   * @param {string} message Сообщение.
   */
  writeAdvancedLogs(message) {
    fs.appendFileSync(__dirname.replace('src/Modules', 'logs') + '/logs-advanced.txt', `${message} -- [${moment().format('YYYY-MM-DD HH:mm:ss')}] \r\n`)
  }
}
