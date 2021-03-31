import { Test, TestingModule } from '@nestjs/testing';
import { CatalogPartsService } from './catalog-parts.service';

describe('CatalogPartsService', () => {
  let service: CatalogPartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogPartsService],
    }).compile();

    service = module.get<CatalogPartsService>(CatalogPartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
