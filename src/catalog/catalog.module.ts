import { Module } from '@nestjs/common';

import { OriginalsModule } from './originals/originals.module';
import { CrossModule } from './cross/cross.module';
//
import { CatalogController } from './catalog.controller';





@Module({
  imports: [

    OriginalsModule,
    CrossModule,


  ],
  controllers: [CatalogController],
  // providers: [AppService],
})


export class CatalogModule {}
