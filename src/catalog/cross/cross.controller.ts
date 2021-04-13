import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrossService } from './cross.service';
import { CreateCrossDto } from './dto/create-cross.dto';
import { UpdateCrossDto } from './dto/update-cross.dto';

@Controller('catalog/cross')
export class CrossController {
  constructor(private readonly crossService: CrossService) {}

  @Post()
  create(@Body() createCrossDto: CreateCrossDto) {
    return this.crossService.create(createCrossDto);
  }

  @Get()
  findAll() {
    return this.crossService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crossService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrossDto: UpdateCrossDto) {
    return this.crossService.update(+id, updateCrossDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crossService.remove(+id);
  }
}
