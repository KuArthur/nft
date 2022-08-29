import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Collection } from '../../database/Models/collection.model';
import { Event } from '../../database/Models/event.model';
import { Op } from 'sequelize';
import moment from 'moment';
import { HttpService } from '@nestjs/axios';
import { CollectionStat } from '../../database/Models/collectionStat.model';

@Injectable()
export class CollectionsService {
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

        /**
         * Флаг для работы цикла обновления кэша
         * @var {bool}
         * */
        this.isCacheEnable = true;
    }


    //Хук выполняющийся прии запуске приложения
    onApplicationBootstrap() {
        this.cacheStats();
    }

    /**
     * Получение даты начала периода
     *
     * @function
     * @param {string} period Идентификатор периода
     * @param {number} dif модификатор подсчета даты
     *
     * @return {Date} Дата
     */
    parsePeriod(period, dif = 1) {
        let date;

        switch (period) {
            case '15M':
                date = moment().subtract(15 * dif, 'minutes');
                break;
            case '1H':
                date = moment().subtract(1 * dif, 'hours');
                break;
            case '3H':
                date = moment().subtract(3 * dif, 'hours');
                break;
            case '1D':
                date = moment().subtract(1 * dif, 'days');
                break;
            case '7D':
                date = moment().subtract(7 * dif, 'days');
                break;
            case '1M':
                date = moment().subtract(1 * dif, 'months');
                break;
            case '3M':
                date = moment().subtract(3 * dif, 'months');
                break;
        }
        return date.toISOString();
    }

    /**
     * Получение вычисленного значения за нужный период
     *
     * @function
     * @param {string} period Идентификатор периода
     * @param {Object} stat Идентификатор периода
     * @param {string} param Параметр получаемого значения
     *
     * @return {number} Значение
     */
    getValueByPeriod(period, stat, param) {
        switch (period) {
            case '1D':
                return stat[`one_day_${param}`]
            case '7D':
                return stat[`seven_day_${param}`]
            case '1M':
                return stat[`thirty_day_${param}`]
            default:
                return stat[`total_${param}`]
        }
    }

    /**
     * Получение вычисленного процента изменения за нужный период
     *
     * @function
     * @param {string} period Идентификатор периода
     * @param {Object} stat Идентификатор периода
     *
     * @return {number} Процент изменения
     */
    getChangeByPeriod(period, stat) {
        switch (period) {
            case '1D':
                return stat[`one_day_change`]
            case '7D':
                return stat[`seven_day_change`]
            case '1M':
                return stat[`thirty_day_change`]
        }
    }

    /**
     * Получение данных о всех коллекциях
     *
     * @function
     * @param {Query} query Параметры запроса
     *
     * @return {Object} Данные о коллекциях
     */
    async getCollections(query) {
        // period_from: 2021-05-15
        // period_to: 2021-05-18
        // period: 15M, 1H, 3H, 1D, 7D, 1M, 3M
        // sort_by: total_volume, volume_change, floor_price, floor_change, total_supply, num_owners
        // sort_direction: asc, desc
        // page: 1
        // art_blocks:num (1 - curated, 2 - playground, 3 - factory)
        //watchlist: false
        console.log(query);

        if (!query.period && !query.period_from) {
            return new HttpException({
                status: 500,
                error: 'No period param'
            }, 500)
        }

        if (query.period && query.period_from) {
            return new HttpException({
                status: 500,
                error: 'Must be only one period param'
            }, 500)
        }

        if (query.page < 1) {
            return new HttpException({
                status: 500,
                error: 'page'
            }, 500)
        }

        if (!query.period_to && query.period_from || query.period_to && !query.period_from) {
            return new HttpException({
                status: 500,
                error: 'You cannot pass only one period param'
            }, 500);
        }

        if (query.art_blocks && ![1, 2, 3].includes(+query.art_blocks)) {
            return new HttpException({
                status: 500,
                error: 'Art block not found'
            }, 500)
        }

        const periodFrom = query.period ? this.parsePeriod(query.period) : query.period_from;
        const periodAdditional = query.period ? this.parsePeriod(query.period, 2) : '';

        const sortDirection = query.sort_direction || 'desc';
        const sortBy = query.sort_by || 'total_volume';
        const page = +query.page || 1;
        const watchlist =  query.watchlist || false;
        const limit = 15;
        const artBlocks = query.art_blocks || 0;
        const searchString = query.search ? query.search.match(/[^;'"`()/\[\]\\\/]+/g)?.join(' ') : '';

        let statsTo;
        let statsFrom;
        let statsAdditional;

        if (!query.period_from && !query.period_to && artBlocks === 0) {
            const period = query.period;

            if (!['15m', '1h', '3h', '1d', '7d', '1m'].includes(period.toLowerCase())) {
                return new HttpException({
                    status: 500,
                    error: 'invalid period'
                }, 500)
            }

            if (['1D', '7D', '1M'].includes(query.period)) {
                [statsTo] = await this.sequelize.query('SELECT * FROM ' + `temp_stats_${period.toLowerCase()}_to` + ' WHERE name ILIKE :search ORDER BY collection_id ASC;', { replacements: { search: `%${searchString}%` } });
                [statsFrom] = await this.sequelize.query('SELECT * FROM ' + `temp_stats_${period.toLowerCase()}_from` + ' WHERE name ILIKE :search ORDER BY collection_id ASC;', { replacements: { search: `%${searchString}%` } });
            } else if (['15M', '1H', '3H'].includes(query.period)) {
                [statsTo] = await this.sequelize.query('SELECT * FROM ' + `temp_stats_${period.toLowerCase()}_to` + ' WHERE name ILIKE :search ORDER BY collection_id ASC;', { replacements: { search: `%${searchString}%` } });
                [statsFrom] = await this.sequelize.query('SELECT * FROM ' + `temp_stats_${period.toLowerCase()}_from` + ' WHERE name ILIKE :search ORDER BY collection_id ASC;', { replacements: { search: `%${searchString}%` } });
                [statsAdditional] = await this.sequelize.query('SELECT * FROM ' + `temp_stats_${period.toLowerCase()}_add` + ' WHERE name ILIKE :search ORDER BY collection_id ASC;', { replacements: { search: `%${searchString}%` } });
            }
        } else {
            [statsTo] = await this.sequelize.query(query.period_to ? this.getPeriodSortQuery({ period: query.period_to, artBlocks }, {
                replacements: { period: query.period_to, art_blocks: artBlocks, search: `%${searchString}%` }
            }) : this.getLastSortQuery(artBlocks), {
                replacements: { art_blocks: artBlocks, search: `%${searchString}%` }
            });

            [statsFrom] = await this.sequelize.query(this.getPeriodSortQuery({ period: periodFrom, artBlocks }), {
                replacements: { period: periodFrom, art_blocks: artBlocks, search: `%${searchString}%` }
            });

            [statsAdditional] = await this.sequelize.query(this.getPeriodSortQuery({ period: periodAdditional, artBlocks }), {
                replacements: { period: periodAdditional, art_blocks: artBlocks, search: `%${searchString}%` }
            });
        }

        const ethData = await this.getEthData()


        let temp = []
        let tempNull = []
        let globalPieces = 0;
        let globalVolume = { eth: 0, usd: 0 };

        statsTo.forEach((statTo, index) => {
            if ( statTo.collection_stat_id === null ) {
                return false;
            }

            const statFrom = statsFrom[index];
            const statAdditional = statsAdditional ? statsAdditional[index] : null;
            const collection = {
                collection_id: statTo.collection_id,
                name: statTo.name,
                slug: statTo.slug,
                image_url: statTo.image_url,
                link_opensea: statTo.link_opensea,
                data: {}
            };

            let mint = statTo.mint;
            let volume = null;
            let volume_change = null;
            let sales = null;
            let floor_price = statTo.floor_price;
            let floor_change = null;
            let num_owners = statTo.num_owners;
            let total_supply = statTo.total_supply;
            let floor_to_mint = floor_price && mint ? (floor_price * 100 / mint) : null;
            let average_price = null;
            let unique_buyers = null;

            if (['1D', '7D', '1M'].includes(query.period)) {
                volume = this.getValueByPeriod(query.period, statTo, 'volume');
                volume_change = this.getValueByPeriod(query.period, statTo, 'change') * 100;
                sales = this.getValueByPeriod(query.period, statTo, 'sales');
                average_price = this.getValueByPeriod(query.period, statTo, 'average_price');

                if (statFrom.collection_stat_id !== null) {
                    floor_change = this.calculateChanges(statFrom.floor_price, statTo.floor_price);
                    unique_buyers = this.calculateInPeriodPositive(statFrom.num_owners, statTo.num_owners);
                }

            } else if (['15M', '1H', '3H'].includes(query.period)) {
                if (statFrom.collection_stat_id !== null) {
                    volume = this.calculateInPeriodPositive(statFrom.total_volume, statTo.total_volume);
                    sales = this.calculateInPeriodPositive(statFrom.total_sales, statTo.total_sales);
                    average_price = volume / sales;
                    floor_change = this.calculateChanges(statFrom.floor_price, statTo.floor_price);
                    unique_buyers = this.calculateInPeriodPositive(statFrom.num_owners, statTo.num_owners);

                    if (statAdditional.collection_stat_id !== null) {
                        let volumeAdditional = this.calculateInPeriodPositive(statAdditional.total_volume, statFrom.total_volume);
                        volume_change = this.calculateChangesPositive(volumeAdditional, volume);
                    }
                }

            } else  {
                //TODO 3M
            }

            globalPieces += sales;
            globalVolume.eth += volume;
            globalVolume.usd += volume * ethData.ethUsd;

            collection.data = {
                mint: {
                    eth: mint,
                    usd: mint ? mint * ethData.ethUsd : null
                },
                total_volume: {
                    eth: volume,
                    usd: volume * ethData.ethUsd
                },
                volume_change,
                total_sales: sales,
                floor_price: {
                    eth: floor_price,
                    usd: floor_price ? floor_price * ethData.ethUsd : null
                },
                floor_change,
                num_owners,
                total_supply,
                floor_to_mint,
                average_price: {
                    eth: average_price,
                    usd: average_price * ethData.ethUsd,
                },
                unique_buyers
            }

            if (sortBy === 'floor_price' && sales === 0 || sortBy === 'floor_price' && sales === null) {
                return false;
            }

            if (['total_volume', 'average_price', 'floor_price', 'mint'].includes(sortBy)) {
                if (collection.data[sortBy].eth == null || isNaN(collection.data[sortBy].eth) || !isFinite(collection.data[sortBy].eth)) {
                    tempNull.push(collection)
                } else {
                    temp.push(collection);
                }
            } else {
                if (collection.data[sortBy] == null || isNaN(collection.data[sortBy]) || !isFinite(collection.data[sortBy])) {
                    tempNull.push(collection)
                } else {
                    temp.push(collection);
                }
            }
        })


        temp = temp.sort((a, b) => {
            if (['total_volume', 'average_price', 'floor_price', 'mint'].includes(sortBy)) {
                return sortDirection === 'desc' ? b.data[sortBy].eth - a.data[sortBy].eth : a.data[sortBy].eth - b.data[sortBy].eth
            } else {
                return sortDirection === 'desc' ? b.data[sortBy] - a.data[sortBy] : a.data[sortBy] - b.data[sortBy]
            }
        });

        let computed = [...temp, ...tempNull];

        if (watchlist) {
            const watchlistArr = JSON.parse(watchlist);

            const favoriteTemp = [];
            const regularTemp = [];

            computed.forEach((item, index) => {
                if (watchlistArr.includes(item.collection_id)) {
                    favoriteTemp.push({
                        ...computed[index],
                        watchlist: true
                    });
                } else {
                    regularTemp.push({
                        ...computed[index],
                        watchlist: false,
                    });
                }
            })

            const result = [...favoriteTemp, ...regularTemp];

            return {
                searchString,
                ethData: {
                    ...ethData,
                    total_sales_psc: globalPieces,
                    total_sales: globalVolume
                },
                collections: result.slice(0, ((page - 1) * limit) + limit),
                // collections: result.slice((page - 1) * limit, ((page - 1) * limit) + limit),
                page,
                last_page: Math.ceil(computed.length / limit),
            }
        } else {
            return {
                searchString,
                ethData: {
                    ...ethData,
                    total_sales_psc: globalPieces,
                    total_sales: globalVolume
                },
                collections: computed.slice(0, ((page - 1) * limit) + limit),
                // collections: computed.slice((page - 1) * limit, ((page - 1) * limit) + limit),
                page,
                last_page: Math.ceil(computed.length / limit),
            }
        }
    }

    /**
     * Получение данных об одной коллекции
     *
     * @function
     * @param {string} slug Slug коллекции
     *
     * @return {Object} Данные о коллекции
     */
    async getSingleCollection(slug) {
        // slug:string

        const collection = await Collection.findOne({
            where: { slug },
            include: {
                model: CollectionStat,
            }
        })

        if (!collection) {
            return new HttpException({
                status: 404,
                error: 'Collection bot found'
            }, 404)
        }

        return {
            collection: {
                ...collection.get(),
            },
        };
    }

    /**
     * Получение данных для отрисовки графика
     *
     * @function
     * @param {string} slug Slug коллекции
     * @param {Query} query Параметры запроса
     *
     * @return {Object} Данные для отрисовкии графика
     */
    async getGraphData(slug, query) {
        //period_to:date
        //period_from:date
        //period:string
        //L1:string
        //L2:string

        const ethData = await this.getEthData();

        const availableParams = ['total_volume', 'total_sales', 'floor_price', 'num_owners'];

        if (query.L1 && !availableParams.includes(query.L1) || query.L2 && !availableParams.includes(query.L2)) {
            return new HttpException({
                status: 500,
                error: 'Unavailable params.'
            }, 500)
        }

        const periodTo = query.period ? moment().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z' : query.period_to;
        const periodFrom = query.period ? this.parsePeriod(query.period) : query.period_from;
        const periodAdditional = query.period ? this.parsePeriod(query.period, 2) : '';

        const collection = await Collection.findOne({
            where: { slug }
        })

        const data = await CollectionStat.findAll({
            where: {
                collection_id: collection.get().id,
                createdAt: {
                    [Op.lte]: periodTo,
                    [Op.gte]: periodFrom
                }
            },
            order: [
                ['createdAt', 'ASC']
            ],
            raw: true,
        })

        console.log({periodTo, periodFrom}, ' data');

        let l1 = query.L1 === 'total_sales' || query.L1 === 'num_owners' ? [] : {usd: [], eth: []}, l2 = query.L2 === 'total_sales' || query.L2 === 'num_owners' ? [] : {usd: [], eth: []};

        data.forEach((item, index) => {
            if (query.L1 && item[query.L1] !== null) {
                if (query.L1 === 'total_sales' || query.L1 === 'num_owners') {
                    l1.push({
                        y: item[query.L1],
                        x: item.createdAt
                    })
                } else {
                    l1.eth.push({
                        y: item[query.L1],
                        x: item.createdAt
                    })

                    l1.usd.push({
                        y: item[query.L1] * ethData.ethUsd,
                        x: item.createdAt
                    })
                }
            }

            if (query.L2 && item[query.L2] !== null) {
                if (query.L2 === 'total_sales' || query.L2 === 'num_owners') {
                    // if (index === 0) {
                    //     l2.push({
                    //         y: null,
                    //         x: periodFrom
                    //     })
                    // }

                    l2.push({
                        y: item[query.L2],
                        x: item.createdAt
                    })
                } else {
                    // if (index === 0) {
                    //     l2.usd.push({
                    //         y: null,
                    //         x: periodFrom
                    //     })
                    //     l2.eth.push({
                    //         y: null,
                    //         x: periodFrom
                    //     })
                    // }

                    l2.eth.push({
                        y: item[query.L2],
                        x: item.createdAt
                    })

                    l2.usd.push({
                        y: item[query.L2] * ethData.ethUsd,
                        x: item.createdAt
                    })
                }
            }
        })

        const result = {
            period_to: periodTo,
            period_from: periodFrom
        };

        if (query.L1) {
            result[query.L1] = l1
        }

        if (query.L2) {
            result[query.L2] = l2
        }

        return result
    }

    /**
     * Получение процента изменения
     *
     * @function
     * @param {number} begin Значение на начало периода
     * @param {number} end Значение на конец периода
     *
     * @return {number} процент изменения
     */
    calculateChanges(begin, end) {
        return ((end - begin) / begin) * 100;
    }

    /**
     * Получение положительного процента изменения
     *
     * @function
     * @param {number} begin Значение на начало периода
     * @param {number} end Значение на конец периода
     *
     * @return {number} Положительный процент изменения
     */
    calculateChangesPositive(begin, end) {
        if (begin === 0) {
            if (end === 0) {
                return 0;
            } else {
                return 100;
            }
        }

        return ((end - begin) / begin) * 100;
    }

    /**
     * Получение значения из разницы данных по периоду
     *
     * @function
     * @param {number} begin Значение на начало периода
     * @param {number} end Значение на конец периода
     *
     * @return {number} Значение по периоду
     */
    calculateInPeriod(begin, end) {
        return (end - begin);
    }

    /**
     * Получение положительного значения из разницы данных по периоду
     *
     * @function
     * @param {number} begin Значение на начало периода
     * @param {number} end Значение на конец периода
     *
     * @return {number} Значение по периоду
     */
    calculateInPeriodPositive(begin, end) {
        const result = (end - begin);

        return result > 0 ? result : 0;
    }

    /**
     * Получение составленного SQL-запроса по последней статистике
     *
     * @function
     * @param {number} artBlocks ID арт-блока
     *
     * @return {string} Строка с SQL-запросом
     */
    getLastSortQuery(artBlocks = 0) {
        if (!artBlocks || artBlocks == 0) {
            return `
            SELECT
                DISTINCT ON (c.id)
                s.id as collection_stat_id, c.id as collection_id, c.name, c.slug, c.image_url, c.link_opensea, s.one_day_volume, s.seven_day_volume, s.thirty_day_volume, s.one_day_average_price, s.seven_day_average_price, s.thirty_day_average_price, s.one_day_change, s.seven_day_change, s.thirty_day_change, s.one_day_sales, s.seven_day_sales, s.thirty_day_sales, TRUNC(s.total_volume::numeric,2) as total_volume, s.total_sales, s.total_supply, s.num_owners, s.average_price, s.floor_price, c.mint, s."createdAt"
            FROM collection_stats s
            RIGHT OUTER JOIN collections c on ((c.id = s.collection_id) AND (c.show_collection IS TRUE) AND (c.name ILIKE :search))
            ORDER BY c.id ASC, s."createdAt" DESC
        `} else {
            return `
            SELECT
                DISTINCT ON (c.id)
                s.id as collection_stat_id, c.id as collection_id, c.name, c.slug, c.image_url, c.link_opensea, s.one_day_volume, s.seven_day_volume, s.thirty_day_volume, s.one_day_average_price, s.seven_day_average_price, s.thirty_day_average_price, s.one_day_change, s.seven_day_change, s.thirty_day_change, s.one_day_sales, s.seven_day_sales, s.thirty_day_sales, TRUNC(s.total_volume::numeric,2) as total_volume, s.total_sales, s.total_supply, s.num_owners, s.average_price, s.floor_price, c.mint, s."createdAt"
            FROM collection_stats s
            RIGHT OUTER JOIN collections c on ((c.id = s.collection_id) AND (c.art_blocks = :art_blocks) AND (c.show_collection IS TRUE) AND (c.name ILIKE :search))
            ORDER BY c.id ASC, s."createdAt" DESC
        `}
    }

    /**
     * Получение составленного SQL-запроса по периоду
     *
     * @function
     * @param {Object} params
     * @param {string} params.period Индентификатор периода
     * @param {number} params.artBlocks ID арт-блока
     *
     * @return {string} Строка с SQL-запросом
     */
    getPeriodSortQuery({ period, artBlocks = 0 }) {
        if (!artBlocks || artBlocks == 0) {
            return `
            SELECT
                DISTINCT ON (c.id)
                s.id as collection_stat_id, c.id as collection_id, c.name, c.slug, c.image_url, c.link_opensea, s.one_day_volume, s.seven_day_volume, s.thirty_day_volume, s.one_day_average_price, s.seven_day_average_price, s.thirty_day_average_price, s.one_day_change, s.seven_day_change, s.thirty_day_change, s.one_day_sales, s.seven_day_sales, s.thirty_day_sales, TRUNC(s.total_volume::numeric,2) as total_volume, s.total_sales, s.total_supply, s.num_owners, s.average_price, s.floor_price, c.mint, s."createdAt"
            FROM collection_stats s
            RIGHT OUTER JOIN collections c on ((c.id = s.collection_id) AND (s."createdAt" < :period) AND (c.show_collection IS TRUE) AND (c.name ILIKE :search))
            ORDER BY c.id ASC, s."createdAt" DESC
        `} else {
            return `
            SELECT
                DISTINCT ON (c.id)
                s.id as collection_stat_id, c.id as collection_id, c.name, c.slug, c.image_url, c.link_opensea, s.one_day_volume, s.seven_day_volume, s.thirty_day_volume, s.one_day_average_price, s.seven_day_average_price, s.thirty_day_average_price, s.one_day_change, s.seven_day_change, s.thirty_day_change, s.one_day_sales, s.seven_day_sales, s.thirty_day_sales, TRUNC(s.total_volume::numeric,2) as total_volume, s.total_sales, s.total_supply, s.num_owners, s.average_price, s.floor_price, c.mint, s."createdAt"
            FROM collection_stats s
            RIGHT OUTER JOIN collections c on ((c.id = s.collection_id) AND (s."createdAt" < :period) AND (c.art_blocks = :art_blocks) AND (c.show_collection IS TRUE) AND (c.name ILIKE :search))
            ORDER BY c.id ASC, s."createdAt" DESC
        `}
    }

    /**
     * Получение актуального курса эфира
     *
     * @function
     * @return {Object} Курс эфира
     */
    async getEthData() {
        const data = {};

        await this.http.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`).toPromise()
          .then(response => {
                data.ethGas = +response.data.result.SafeGasPrice;
            })

        await this.http.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`).toPromise()
          .then(response => {
                data.ethUsd = +response.data.result.ethusd;
            })

        return data;
    }

    /**
     * Запуск цикла кэширования
     *
     * @function
     */
    async cacheStats() {
        while(this.isCacheEnable) {
            for (const item of ['15m', '1h', '3h', '1d', '7d', '1m']) {
                await this.cacheSinglePeriod(item);
            }

            await this.timeout(15000);
        }
    }

    /**
     * Кэширование одного периода
     *
     * @function
     * @param {string} period Идентификатор периода.
     */
    async cacheSinglePeriod(period) {
        console.log(period, ' period');
        const tableNames = [`temp_stats_${period}_to`, `temp_stats_${period}_from`, `temp_stats_${period}_add`];

        if (['1d', '7d', '1m'].includes(period)) {
            await this.sequelize.query('BEGIN; DELETE FROM ' + tableNames[0] + ' WHERE id IS NOT NULL; INSERT INTO ' + tableNames[0] + ' (collection_stat_id, collection_id, total_volume, one_day_volume, one_day_change, one_day_sales, one_day_average_price, seven_day_volume, seven_day_change, seven_day_sales, seven_day_average_price, thirty_day_volume, thirty_day_change, thirty_day_sales, thirty_day_average_price, total_sales, total_supply, count, num_owners, average_price, num_reports, market_cap, floor_price, slug, name, image_url, contract, link_opensea, link_website, link_discord, link_twitter, mint, art_blocks, show_collection, parse_collection, "createdAt") (SELECT DISTINCT ON (c.id) s.id as collection_stat_id, c.id as collection_id, TRUNC(s.total_volume::numeric,4) as total_volume, s.one_day_volume as one_day_volume, s.one_day_change as one_day_change, s.one_day_sales as one_day_sales, s.one_day_average_price as one_day_average_price, s.seven_day_volume as seven_day_volume, s.seven_day_change as seven_day_change, s.seven_day_sales as seven_day_sales, s.seven_day_average_price as seven_day_average_price, s.thirty_day_volume as thirty_day_volume, s.thirty_day_change as thirty_day_change, s.thirty_day_sales as thirty_day_sales, s.thirty_day_average_price as thirty_day_average_price, s.total_sales as total_sales, s.total_supply as total_supply, s.count as count, s.num_owners as num_owners, s.average_price as average_price, s.num_reports as num_reports, s.market_cap as market_cap, s.floor_price as floor_price, c.slug as slug, c.name as name, c.image_url as image_url, c.contract as contract, c.link_opensea as link_opensea, c.link_website as link_website, c.link_discord as link_discord, c.link_twitter as link_twitter, c.mint as mint, c.art_blocks as art_blocks, c.show_collection as show_collection, c.parse_collection as parse_collection, s."createdAt" as "createdAt" FROM collection_stats s RIGHT OUTER JOIN collections c on ((c.id = s.collection_id) AND (show_collection IS TRUE)) ORDER BY c.id ASC, "createdAt" DESC); COMMIT;').catch(err => {
                console.log(err, ' errrrrr');
            })

            await this.sequelize.query('BEGIN; DELETE FROM ' + tableNames[1] + ' WHERE id IS NOT NULL; INSERT INTO ' + tableNames[1] + ' (collection_stat_id, collection_id, total_volume, one_day_volume, one_day_change, one_day_sales, one_day_average_price, seven_day_volume, seven_day_change, seven_day_sales, seven_day_average_price, thirty_day_volume, thirty_day_change, thirty_day_sales, thirty_day_average_price, total_sales, total_supply, count, num_owners, average_price, num_reports, market_cap, floor_price, slug, name, image_url, contract, link_opensea, link_website, link_discord, link_twitter, mint, art_blocks, show_collection, parse_collection, "createdAt") (SELECT DISTINCT ON (c.id) s.id as collection_stat_id, c.id as collection_id, TRUNC(s.total_volume::numeric,4) as total_volume, s.one_day_volume as one_day_volume, s.one_day_change as one_day_change, s.one_day_sales as one_day_sales, s.one_day_average_price as one_day_average_price, s.seven_day_volume as seven_day_volume, s.seven_day_change as seven_day_change, s.seven_day_sales as seven_day_sales, s.seven_day_average_price as seven_day_average_price, s.thirty_day_volume as thirty_day_volume, s.thirty_day_change as thirty_day_change, s.thirty_day_sales as thirty_day_sales, s.thirty_day_average_price as thirty_day_average_price, s.total_sales as total_sales, s.total_supply as total_supply, s.count as count, s.num_owners as num_owners, s.average_price as average_price, s.num_reports as num_reports, s.market_cap as market_cap, s.floor_price as floor_price, c.slug as slug, c.name as name, c.image_url as image_url, c.contract as contract, c.link_opensea as link_opensea, c.link_website as link_website, c.link_discord as link_discord, c.link_twitter as link_twitter, c.mint as mint, c.art_blocks as art_blocks, c.show_collection as show_collection, c.parse_collection as parse_collection, s."createdAt" as "createdAt" FROM collection_stats s RIGHT OUTER JOIN collections c on ((c.id = s.collection_id) AND (s."createdAt" < :period) AND (show_collection IS TRUE)) ORDER BY c.id ASC, "createdAt" DESC); COMMIT;', { replacements: { period: this.parsePeriod(period.toUpperCase())  } }).catch(err => {
                console.log(err, ' errrrrr');
            })
        } else if (['15m', '1h', '3h'].includes(period)) {
            await this.sequelize.query('BEGIN; DELETE FROM ' + tableNames[0] + ' WHERE id IS NOT NULL; INSERT INTO ' + tableNames[0] + ' (collection_stat_id, collection_id, total_volume, one_day_volume, one_day_change, one_day_sales, one_day_average_price, seven_day_volume, seven_day_change, seven_day_sales, seven_day_average_price, thirty_day_volume, thirty_day_change, thirty_day_sales, thirty_day_average_price, total_sales, total_supply, count, num_owners, average_price, num_reports, market_cap, floor_price, slug, name, image_url, contract, link_opensea, link_website, link_discord, link_twitter, mint, art_blocks, show_collection, parse_collection, "createdAt") (SELECT DISTINCT ON (c.id) s.id as collection_stat_id, c.id as collection_id, TRUNC(s.total_volume::numeric,4) as total_volume, s.one_day_volume as one_day_volume, s.one_day_change as one_day_change, s.one_day_sales as one_day_sales, s.one_day_average_price as one_day_average_price, s.seven_day_volume as seven_day_volume, s.seven_day_change as seven_day_change, s.seven_day_sales as seven_day_sales, s.seven_day_average_price as seven_day_average_price, s.thirty_day_volume as thirty_day_volume, s.thirty_day_change as thirty_day_change, s.thirty_day_sales as thirty_day_sales, s.thirty_day_average_price as thirty_day_average_price, s.total_sales as total_sales, s.total_supply as total_supply, s.count as count, s.num_owners as num_owners, s.average_price as average_price, s.num_reports as num_reports, s.market_cap as market_cap, s.floor_price as floor_price, c.slug as slug, c.name as name, c.image_url as image_url, c.contract as contract, c.link_opensea as link_opensea, c.link_website as link_website, c.link_discord as link_discord, c.link_twitter as link_twitter, c.mint as mint, c.art_blocks as art_blocks, c.show_collection as show_collection, c.parse_collection as parse_collection, s."createdAt" as "createdAt" FROM collection_stats s RIGHT OUTER JOIN collections c on ((c.id = s.collection_id) AND (show_collection IS TRUE)) ORDER BY c.id ASC, "createdAt" DESC); COMMIT;')

            await this.sequelize.query('BEGIN; DELETE FROM ' + tableNames[1] + ' WHERE id IS NOT NULL; INSERT INTO ' + tableNames[1] + ' (collection_stat_id, collection_id, total_volume, one_day_volume, one_day_change, one_day_sales, one_day_average_price, seven_day_volume, seven_day_change, seven_day_sales, seven_day_average_price, thirty_day_volume, thirty_day_change, thirty_day_sales, thirty_day_average_price, total_sales, total_supply, count, num_owners, average_price, num_reports, market_cap, floor_price, slug, name, image_url, contract, link_opensea, link_website, link_discord, link_twitter, mint, art_blocks, show_collection, parse_collection, "createdAt") (SELECT DISTINCT ON (c.id) s.id as collection_stat_id, c.id as collection_id, TRUNC(s.total_volume::numeric,4) as total_volume, s.one_day_volume as one_day_volume, s.one_day_change as one_day_change, s.one_day_sales as one_day_sales, s.one_day_average_price as one_day_average_price, s.seven_day_volume as seven_day_volume, s.seven_day_change as seven_day_change, s.seven_day_sales as seven_day_sales, s.seven_day_average_price as seven_day_average_price, s.thirty_day_volume as thirty_day_volume, s.thirty_day_change as thirty_day_change, s.thirty_day_sales as thirty_day_sales, s.thirty_day_average_price as thirty_day_average_price, s.total_sales as total_sales, s.total_supply as total_supply, s.count as count, s.num_owners as num_owners, s.average_price as average_price, s.num_reports as num_reports, s.market_cap as market_cap, s.floor_price as floor_price, c.slug as slug, c.name as name, c.image_url as image_url, c.contract as contract, c.link_opensea as link_opensea, c.link_website as link_website, c.link_discord as link_discord, c.link_twitter as link_twitter, c.mint as mint, c.art_blocks as art_blocks, c.show_collection as show_collection, c.parse_collection as parse_collection, s."createdAt" as "createdAt" FROM collection_stats s RIGHT OUTER JOIN collections c on ((c.id = s.collection_id) AND (s."createdAt" < :period) AND (show_collection IS TRUE)) ORDER BY c.id ASC, "createdAt" DESC); COMMIT;', { replacements: { period: this.parsePeriod(period.toUpperCase())  } })

            await this.sequelize.query('BEGIN; DELETE FROM ' + tableNames[2] + ' WHERE id IS NOT NULL; INSERT INTO ' + tableNames[2] + ' (collection_stat_id, collection_id, total_volume, one_day_volume, one_day_change, one_day_sales, one_day_average_price, seven_day_volume, seven_day_change, seven_day_sales, seven_day_average_price, thirty_day_volume, thirty_day_change, thirty_day_sales, thirty_day_average_price, total_sales, total_supply, count, num_owners, average_price, num_reports, market_cap, floor_price, slug, name, image_url, contract, link_opensea, link_website, link_discord, link_twitter, mint, art_blocks, show_collection, parse_collection, "createdAt") (SELECT DISTINCT ON (c.id) s.id as collection_stat_id, c.id as collection_id, TRUNC(s.total_volume::numeric,4) as total_volume, s.one_day_volume as one_day_volume, s.one_day_change as one_day_change, s.one_day_sales as one_day_sales, s.one_day_average_price as one_day_average_price, s.seven_day_volume as seven_day_volume, s.seven_day_change as seven_day_change, s.seven_day_sales as seven_day_sales, s.seven_day_average_price as seven_day_average_price, s.thirty_day_volume as thirty_day_volume, s.thirty_day_change as thirty_day_change, s.thirty_day_sales as thirty_day_sales, s.thirty_day_average_price as thirty_day_average_price, s.total_sales as total_sales, s.total_supply as total_supply, s.count as count, s.num_owners as num_owners, s.average_price as average_price, s.num_reports as num_reports, s.market_cap as market_cap, s.floor_price as floor_price, c.slug as slug, c.name as name, c.image_url as image_url, c.contract as contract, c.link_opensea as link_opensea, c.link_website as link_website, c.link_discord as link_discord, c.link_twitter as link_twitter, c.mint as mint, c.art_blocks as art_blocks, c.show_collection as show_collection, c.parse_collection as parse_collection, s."createdAt" as "createdAt" FROM collection_stats s RIGHT OUTER JOIN collections c on ((c.id = s.collection_id) AND (s."createdAt" < :period) AND (show_collection IS TRUE)) ORDER BY c.id ASC, "createdAt" DESC); COMMIT;', { replacements: { period: this.parsePeriod(period.toUpperCase(), 2)  } })
        }
    }

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
}
