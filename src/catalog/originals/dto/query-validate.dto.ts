import {
  IsDefined,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString, NotEquals, Validate, ValidateIf,
} from 'class-validator';

import { searchType } from '../../property/enums/originals';
import { IsLimitCountRelevantSearch } from '../../property/customValidation/limitCountRelevantSearch';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

export class GetAllPartsQueryValidateDto {

  @ApiProperty({ required: false, description: 'Номер страницы, по умолчанию 0', example: '0' })
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty({ required: false, description: 'Кол-во найденных объектов на странице, по умолчанию 10', example: '100' })
  @IsNotEmpty()
  @IsNumberString()
  limit: string;
}

export class GetAllCategoriesQueryValidateDto {
  @ApiProperty({ required: true, description: 'Название бренда', example: 'ВАЗ'})
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ required: false, description: 'Номер страницы, по умолчанию 0', example: '0' })
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty({ required: false, description: 'Кол-во найденных объектов на странице, по умолчанию 10', example: '100' })
  @IsNotEmpty()
  @IsNumberString()
  limit: string;
}

export class SearchStrictQueryValidateDto {
  @ApiProperty({ required: false, description: 'Название бренда', example: 'ВАЗ'})
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ required: true, description: 'Код артикула', example: '11183-1006322-00' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ required: false, description: 'Номер страницы, по умолчанию 0', example: '0' })
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty({ required: false, description: 'Кол-во найденных объектов на странице, по умолчанию 10', example: '100' })
  @IsNotEmpty()
  @IsNumberString()
  limit: string;
}

export class SearchRelevantQueryValidateDto {
  @ApiProperty({ required: true, description: 'Текст который будем искать, поиск происходит одновременно и по SKU и по BRAND.', example: 'ВАЗ 11183-1006322' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: false, description: 'Номер страницы, по умолчанию 0', example: '0' })
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty({ required: false, description: 'Кол-во найденных объектов на странице, по умолчанию 10', example: '1' })
  @IsNotEmpty()
  @IsNumberString()
  @NotEquals('0')
  limit: string;
}