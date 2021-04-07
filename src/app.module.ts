import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/catalog-parts.module';
import { CarModelsModule } from './car-models/car-models.module';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:dagdycUCFYbV9kAu@adm-dev.pantus.ru:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
      {dbName: 'original-nomenclature'}
    ),
    CategoriesModule,
    CarModelsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
