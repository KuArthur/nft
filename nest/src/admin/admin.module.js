import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AppModule } from '../app.module';
import DB from '../../database/DB';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [HttpModule],
  controllers: [AdminController],
  providers: [AdminService, ...DB.getProvider()],
  exports: [AdminService]
})
export class AdminModule {}
