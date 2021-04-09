import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { CarModelsService } from './car-models.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { CarModels } from './schemas/car-model.schema';
import { QueryValidateDto } from './dto/query-validate.dto';

@Controller('car-models')
export class CarModelsController {
  constructor(private readonly carModelsService: CarModelsService) {}

  @Post()
  create(@Body() createCarModelDto: CreateCarModelDto) {
    return this.carModelsService.create(createCarModelDto);
  }

  @Get()
  findAll(@Query() query)  {

    return this.carModelsService.findAll(query);
  }

  @Get('search')
  async findSearch(@Query(ValidationPipe) query: QueryValidateDto )  {
    return await this.carModelsService.findSearch(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.carModelsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCarModelDto: UpdateCarModelDto) {
  //   return this.carModelsService.update(+id, updateCarModelDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.carModelsService.remove(+id);
  // }
}
