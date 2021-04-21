import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
const config = require('../configs/settings')

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatalogModule } from './catalog/catalog.module';




@Module({
  imports: [
    MongooseModule.forRoot(config.dbSrv,
      {dbName: config.dbName}
    ),

    CatalogModule

  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
