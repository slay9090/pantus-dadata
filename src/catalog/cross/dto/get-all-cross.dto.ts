import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetAllCrossDto {
  @IsNotEmpty()
  page: string;

  @IsNotEmpty()
  limit: string;


}