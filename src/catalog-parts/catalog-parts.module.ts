import { Module } from '@nestjs/common';
import { CatalogPartsService } from './catalog-parts.service';
import { CatalogPartsController } from './catalog-parts.controller';

@Module({
  controllers: [CatalogPartsController],
  providers: [CatalogPartsService]
})
export class CatalogPartsModule {}
