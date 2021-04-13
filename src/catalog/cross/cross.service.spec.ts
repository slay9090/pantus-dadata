import { Test, TestingModule } from '@nestjs/testing';
import { CrossService } from './cross.service';

describe('CrossService', () => {
  let service: CrossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrossService],
    }).compile();

    service = module.get<CrossService>(CrossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
