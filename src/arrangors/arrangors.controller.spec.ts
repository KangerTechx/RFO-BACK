import { Test, TestingModule } from '@nestjs/testing';
import { ArrangorsController } from './arrangors.controller';
import { ArrangorsService } from './arrangors.service';

describe('ArrangorsController', () => {
  let controller: ArrangorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArrangorsController],
      providers: [ArrangorsService],
    }).compile();

    controller = module.get<ArrangorsController>(ArrangorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
