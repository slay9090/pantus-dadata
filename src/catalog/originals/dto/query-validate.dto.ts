import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QueryValidateDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  sku: string;



  page: string;


  limit: string;
}