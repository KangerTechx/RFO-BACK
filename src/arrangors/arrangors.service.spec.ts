import { Test, TestingModule } from '@nestjs/testing';
import { ArrangorsService } from './arrangors.service';

describe('ArrangorsService', () => {
  let service: ArrangorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArrangorsService],
    }).compile();

    service = module.get<ArrangorsService>(ArrangorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
