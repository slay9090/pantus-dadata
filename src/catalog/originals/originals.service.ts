import { Injectable } from '@nestjs/common';
import { CreateOriginalDto } from './dto/create-original.dto';
import { UpdateOriginalDto } from './dto/update-original.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import {
  originals_categories,
  originals_categoriesDocument,
  originals_parts,
  originals_partsDocument,
} from './schemas/originals.schema';
import { QueryValidateDto } from '../../car-models/dto/query-validate.dto';


@Injectable()
export class OriginalsService {
  // create(createOriginalDto: CreateOriginalDto) {
  //   return 'This action adds a new original';
  // }

  constructor(@InjectModel(originals_parts.name)
              private originalsParts: Model <originals_partsDocument>,
              @InjectModel(originals_categories.name)
              private originalsCategories: Model <originals_categoriesDocument>
  ) {}

 async getAllParts(query) {
    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit, 10) || 10
    }

    const startTime : number = Date.now();
    const count = await this.originalsParts.count()
    const data = await this.originalsParts
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .lean()
      .exec()

    const endTime : number = Date.now();
    return [{meta: {count: count, explain: (endTime - startTime) + 'ms'}, data: data}]
  }

  async getAllCategories(query) {
    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit, 10) || 10
    }

    const startTime : number = Date.now();
    const count = await this.originalsCategories.count()
    const data = await this.originalsCategories
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .lean()
      .exec()

    const endTime : number = Date.now();
    return [{meta: {count: count, explain: (endTime - startTime) + 'ms'}, data: data}]
  }





  // findOne(id: number) {
  //   return `This action returns a #${id} original`;
  // }
  //
  // update(id: number, updateOriginalDto: UpdateOriginalDto) {
  //   return `This action updates a #${id} original`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} original`;
  // }

  async search(query:QueryValidateDto) {

    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit, 10) || 10
    }

    // this.carModelsModel.createIndexes({CATEGORY_ID: 1})
    const startTime : number = Date.now();
    const count = await this.originalsParts.find().where({SKU: query.sku,  BRAND: query.brand}).count()
    const carModels = await this.originalsParts
      .find()
      .where({SKU: query.sku,  BRAND: query.brand})
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .sort({CATEGORY_ID: 1})
      .lean()
      .exec();

    const endTime : number = Date.now();




    async function joinCategories(data, originalsCategories){

      const IdsCategories = data.map((elem) => {
        return elem.CATEGORY_ID
      });
      const  categories = await getCategoriesIds(IdsCategories, originalsCategories)
      const  res  = [];
      data.map((elem, index) => {
        res.push({
          model: elem,
          categories: categories[index]
        })
      })

      return res


    }

    async function getCategoriesIds(ids, originalsCategories) {

      let result = []

      const arr = await originalsCategories.find({}).sort({AC_TREE_ID: 1}).lean().exec()



      function getPatch (ids){
        arr.forEach(elem => {
          ids.forEach((id, index) => {
            if (elem.AC_TREE_ID === id) {
              result[index] = elem
              if(elem.PARENT_ID !== null){
                // console.log(elem.PARENT_ID, index);
                recursive(elem.PARENT_ID, index)
              }
            }
          })

        })

      }

      function recursive(parrentId, index){
        arr.forEach( elem => {
          if (elem.AC_TREE_ID === parrentId) {
            result[index] = { ...elem , child: result[index]}

            if(elem.PARENT_ID !== null){
              recursive(elem.PARENT_ID, index)
            }

          }
        })
      }

      getPatch(ids);

      return result



    }


    return [{meta: {count: count, explain: (endTime - startTime) + 'ms'}, data: await joinCategories(carModels, this.originalsCategories)}]





  }





}
