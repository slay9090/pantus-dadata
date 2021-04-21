import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QueryValidateDto {

  @IsNotEmpty()
  @IsString()
  type: string;

  brand: string;


  sku: string;

  text: string;

  page: string;


  limit: string;
}