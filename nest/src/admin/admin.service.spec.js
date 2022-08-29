import { Test } from '@nestjs/testing';
import { AdminService } from './admin.service';

describe('CollectionsService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AdminService],
    }).compile();

    service = module.get(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
