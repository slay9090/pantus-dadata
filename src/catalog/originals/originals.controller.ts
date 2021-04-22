import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { OriginalsService } from './originals.service';
import { CreateOriginalDto } from './dto/create-original.dto';
import { UpdateOriginalDto } from './dto/update-original.dto';
import { QueryValidateDto } from './dto/query-validate.dto';
import { type } from 'os';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  originals_categories, originals_categoriesDocument, originals_parts,
} from './schemas/originals.schema';
import { SearchResponse } from './schemas/search-response.schema';

@ApiTags('originals parts')
@Controller('catalog/originals')
export class OriginalsController {
  constructor(private readonly originalsService: OriginalsService) {}

  // @Post()
  // create(@Body() createOriginalDto: CreateOriginalDto) {
  //   return this.originalsService.create(createOriginalDto);
  // }

  @Get('parts')
  getAllParts(@Query() query) {
    return this.originalsService.getAllParts(query);
  }

  @Get('categories')
  getAllCategories(@Query() query) {
    return this.originalsService.getAllCategories(query);
  }


  @Get('search')

  // @ApiResponse({
  //   status: 200,
  //   description: 'https://aoc.pantus.ru/catalog/originals/search?type=relevant&text=кАмазик 14.1701092&page=0&limit=100',
  //   isArray: true,
  //   // schema: {
  //   //   type: 'array',
  //   //   items: {
  //   //     type: 'object',
  //   //     items: {},
  //   //   },
  //   // },
  //   type:
  // })
  @ApiOkResponse({
    description: 'Cat object',
    type: SearchResponse,
    isArray: true // <= diff is here
  })
  async searchParts(@Query(new ValidationPipe({ skipMissingProperties: true })) query: QueryValidateDto )  {

    return await this.originalsService.search(query);
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.originalsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOriginalDto: UpdateOriginalDto) {
  //   return this.originalsService.update(+id, updateOriginalDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.originalsService.remove(+id);
  // }
}
