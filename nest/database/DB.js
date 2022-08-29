import {SequelizeModule} from '@nestjs/sequelize';
import {Sequelize} from 'sequelize-typescript';
import {Collection} from './Models/collection.model';
import {Asset} from './Models/asset.model';
import {Event} from './Models/event.model';
import {Trait} from './Models/trait.model';
import {TraitValue} from './Models/traitValue.model';
import {EtheriumStats} from './Models/etheriumStats.model';
import {OriginalCollection} from './Models/originalCollection.model';
import {CollectionLists} from './Models/collectionLists.model';
import {CollectionListValues} from './Models/collectionListValues.model';
import { CollectionStat } from './Models/collectionStat.model';
import { GlobalSettings } from './Models/globalSettings.model';

class DB {
    constructor() {
        this.models = [Collection, Asset, Event, Trait, TraitValue, EtheriumStats, OriginalCollection, CollectionLists, CollectionListValues, CollectionStat, GlobalSettings];
        this.options = {
          dialect: 'postgres',
          host: process.env.DB_HOST,
          port: 5432,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          synchronize: true,
          models: this.models,
          logging: console.log,
          benchmark: true,
        };
        this.sequelize = new Sequelize(this.options);
    }

    getProvider() {
        return [{
            provide: 'SEQUELIZE',
            useFactory: async () => {
                return this.sequelize;
            }
        }]
    }
}

export default new DB();
