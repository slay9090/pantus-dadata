import { Injectable } from '@nestjs/common';
import { CreateCatalogPartDto } from './dto/create-catalog-part.dto';
import { UpdateCatalogPartDto } from './dto/update-catalog-part.dto';

@Injectable()
export class CatalogPartsService {
  create(createCatalogPartDto: CreateCatalogPartDto) {
    return 'This action adds a new catalogPart';
  }

  findAll() {
    return `This action returns all catalogParts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogPart`;
  }

  update(id: number, updateCatalogPartDto: UpdateCatalogPartDto) {
    return `This action updates a #${id} catalogPart`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogPart`;
  }
}
