import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { CrossService } from './cross.service';
import { CreateCrossDto } from './dto/create-cross.dto';
import { UpdateCrossDto } from './dto/update-cross.dto';
// import { QueryValidateDto } from '../originals/dto/query-validate.dto';
import { SearchCrossDto } from './dto/search-cross.dto';
import { GetAllCrossDto } from './dto/get-all-cross.dto';

@Controller('catalog/cross')
export class CrossController {
  constructor(private readonly crossService: CrossService) {}

  // @Post()
  // create(@Body() createCrossDto: CreateCrossDto) {
  //   return this.crossService.create(createCrossDto);
  // }

  @Get('search')
  search(@Query(ValidationPipe) query: SearchCrossDto) {
    return this.crossService.search(query);
  }

  @Get('parts')
  getAllParts(@Query(ValidationPipe) query: GetAllCrossDto) {
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
