import { isNotEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchCrossDto {
  @ApiProperty({ required: true, description: 'Оригинальный бренд', example: 'LADA' })
  @IsNotEmpty()
  @IsString()
  originalbrand: string;

  @ApiProperty({ required: true, description: 'Оригинальный Артикул', example: '11110-2215012' })
  @IsNotEmpty()
  @IsString()
  originalsku: string;

  @ApiProperty({ required: false, description: 'Номер страницы, по умолчанию 0', example: '0' })
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty({ required: false, description: 'Кол-во найденных объектов на странице, по умолчанию 10', example: '100' })
  @IsNotEmpty()
  @IsNumberString()
  limit: string;
}