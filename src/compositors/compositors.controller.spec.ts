import { Test, TestingModule } from '@nestjs/testing';
import { CompositorsController } from './compositors.controller';
import { CompositorsService } from './compositors.service';

describe('CompositorsController', () => {
  let controller: CompositorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompositorsController],
      providers: [CompositorsService],
    }).compile();

    controller = module.get<CompositorsController>(CompositorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
