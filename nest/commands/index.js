require('dotenv').config();

import { CommandFactory } from 'nest-commander';
import { ParseModule } from '../src/Modules/parse.module';
import DB from '../database/DB';
import { Sequelize } from 'sequelize-typescript';

(async () => {
  // const db = new DB();
  //
  // const sequelize = new Sequelize(db.options);
  // sequelize.addModels(db.models);

  await CommandFactory.runWithoutClosing(ParseModule, ['warn', 'error']);
})();
