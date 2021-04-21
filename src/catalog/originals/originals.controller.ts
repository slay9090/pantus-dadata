import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { OriginalsService } from './originals.service';
import { CreateOriginalDto } from './dto/create-original.dto';
import { UpdateOriginalDto } from './dto/update-original.dto';
import { QueryValidateDto } from './dto/query-validate.dto';
import { type } from 'os';


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
  async searchParts(@Query(ValidationPipe) query: QueryValidateDto )  {

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
