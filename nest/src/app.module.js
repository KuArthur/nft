import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { CollectionsModule } from './collections/collections.module';
import bullConfig from './BullQueue/bullConfig';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    HttpModule,
    BullModule.forRoot(bullConfig),
    CollectionsModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
