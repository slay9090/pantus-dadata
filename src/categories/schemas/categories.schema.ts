import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type categoriesDocument = Categories & Document;

@Schema()
export class Categories {
  @Prop()
  AC_TREE_ID: number
  @Prop()
  NAME: string
  @Prop()
  PARENT_ID: string
}

export const categoriesSchema = SchemaFactory.createForClass(Categories);