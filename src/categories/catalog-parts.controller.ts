import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CatalogPartsService } from './catalog-parts.service';
import { CreateCatalogPartDto } from './dto/create-catalog-part.dto';
import { UpdateCatalogPartDto } from './dto/update-catalog-part.dto';
// import { CatalogPart } from "./entities/catalog-part.entity";
import { Categories } from './schemas/categories.schema';

@Controller('categories')
export class CatalogPartsController {
  constructor(private readonly catalogPartsService: CatalogPartsService) {}

  // @Post()
  // create(@Body() createCatalogPartDto: CreateCatalogPartDto) : Promise<CatalogPart> {
  //   return this.catalogPartsService.create(createCatalogPartDto);
  // }

  @Get()
  async findAll(@Query() query)  {
    return await this.catalogPartsService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.catalogPartsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCatalogPartDto: UpdateCatalogPartDto) {
  //   return this.catalogPartsService.update(+id, updateCatalogPartDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.catalogPartsService.remove(+id);
  // }
}
