import { Module } from '@nestjs/common';
import { OriginalsService } from './originals.service';
import { OriginalsController } from './originals.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {
  originals_categories,
  originals_parts,
  originals_categoriesSchema,
  originals_partsSchema,
} from './schemas/originals.schema';

@Module({
  controllers: [OriginalsController],
  providers: [OriginalsService],
  imports: [MongooseModule.forFeature([
    { name: originals_parts.name, schema: originals_partsSchema },
    {name: originals_categories.name, schema: originals_categoriesSchema}
  ])],
})
export class OriginalsModule {}
