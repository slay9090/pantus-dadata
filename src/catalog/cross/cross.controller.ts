import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { CrossService } from './cross.service';
import { CreateCrossDto } from './dto/create-cross.dto';
import { UpdateCrossDto } from './dto/update-cross.dto';
// import { QueryValidateDto } from '../originals/dto/query-validate.dto';
import { SearchCrossDto } from './dto/search-cross.dto';
import { GetAllCrossDto } from './dto/get-all-cross.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { originals_categories } from '../originals/schemas/originals.schema';
import { cross_parts } from './schemas/cross.schema';
import { GetAllCategoriesQueryValidateDto } from '../originals/dto/query-validate.dto';

@ApiTags('Методы API каталога кросс з/ч')
@Controller('catalog/cross')
export class CrossController {
  constructor(private readonly crossService: CrossService) {}

  // @Post()
  // create(@Body() createCrossDto: CreateCrossDto) {
  //   return this.crossService.create(createCrossDto);
  // }

  @Get('search')
  @ApiOperation({ summary: 'Строгий поиск' })
  @ApiOkResponse({
    description: 'Example: https://aoc.pantus.ru/catalog/cross/search?originalbrand=LADA&originalsku=11110-2215012&page=0&limit=1',
    type: cross_parts,
    isArray: true, // <= diff is here
  })
  search(@Query(new ValidationPipe({ skipMissingProperties: true })) query: SearchCrossDto) {
    return this.crossService.search(query);
  }

  @Get('parts')
  @ApiOperation({ summary: 'Получить все з/ч' })
  @ApiOkResponse({
    description: 'Example: https://aoc.pantus.ru/catalog/cross/parts?page=0&limit=1',
    type: cross_parts,
    isArray: true, // <= diff is here
  })
  getAllParts(@Query(new ValidationPipe({ skipMissingProperties: true })) query: GetAllCrossDto) {
    return this.crossService.getAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.crossService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCrossDto: UpdateCrossDto) {
  //   return this.crossService.update(+id, updateCrossDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.crossService.remove(+id);
  // }
}
