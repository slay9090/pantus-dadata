import { Injectable } from '@nestjs/common';
import { CreateCatalogPartDto } from './dto/create-catalog-part.dto';
import { UpdateCatalogPartDto } from './dto/update-catalog-part.dto';
import { InjectModel } from "@nestjs/mongoose";
// import { CatalogPart, CatalogPartDocument } from "./schemas/catalog-part.entity";
import { Model } from "mongoose";
import { Categories, categoriesDocument } from './schemas/categories.schema';

@Injectable()
export class CatalogPartsService {

  // constructor(@InjectModel(CatalogPart.name) private catalogPartsModel: Model<CatalogPartDocument>) {
  // }

  constructor(@InjectModel(Categories.name) private categoriesModel: Model<categoriesDocument>) {}

 // async create(createCatalogPartDto: CreateCatalogPartDto) : Promise<Categories> {
 //    // return 'This action adds a new catalogPart';
 //   const newPart = new this.catalogPartsModel(createCatalogPartDto)
 //   return newPart.save()
 //  }

  async findAll(query) {

    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit, 10) || 10
    }

    const startTime : number = Date.now();
    const count = await this.categoriesModel.count()
    const data = await this.categoriesModel
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .lean()
      .exec()
    const endTime : number = Date.now();

    return [{meta: {count: count, explain: (endTime - startTime) + 'ms'}, data: data}]


  }

  // findOne(id: number) {
  //   return `This action returns a #${id} catalogPart`;
  // }
  //
  // update(id: number, updateCatalogPartDto: UpdateCatalogPartDto) {
  //   return `This action updates a #${id} catalogPart`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} catalogPart`;
  // }
}
