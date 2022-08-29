import { Module, OnModuleInit, Logger, Injectable } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bull';

@Injectable()
export class BullQueueProvider {
  constructor(
    @InjectQueue('setAllCollections') allCollections,
  ) {
    this.allCollections = allCollections;
  }

  async createSetCollectionJob({ slug, original_collection_id }) {
    await this.allCollections.add({ slug, original_collection_id }, { delay: 300 });
  }

  onModuleInit() {

  }
}
