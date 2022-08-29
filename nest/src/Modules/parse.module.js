import { ParseProvider } from './parse.provider';
import { Module } from '@nestjs/common';
import { BullQueueModule } from '../BullQueue/bullQueue.module';
import { WinstonModule } from 'nest-winston';
import SlackHook from 'winston-slack-webhook-transport';
import DB from '../../database/DB';
import { SetCollectionsCommand, UpdateCollectionsCommand, UpdateCollectionsImagesCommand, RemoveDuplicatesCommand, AddCollectionsCommand, CheckParserCommand } from '../../commands/parse.command';

@Module({
  imports: [BullQueueModule, WinstonModule.forRoot({
    level: 'error',
    transports: [
      new SlackHook({
        webhookUrl: process.env.LOG_SLACK_WEBHOOK
      })
    ]
  })],
  providers: [ SetCollectionsCommand, UpdateCollectionsCommand, UpdateCollectionsImagesCommand, RemoveDuplicatesCommand, AddCollectionsCommand, CheckParserCommand, ParseProvider, ...DB.getProvider() ],
  exports: [ SetCollectionsCommand, UpdateCollectionsCommand, UpdateCollectionsImagesCommand, RemoveDuplicatesCommand, AddCollectionsCommand, CheckParserCommand, ParseProvider],
})
export class ParseModule {}
