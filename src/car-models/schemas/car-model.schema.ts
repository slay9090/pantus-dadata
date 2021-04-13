import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type carModelsDocument = CarModels & Document;

@Schema()
export class CarModels {
  @Prop()
  BRAND: string
  @Prop()
  SKU: string
  @Prop()
  MODEL_NAME: string
  @Prop()
  NAME: string
  @Prop()
  CATEGORY_ID: number
}

export const carModelsSchema = SchemaFactory.createForClass(CarModels);
