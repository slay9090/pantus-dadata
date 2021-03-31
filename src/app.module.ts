import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogPartsModule } from './catalog-parts/catalog-parts.module';




@Module({
  imports: [CatalogPartsModule,
    MongooseModule.forRoot('mongodb+srv://pantus:442541Qw@@cluster0.3sjds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
