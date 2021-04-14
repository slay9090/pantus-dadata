import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SearchCrossDto {
  @IsNotEmpty()
  @IsString()
  originalbrand: string;

  @IsNotEmpty()
  @IsString()
  originalsku: string;



  page: string;


  limit: string;
}