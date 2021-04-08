import { IsNotEmpty, IsString } from 'class-validator';

export class QueryValidateDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  sku: string;
}