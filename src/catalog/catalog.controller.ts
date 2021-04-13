import { Controller, Get } from '@nestjs/common';

@Controller('catalog')
export class CatalogController {


  @Get()
  findAll() {
    return 'Сина, ты шо там, упоролся?'
  }

}
