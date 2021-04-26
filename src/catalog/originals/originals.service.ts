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
    var endTime: number = null
    const count = await this.originalsParts.find({}, { CATEGORY_ID: 1 }).where({ BRAND: query.brand }).sort({ CATEGORY_ID: 1 }).distinct('CATEGORY_ID').count();
    const brandsIds = await this.originalsParts.find({}, { CATEGORY_ID: 1 }).where({ BRAND: query.brand }).sort({ CATEGORY_ID: 1 }).distinct('CATEGORY_ID').lean().exec();
    const arr = await this.originalsCategories
      .find({CATEGORY_ID: {$gte: 0}},{CATEGORY_ID: 1, CATEGORY_PARENT_ID: 1, CATEGORY_NAME: 1})
      .sort({ CATEGORY_ID: 1 })
      .lean()
      .exec();

    endTime = Date.now();

    let elements = {};
    arr.forEach(obj => {
      elements[obj.CATEGORY_ID] = obj;
    });

    async function  getTreeCategoriesByIds(ids) {
      return ids.map(id => {
        let obj = { ...elements[id] };
        while (obj.CATEGORY_PARENT_ID) {
          obj = { ...elements[obj.CATEGORY_PARENT_ID], CHILD: obj };
        }
        return obj;
      });
    }

    return [
      {
        meta: {
          count: count,
          explain: (endTime - startTime) + 'ms',
          query: query,
        },
        data: await getTreeCategoriesByIds(pageOptions.limit === 0 ? brandsIds : brandsIds.slice(pageOptions.page * pageOptions.limit, (pageOptions.page * pageOptions.limit) + pageOptions.limit), ),

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
