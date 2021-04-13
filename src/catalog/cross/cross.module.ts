import { Module } from '@nestjs/common';
import { CrossService } from './cross.service';
import { CrossController } from './cross.controller';

@Module({
  controllers: [CrossController],
  providers: [CrossService]
})
export class CrossModule {}
