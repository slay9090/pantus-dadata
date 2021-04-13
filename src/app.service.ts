import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'DADATA service, API doc: https://github.com/pantusru/handbook-aoc';
  }
}
