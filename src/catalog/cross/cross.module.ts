import { Module } from '@nestjs/common';
import { CrossService } from './cross.service';
import { CrossController } from './cross.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { cross_parts, cross_partsSchema } from './schemas/cross.schema';


@Module({
  controllers: [CrossController],
  providers: [CrossService],

  imports: [MongooseModule.forFeature([
    { name: cross_parts.name, schema: cross_partsSchema },

  ])],

})
export class CrossModule {}
