import { Test, TestingModule } from '@nestjs/testing';
import { OriginalsService } from './originals.service';

describe('OriginalsService', () => {
  let service: OriginalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OriginalsService],
    }).compile();

    service = module.get<OriginalsService>(OriginalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
