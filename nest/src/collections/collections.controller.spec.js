import { Test } from '@nestjs/testing';
import { CollectionsController } from './collections.controller';

describe('Collections Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CollectionsController],
    }).compile();

    controller = module.get(CollectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
