import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { cross_parts, cross_partsDocument } from './schemas/cross.schema';
import { CreateCrossDto } from './dto/create-cross.dto';
import { UpdateCrossDto } from './dto/update-cross.dto';
import { SearchCrossDto } from './dto/search-cross.dto';

import { GetAllCrossDto } from './dto/get-all-cross.dto';




@Injectable()
export class CrossService {

  constructor(@InjectModel(cross_parts.name)
              private crossParts: Model <cross_partsDocument>,

  ) {}

  // create(createCrossDto: CreateCrossDto) {
  //   return 'This action adds a new cross';
  // }


  async getAll(query: GetAllCrossDto) {
    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit, 10) || 10
    }

    const startTime : number = Date.now();
    const count = await this.crossParts.count()
    const data = await this.crossParts
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .lean()
      .exec()

    const endTime : number = Date.now();
    return [
      {
        meta: {
          count: count,
          explain: (endTime - startTime) + 'ms',
          query:  query ,
        },
        data: data

      }];
  }

  async search(query:SearchCrossDto) {

    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit) === 0 ? parseInt(query.limit) : parseInt(query.limit) ? parseInt(query.limit) : 10
    }

    // this.carModelsModel.createIndexes({CATEGORY_ID: 1})
    const startTime : number = Date.now();
    const count = await this.crossParts.find().where({sku_original: query.originalsku,  brand_original: query.originalbrand}).count()
    const crossPartsData = await this.crossParts
      .find({}, { sku_analog: 1, brand_analog:  1 })
      .where({sku_original: query.originalsku,  brand_original: query.originalbrand})
      .skip(pageOptions.page * pageOptions.limit)
      .limit(0)
      .sort({brand_analog: 1})
      .lean()
      .exec();

    const endTime : number = Date.now();


    return [
      {
        meta: {
          count: count,
          explain: (endTime - startTime) + 'ms',
          query:  query ,
        },
        data: [
          {
            crossparts: crossPartsData,
          },
        ],
      }];

  }



  // findOne(id: number) {
  //   return `This action returns a #${id} cross`;
  // }
  //
  // update(id: number, updateCrossDto: UpdateCrossDto) {
  //   return `This action updates a #${id} cross`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} cross`;
  // }
}
