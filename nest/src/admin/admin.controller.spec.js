import { Test } from '@nestjs/testing';
import { AdminController } from './admin.controller';

describe('Collections Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AdminController],
    }).compile();

    controller = module.get(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
