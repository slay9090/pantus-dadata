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







export class QueryValidateDto {
  @ApiProperty({ required: true, enum: searchType })
  @IsNotEmpty()
  @IsDefined()
  @IsEnum(searchType, {message: `Значение параметра запроса 'type', может иметь только следующие типы: ${Object.values(searchType) }`,})
  type: searchType;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumberString()
  @IsLimitCountRelevantSearch('type', {message: `Значение $value для 'limit' при релевантном поиске запрещено`,})
  limit: string;
}