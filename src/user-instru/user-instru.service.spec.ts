import { Test, TestingModule } from '@nestjs/testing';
import { UserInstruService } from './user-instru.service';

describe('UserInstruService', () => {
  let service: UserInstruService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInstruService],
    }).compile();

    service = module.get<UserInstruService>(UserInstruService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
