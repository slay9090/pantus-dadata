import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';


export type cross_partsDocument = cross_parts  & Document;

@Schema()
export class cross_parts  {

  @ApiProperty({ example: '11110-2215012', description: 'Оригинальный артикул' })
  @Prop()
  sku_original: string

  @ApiProperty({ example: 'LADA', description: 'Оригинальный бренд' })
  @Prop()
  brand_original: string

  @ApiProperty({ example: '821856', description: 'Артикул аналог' })
  @Prop()
  sku_analog: string

  @ApiProperty({ example: 'AUTEX', description: 'Бренд аналог' })
  @Prop()
  brand_analog: string

}

export const cross_partsSchema = SchemaFactory.createForClass(cross_parts );






