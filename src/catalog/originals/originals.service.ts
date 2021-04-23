import { Injectable } from '@nestjs/common';
import { CreateOriginalDto } from './dto/create-original.dto';
import { UpdateOriginalDto } from './dto/update-original.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  originals_categories,
  originals_categoriesDocument,
  originals_parts,
  originals_partsDocument,
} from './schemas/originals.schema';
import {
  GetAllCategoriesQueryValidateDto,
  GetAllPartsQueryValidateDto,
  SearchRelevantQueryValidateDto,
  SearchStrictQueryValidateDto,
} from './dto/query-validate.dto';



@Injectable()
export class OriginalsService {
  // create(createOriginalDto: CreateOriginalDto) {
  //   return 'This action adds a new original';
  // }

  constructor(@InjectModel(originals_parts.name)
              private originalsParts: Model<originals_partsDocument>,
              @InjectModel(originals_categories.name)
              private originalsCategories: Model<originals_categoriesDocument>,
  ) {
  }

  async getAllParts(query: GetAllPartsQueryValidateDto) {
    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit, 10) || 10,
    };

    const startTime: number = Date.now();
    const count = await this.originalsParts.count();
    const data = await this.originalsParts
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .lean()
      .exec();

    const endTime: number = Date.now();

    return [
      {
        meta: {
          count: count,
          explain: (endTime - startTime) + 'ms',
          query: query,
        },
        data: data,

      }];
  }

  async getAllCategories(query: GetAllCategoriesQueryValidateDto) {
    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit) === 0 ? parseInt(query.limit) : parseInt(query.limit) ? parseInt(query.limit) : 10,
    };

    const startTime: number = Date.now();
    const count = await this.originalsParts.find({}, { CATEGORY_ID: 1 }).where({ BRAND: query.brand }).sort({ CATEGORY_ID: 1 }).distinct('CATEGORY_ID').count();
    const brandsIds = await this.originalsParts.find({}, { CATEGORY_ID: 1 }).where({ BRAND: query.brand }).sort({ CATEGORY_ID: 1 }).distinct('CATEGORY_ID').exec();


    async function getTreeCategoriesByIds(ids, originalsCategories) {


      let result = [];

      const arr = await originalsCategories
        .find({})
        .sort({ CATEGORY_ID: 1 })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .lean()
        .exec();

      // console.log(arr);

      function getPatch(ids) {
        arr.forEach(elem => {
          // console.log(elem);
          ids.forEach((id, index) => {

            // console.log(elem.CATEGORY_ID);
            if (elem.CATEGORY_ID === id) {
              // console.log(elem);
              // console.log(elem.CATEGORY_ID);
              result[index] = elem;
              if (elem.CATEGORY_PARENT_ID !== null) {
                // console.log(elem.CATEGORY_PARENT_ID, index);
                recursive(elem.CATEGORY_PARENT_ID, index);
              }
            }
          });

        });

      }

      function recursive(parrentId, index) {
        arr.forEach(elem => {
          if (elem.CATEGORY_ID === parrentId) {
            // console.log(elem);
            result[index] = { ...elem, child: result[index] };

            if (elem.CATEGORY_PARENT_ID !== null) {
              recursive(elem.CATEGORY_PARENT_ID, index);
            }

          }
        });
      }

      getPatch(ids);

      return result;


    }

    const endTime: number = Date.now();

    return [
      {
        meta: {
          count: count,
          explain: (endTime - startTime) + 'ms',
          query: query,
        },
        data: await getTreeCategoriesByIds(brandsIds, this.originalsCategories),

      }];
  }


  async searchStrict(query: SearchStrictQueryValidateDto) {
    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit) === 0 ? parseInt(query.limit) : parseInt(query.limit) ? parseInt(query.limit) : 10,
    };

    const startTime: number = Date.now();

    // @ts-ignore
    const getExisting = (obj) => Object.assign(...Object.keys(obj)
      .filter(key => obj[key] !== undefined)
      .map(key => ({ [key]: obj[key] })));

    const count = await this.originalsParts.find().where(getExisting({ SKU: query.sku, BRAND: query.brand })).count();
    const carModels = await this.originalsParts
      .find()
      .where(getExisting({ SKU: query.sku, BRAND: query.brand }))
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .sort({ CATEGORY_ID: 1 })
      .lean()
      .exec();

    const endTime: number = Date.now();

    return [
      {
        meta: {
          count: count,
          explain: (endTime - startTime) + 'ms',
          query: query,
        },
        data: await this.joinCategories(carModels, this.originalsCategories),
      }];

  }

  async searchRelevant(query: SearchRelevantQueryValidateDto) {
    const pageOptions = {
      page: parseInt(query.page, 10) || 0,
      limit: parseInt(query.limit) === 0 ? parseInt(query.limit) : parseInt(query.limit) ? parseInt(query.limit) : 10,
    };
    const startTime: number = Date.now();
    const count: number = await this.originalsParts.find({ $text: { $search: query.text } }, { score: { $meta: 'textScore' } }).count();
    const carModels: Array<object> = await this.originalsParts
      .find({ $text: { $search: query.text } }, { RATING: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .lean()
      .exec();

    const endTime: number = Date.now();

    return [
      {
        meta: {
          count: count,
          explain: (endTime - startTime) + 'ms',
          query: query,
        },
        data: await this.joinCategories(carModels, this.originalsCategories),
      }];


  }


  // ========================
  //  INTERNAL FUNCTION
  // ========================
  async joinCategories(data, originalsCategories) {

    const IdsCategories = data.map((elem) => {
      return elem.CATEGORY_ID;
    });
    const categories = await this.getCategoriesIds(IdsCategories, originalsCategories);
    const res = [];
    data.map((elem, index) => {
      res.push({
        part: elem,
        categories: categories[index],
      });
    });
    return res;
  }

  async getCategoriesIds(ids, originalsCategories) {

    let result = [];

    const arr = await originalsCategories.find({}).sort({ CATEGORY_ID: 1 }).lean().exec();


    function getPatch(ids) {
      arr.forEach(elem => {
        ids.forEach((id, index) => {
          if (elem.CATEGORY_ID === id) {
            result[index] = elem;
            if (elem.CATEGORY_PARENT_ID !== null) {
              // console.log(elem.CATEGORY_PARENT_ID, index);
              recursive(elem.CATEGORY_PARENT_ID, index);
            }
          }
        });

      });

    }

    function recursive(parrentId, index) {
      arr.forEach(elem => {
        if (elem.CATEGORY_ID === parrentId) {
          result[index] = { ...elem, child: result[index] };

          if (elem.CATEGORY_PARENT_ID !== null) {
            recursive(elem.CATEGORY_PARENT_ID, index);
          }

        }
      });
    }

    getPatch(ids);

    return result;


  }


}
