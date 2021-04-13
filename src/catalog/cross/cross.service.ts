import { Injectable } from '@nestjs/common';
import { CreateCrossDto } from './dto/create-cross.dto';
import { UpdateCrossDto } from './dto/update-cross.dto';

@Injectable()
export class CrossService {
  create(createCrossDto: CreateCrossDto) {
    return 'This action adds a new cross';
  }

  findAll() {
    return `This action returns all cross`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cross`;
  }

  update(id: number, updateCrossDto: UpdateCrossDto) {
    return `This action updates a #${id} cross`;
  }

  remove(id: number) {
    return `This action removes a #${id} cross`;
  }
}
