import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { OriginalsService } from './originals.service';
import { CreateOriginalDto } from './dto/create-original.dto';
import { UpdateOriginalDto } from './dto/update-original.dto';
import {
  GetAllCategoriesQueryValidateDto,
  GetAllPartsQueryValidateDto,
  SearchRelevantQueryValidateDto,
  SearchStrictQueryValidateDto,
} from './dto/query-validate.dto';
import { type } from 'os';
import { ApiBody, ApiOkResponse, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  originals_categories, originals_categoriesDocument, originals_parts,
} from './schemas/originals.schema';
import { SearchResponse } from './schemas/search-response.schema';

@ApiTags('Методы API каталога оригинальных з/ч')
@Controller('catalog/originals')
export class OriginalsController {
  constructor(private readonly originalsService: OriginalsService) {}


  @Get('parts')
  @ApiOperation({ summary: 'Получить все з/ч' })
  @ApiOkResponse({
    description: 'Example: https://aoc.pantus.ru/catalog/originals/parts?page=0&limit=1',
    type: originals_parts,
    isArray: true, // <= diff is here
  })
  getAllParts(@Query(new ValidationPipe({ skipMissingProperties: true })) query: GetAllPartsQueryValidateDto ) {
    return this.originalsService.getAllParts(query);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Получить все категории по бренду' })
  @ApiOkResponse({
    description: 'Example: https://aoc.pantus.ru/catalog/originals/categories?brand=ВАЗ&page=0&limit=1',
    type: originals_categories,
    isArray: true, // <= diff is here
  })
  getAllCategories(@Query(new ValidationPipe({ skipMissingProperties: true })) query: GetAllCategoriesQueryValidateDto) {
    return this.originalsService.getAllCategories(query);
  }


  @Get('search/strict')
  @ApiOperation({ summary: 'Строгий поиск' })
  @ApiOkResponse({
    description: 'Example: https://aoc.pantus.ru/catalog/originals/search/strict?sku=11183-1006322-00&page=0&limit=1',
    type: SearchResponse,
    isArray: true, // <= diff is here
  })
  async searchPartsStrict(@Query(new ValidationPipe({ skipMissingProperties: true })) query: SearchStrictQueryValidateDto )  {
    return await this.originalsService.searchStrict(query);
  }


  @Get('search/relevant')
  @ApiOperation({ summary: 'Релевантный поиск' })
  @ApiOkResponse({
    description: 'Структура ответа, пример: http://localhost:3000/catalog/originals/search/relevant?text=ВАЗ&page=0&limit=1',
    type: SearchResponse,
    isArray: true, // <= diff is here
  })
  async searchPartsRelevant(@Query(new ValidationPipe({ skipMissingProperties: true })) query: SearchRelevantQueryValidateDto )  {
    return await this.originalsService.searchRelevant(query);
  }

}
