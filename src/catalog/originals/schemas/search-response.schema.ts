import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { originals_categories, originals_parts } from './originals.schema';

export class SearchResponse {
  /**
   * The name of the Cat
   * @example Kitty
   */
  //
  // @ApiProperty({ example: 'ВАЗ', description: 'Название бренда' })
  // BRAND: string
  //
  // @ApiProperty({ example: '11180-3101301-01', description: 'Артикул' })
  // SKU: string
  //
  // @ApiProperty({ example: 'Granta Cross', description: 'Название модели авто' })
  // MODEL_NAME: string
  //
  // @ApiProperty({ example: 'Груз колеса балансировочный 8450051095', description: 'Название з/п' })
  // NAME: string
  //
  // @ApiProperty({ example: 3562323, description: 'Идентификатор категории' })
  // CATEGORY_ID: number

  // @ApiProperty({
  //   type: 'array',
  //   items: {
  //     type: 'array',
  //     items: {
  //       type: 'number',
  //     },
  //   },
  // })


  @ApiProperty({ example: originals_parts, description: 'Идентификатор категории' })
  part: originals_parts

  @ApiProperty({ example: originals_categories, description: 'Идентификатор категории', isArray: true })
  categories: originals_categories


}