import { isNotEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllCrossDto {
  @ApiProperty({ required: false, description: 'Номер страницы, по умолчанию 0', example: '0' })
  @IsNotEmpty()
  @IsNumberString()
  page: string;

  @ApiProperty({ required: false, description: 'Кол-во найденных объектов на странице, по умолчанию 10', example: '100' })
  @IsNotEmpty()
  @IsNumberString()
  limit: string;

}
