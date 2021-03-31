import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CatalogPartDocument = CatalogPart & Document;


@Schema()
export class CatalogPart {
  @Prop()
  applicabilities: string
  @Prop()
  categories_group: string
  @Prop()
  categories_chapter: string
  @Prop()
  categories_node: string
  @Prop()
  name: string
  @Prop()
  oem_code: string
  @Prop()
  ole: string
}

export const CatalogPartSchema = SchemaFactory.createForClass(CatalogPart)
