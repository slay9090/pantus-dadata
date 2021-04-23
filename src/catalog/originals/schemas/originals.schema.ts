import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';


export type originals_partsDocument = originals_parts  & Document;

@Schema()
export class originals_parts  {
  @Prop()
  @ApiProperty({ example: 'ВАЗ', description: 'Название бренда' })
  BRAND: string
  @Prop()
  @ApiProperty({ example: '11183-1006322-00', description: 'Артикул' })
  SKU: string
  @Prop()
  @ApiProperty({ example: '21728', description: 'Название модели авто' })
  MODEL_NAME: string
  @Prop()
  @ApiProperty({ example: 'Уплотнитель', description: 'Название з/п' })
  NAME: string
  @Prop()
  @ApiProperty({ example: 2007474, description: 'Идентификатор категории' })
  CATEGORY_ID: number
}

export const originals_partsSchema = SchemaFactory.createForClass(originals_parts );



export type originals_categoriesDocument = originals_categories  & Document;

@Schema()
export class originals_categories {
  @Prop()
  @ApiProperty({ example: 2007467, description: 'Идентификатор категории' })
  CATEGORY_ID: number
  @Prop()
  @ApiProperty({ example: null, description: 'Идентификатор родительской категории' })
  CATEGORY_PARENT_ID: number
  @Prop()
  @ApiProperty({ example: 'Двигатель', description: 'Название категории' })
  CATEGORY_NAME: string


  @ApiProperty({ example: {
      "CATEGORY_ID": 2007472,
      "CATEGORY_PARENT_ID": 2007467,
      "CATEGORY_NAME": "Основные элементы двигателя",
      "child": {
        "CATEGORY_ID": 2007474,
        "CATEGORY_PARENT_ID": 2007472,
        "CATEGORY_NAME": "Механизм газораспределительный, привод распределительного вала 16-клапанный двигатель"
      }

    }, description: 'Название категории' })
  child: object

}
export const originals_categoriesSchema = SchemaFactory.createForClass(originals_categories );


