import { Test, TestingModule } from '@nestjs/testing';
import { CatalogPartsController } from './catalog-parts.controller';
import { CatalogPartsService } from './catalog-parts.service';

describe('CatalogPartsController', () => {
  let controller: CatalogPartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogPartsController],
      providers: [CatalogPartsService],
    }).compile();

    controller = module.get<CatalogPartsController>(CatalogPartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
