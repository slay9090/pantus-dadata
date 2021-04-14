import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type cross_partsDocument = cross_parts  & Document;

@Schema()
export class cross_parts  {


  @Prop()
  sku_original: string
  @Prop()
  brand_original: string
  @Prop()
  sku_analog: string
  @Prop()
  brand_analog: string



}

export const cross_partsSchema = SchemaFactory.createForClass(cross_parts );






