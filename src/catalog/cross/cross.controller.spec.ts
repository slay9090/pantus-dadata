import { Test, TestingModule } from '@nestjs/testing';
import { CrossController } from './cross.controller';
import { CrossService } from './cross.service';

describe('CrossController', () => {
  let controller: CrossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrossController],
      providers: [CrossService],
    }).compile();

    controller = module.get<CrossController>(CrossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
