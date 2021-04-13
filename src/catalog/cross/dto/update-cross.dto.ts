import { PartialType } from '@nestjs/mapped-types';
import { CreateCrossDto } from './create-cross.dto';

export class UpdateCrossDto extends PartialType(CreateCrossDto) {}
