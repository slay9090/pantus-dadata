import { Injectable } from '@nestjs/common';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { CarModels, carModelsDocument } from './schemas/car-model.schema';

import {Categories, categoriesDocument} from '../categories/schemas/categories.schema';

import { QueryValidateDto } from './dto/query-validate.dto';

@Injectable()
export class CarModelsService {

  constructor(@InjectModel(CarModels.name)
              private carModelsModel: Model <carModelsDocument>,
              @InjectModel(Categories.name)
              private categoriesModel: Model <categoriesDocument>
  ) {}

  // constructor(@InjectModel(Categories.name) private categoriesModel: Model <categoriesDocument>) {}


  create(createCarModelDto: CreateCarModelDto) {
    const x = {a: 'xxxxx'}

    return this.carModelsModel.create(x)
  }

 async findAll(query) {

   const pageOptions = {
     page: parseInt(query.page, 10) || 0,
     limit: parseInt(query.limit, 10) || 10
   }

    const startTime : number = Date.now();
    const count = await this.carModelsModel.count()
    const data = await this.carModelsModel
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .lean()
      .exec()

    const endTime : number = Date.now();
    return [{meta: {count: count, explain: (endTime - startTime) + 'ms'}, data: data}]
  }

  async findSearch(query:QueryValidateDto) {
    // this.carModelsModel.createIndexes({CATEGORY_ID: 1})
    const carModels = await this.carModelsModel.find().where({SKU: query.sku,  BRAND: query.brand}).sort({CATEGORY_ID: 1}).lean().exec();
    return await this.joinCategories(carModels)
  }

  async joinCategories(data){
    const IdsCategories = data.map((elem) => {
      return elem.CATEGORY_ID
    });
    const  categories = await this.getCategoriesIds(IdsCategories)
    const  res  = [];
    data.map((elem, index) => {
      res.push({
        model: elem,
        categories: categories[index]
      })
    })
    // const x = await this.categoriesModel.find({ AC_TREE_ID: 12326 }).exec()
    // console.log(x);

   // const result = await Promise.all(data.map(async (elem) => {
   //   let cat = await this.getCategories(elem.CATEGORY_ID)
   //   return [{model: elem, categories: cat}]
   //  }));

    return res
   // return  result


  }

  async getCategories(id) {
   return  await this.categoriesModel.find({ AC_TREE_ID: id }).exec()
  }
  async getCategoriesIds(id) {
    // console.log(id)
    // return  await  this.carModelsModel.find({ AC_TREE_ID: id }).exec()
    // return  await  this.carModelsModel.find().where('AC_TREE_ID').in(id).exec()
    // this.categoriesModel.createIndexes({AC_TREE_ID: 1})
    return await this.categoriesModel.find({ AC_TREE_ID: {$in: id } }).sort({AC_TREE_ID: 1}).limit(10000).lean().explain("executionStats").exec()
  }


  // findOne(id: number) {
  //   return `This action returns a #${id} carModel`;
  // }
  //
  // update(id: number, updateCarModelDto: UpdateCarModelDto) {
  //   return `This action updates a #${id} carModel`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} carModel`;
  // }
}
