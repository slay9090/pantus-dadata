import { Module } from '@nestjs/common';
import { CarModelsService } from './car-models.service';
import { CarModelsController } from './car-models.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, categoriesSchema } from '../categories/schemas/categories.schema';
import { CarModels, carModelsSchema } from './schemas/car-model.schema';

@Module({
  controllers: [CarModelsController],
  providers: [CarModelsService],
  imports: [MongooseModule.forFeature([
    { name: CarModels.name, schema: carModelsSchema },
    {name: Categories.name, schema: categoriesSchema}
    ])],
})
export class CarModelsModule {}
