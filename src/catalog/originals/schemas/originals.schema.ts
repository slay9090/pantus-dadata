import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type originals_partsDocument = originals_parts  & Document;

@Schema()
export class originals_parts  {
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

export const originals_partsSchema = SchemaFactory.createForClass(originals_parts );



export type originals_categoriesDocument = originals_categories  & Document;

@Schema()
export class originals_categories {
  @Prop()
  AC_TREE_ID: number
  @Prop()
  NAME: string
  @Prop()
  PARENT_ID: number
  @Prop()
  children: string[];
}
export const originals_categoriesSchema = SchemaFactory.createForClass(originals_categories );


