import { Injectable } from '@nestjs/common';
import { CreateCatalogPartDto } from './dto/create-catalog-part.dto';
import { UpdateCatalogPartDto } from './dto/update-catalog-part.dto';
import { InjectModel } from "@nestjs/mongoose";
import { CatalogPart, CatalogPartDocument } from "./entities/catalog-part.entity";
import { Model } from "mongoose";

@Injectable()
export class CatalogPartsService {

  constructor(@InjectModel(CatalogPart.name) private catalogPartsModel: Model<CatalogPartDocument>) {
  }

 async create(createCatalogPartDto: CreateCatalogPartDto) : Promise<CatalogPart> {
    // return 'This action adds a new catalogPart';
   const newPart = new this.catalogPartsModel(createCatalogPartDto)
   return newPart.save()
  }

  async findAll(): Promise<CatalogPart[]> {
    return this.catalogPartsModel.find().exec()
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
