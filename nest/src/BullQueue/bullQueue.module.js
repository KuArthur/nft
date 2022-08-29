import { Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LaunchAsyncParse, LaunchSimpleParsing, LaunchSetCollections, LaunchSetStats, LaunchRemoveDuplicates } from './processors';
import bullConfig from './bullConfig';
import { BullQueueProvider } from './bullQueue.provider';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'setAllCollections',
      ...bullConfig,
      processors: [{
        concurrency: 1, callback: LaunchSetCollections,
      }],
    }),
    Logger
  ],
  providers: [BullQueueProvider],
  exports: [BullQueueProvider],
  controllers: [],
})
export class BullQueueModule {}
