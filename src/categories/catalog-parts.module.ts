import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { CatalogPartsService } from './catalog-parts.service';
import { CatalogPartsController } from './catalog-parts.controller';
// import { CatalogPart, CatalogPartSchema } from "./schemas/catalog-part.entity";

import { Categories, categoriesSchema } from './schemas/categories.schema';

@Module({
  controllers: [CatalogPartsController],
  providers: [CatalogPartsService],
  // imports: [MongooseModule.forFeature([
  //   {name: CatalogPart.name, schemas: CatalogPartSchema}
  // ])],
  imports: [MongooseModule.forFeature([{ name: Categories.name, schema: categoriesSchema }])],
})
export class CategoriesModule {}
