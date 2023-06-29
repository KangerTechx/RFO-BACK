import { Test, TestingModule } from '@nestjs/testing';
import { CompositorsService } from './compositors.service';

describe('CompositorsService', () => {
  let service: CompositorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompositorsService],
    }).compile();

    service = module.get<CompositorsService>(CompositorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
