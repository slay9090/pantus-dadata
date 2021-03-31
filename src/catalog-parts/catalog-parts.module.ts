import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { CatalogPartsService } from './catalog-parts.service';
import { CatalogPartsController } from './catalog-parts.controller';
import { CatalogPart, CatalogPartSchema } from "./entities/catalog-part.entity";

@Module({
  controllers: [CatalogPartsController],
  providers: [CatalogPartsService],
  imports: [MongooseModule.forFeature([
    {name: CatalogPart.name, schema: CatalogPartSchema}
  ])],
})
export class CatalogPartsModule {}
