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

  findAll() {
    return this.carModelsModel.find().limit(50).exec()
  }

  async findSearch(query:QueryValidateDto) {
    const carModels = await this.carModelsModel.find().where({SKU: query.sku,  BRAND: query.brand}).exec()

    // this.joinCategories(carModels);
    console.log(await this.joinCategories(carModels));



    return carModels
  }
  async joinCategories(data){

   const result = data.map(elem => {
        this.categoriesModel.find().where({AC_TREE_ID: elem.CATEGORY_ID})
    })

   return  await result


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
