import { Test, TestingModule } from '@nestjs/testing';
import { OriginalsController } from './originals.controller';
import { OriginalsService } from './originals.service';

describe('OriginalsController', () => {
  let controller: OriginalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OriginalsController],
      providers: [OriginalsService],
    }).compile();

    controller = module.get<OriginalsController>(OriginalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
