import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatalogModule } from './catalog/catalog.module';




@Module({
  imports: [
    MongooseModule.forRoot('',
      {dbName: 'dadata'}
    ),

    CatalogModule

  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
