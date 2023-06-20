import { Test, TestingModule } from '@nestjs/testing';
import { UserInstruController } from './user-instru.controller';
import { UserInstruService } from './user-instru.service';

describe('UserInstruController', () => {
  let controller: UserInstruController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInstruController],
      providers: [UserInstruService],
    }).compile();

    controller = module.get<UserInstruController>(UserInstruController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
