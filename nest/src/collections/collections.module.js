import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { AppModule } from '../app.module';
import DB from '../../database/DB';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [HttpModule],
  controllers: [CollectionsController],
  providers: [CollectionsService, ...DB.getProvider()],
  exports: [CollectionsService]
})
export class CollectionsModule {}
