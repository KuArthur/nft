import { Test } from '@nestjs/testing';
import { CollectionsService } from './collections.service';

describe('CollectionsService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CollectionsService],
    }).compile();

    service = module.get(CollectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
