import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Collection } from '../../database/Models/collection.model';
import { Event } from '../../database/Models/event.model';
import { Op } from 'sequelize';
import moment from 'moment';
import { HttpService } from '@nestjs/axios';
import { CollectionStat } from '../../database/Models/collectionStat.model';

@Injectable()
export class AdminService {
    constructor(
      @Inject('SEQUELIZE') sequelize,
      @Inject(HttpService) http
    ) {
        /**
         * Экземпляр sequelize
         * @var {sequelize}
         * */
        this.sequelize = sequelize;

        /**
         * Axios Экземплят HTTP клиента Axios
         * @var {Axios}
         * */
        this.http = http;
    }

    /**
     * Добавление или обновление коллекции
     *
     * @function
     * @param {Query} query Параметры запроса
     *
     * @return {document} Статус коллекции
     */
    async addCollection(query) {
        //slug:string
        //art-blocks:int (1 || 2)
        //mint:float
        //key:string

        if (!query.key || query.key !== process.env.ADMIN_ENDPOINTS_KEY) {
            return new HttpException({
                status: 403,
                error: 'Wrong key'
            }, 403)
        }

        const slug = query.slug;

        if (!slug) {
            return new HttpException({
                status: 500,
                error: 'No "slug" param passed'
            }, 500)
        }

        let collection = await Collection.findOne({
            where: { slug },
        })

        let isUpdated = true;

        return await this.http.get(`https://api.opensea.io/api/v1/collection/${slug}`, {
            headers: {
                'X-API-KEY': process.env.OPENSEA_KEY
            }
        }).toPromise()
          .then(async (response) => {
              const data = response.data.collection

              if (!collection) {
                  collection = await Collection.create({
                      slug,
                  });

                  isUpdated = false;
              }

              collection.set({
                  name: data.name,
                  image_url: data.image_url,
                  link_opensea: `https://opensea.io/collection/${slug}`,
                  link_website: data.external_url,
                  link_discord: data.discord_url,
                  link_twitter: data.twitter_username ? `https://twitter.com/${data.twitter_username}` : null,
                  art_blocks: +query['art-blocks'] || null,
                  mint: +query.mint || null,
                  show_collection: true,
                  parse_collection: true,
              });

              collection.save();

              await CollectionStat.create({
                  collection_id: collection.id,
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

              return `<div style="white-space: pre">Collection ${collection.get().name} has been ${isUpdated ? 'updated' : 'created'}: \r\n <code>${JSON.stringify(collection, 2, '\t')}</code></div>`;
          })
          .catch(err => {
              if (+err.response.status === 404) {
                  return new HttpException({
                      status: 404,
                      error: 'Collection not found'
                  }, 404)
              } else {
                  return new HttpException({
                      status: 502,
                      error: 'OpenSea connection error.'
                  }, 502)
              }
          })
    }

    /**
     * Отключение коллекции
     *
     * @function
     * @param {Query} query Параметры запроса
     *
     * @return {document} Статус коллекции
     */
    async disableCollection(query) {
        if (!query.key || query.key !== process.env.ADMIN_ENDPOINTS_KEY) {
            return new HttpException({
                status: 403,
                error: 'Wrong key'
            }, 403)
        }

        const slug = query.slug;

        if (!slug) {
            return new HttpException({
                status: 500,
                error: 'No "slug" param passed'
            }, 500)
        }

        let collection = await Collection.findOne({
            where: { slug },
        })

        if (!collection) {
            return new HttpException({
                status: 404,
                error: 'Not found'
            }, 404)
        }

        collection.set({
            parse_collection: false,
            show_collection: false
        });

        collection.save();

        return `<div style="white-space: pre">Collection ${collection.get().name} has been disabled: \r\n <code>${JSON.stringify(collection, 2, '\t')}</code></div>`;
    }

    /**
     * Вывод статистики по коллекциям
     *
     * @function
     * @param {Query} query Параметры запроса
     *
     * @return {document} Список статусов коллекций
     */
    async showAllStats(query) {
        if (!query.key || query.key !== process.env.ADMIN_ENDPOINTS_KEY) {
            return new HttpException({
                status: 403,
                error: 'Wrong key'
            }, 403)
        }

        const [collections] = await this.sequelize.query(`
            SELECT
                DISTINCT ON (collection.id)
                stat.id as stat_id, stat.collection_id, collection.id, collection.link_opensea, collection.name, collection.slug, collection.mint, collection.show_collection, collection.parse_collection, collection.art_blocks, stat."createdAt"
            FROM collection_stats stat
                 RIGHT OUTER JOIN collections collection on ((collection.id = stat.collection_id))
            ORDER BY collection.id, stat."createdAt" DESC
        `);

        let table = `<div>Total collections: ${collections.length}</div><table border="1" cellpadding="4px"><thead><th>id</th><th>name</th><th>slug</th><th>mint</th><th>Art Block</th><th>last update</th><th>show</th><th>parse</th></thead><tbody>`;

        collections.forEach(collection => {
            table += `<tr>
                <td>${collection.collection_id}</td>
                <td>${collection.name}</td>
                <td><a href="${collection.link_opensea}" target="_blank">${collection.slug}</a></td>
                <td>${collection.mint == null ? '---' : collection.mint}</td>
                <td>${this.getArtBlockNameById(collection.art_blocks)}</td>
                <td>${moment(collection.createdAt).format('DD.MM.YYYY HH:mm:ss Z')}</td>
                <td style="background-color: ${collection.show_collection ? '#6FC7CE' : '#F9DC56'}">${collection.show_collection}</td>
                <td style="background-color: ${collection.parse_collection ? '#6FC7CE' : '#F88171'}">${collection.parse_collection}</td>
            </tr>`
        });

        table += '</tbody></table>'

        return table;
    }

    /**
     * Вывод статистики для одной коллекциям
     *
     * @function
     * @param {string} slug Slug коллекции
     * @param {Query} query Параметры запроса
     *
     * @return {document} Статус коллекции
     */
    async showSingleStat(slug, query) {
        if (!query.key || query.key !== process.env.ADMIN_ENDPOINTS_KEY) {
            return new HttpException({
                status: 403,
                error: 'Wrong key'
            }, 403)
        }

        const [collection] = await this.sequelize.query(`
            SELECT collection.id, slug, name, mint, art_blocks, max("createdAt") as last_update, show_collection, parse_collection FROM collections collection, collection_stats WHERE collection_id = collection.id AND slug = :slug GROUP BY collection.id;
        `, { replacements: { slug } });

        return `<div style="white-space: pre"><code>${JSON.stringify(collection, 2, '\t')}</code></div>`;
    }

    /**
     * Вывод статистики для одной коллекциям
     *
     * @function
     * @param {number} id id арт блока
     *
     * @return {string} Имя арт блока
     */
    getArtBlockNameById(id) {
        switch (id) {
            case 0:
                return '';
            case 1:
                return 'AB Curated';
            case 2:
                return 'AB Playground';
            case 3:
                return 'AB Factory';
            default:
                return '';
        }
    }
}
