import { Injectable } from '@nestjs/common';
import { CreateUserInstruDto } from './dto/create-user-instru.dto';
import { UpdateUserInstruDto } from './dto/update-user-instru.dto';

@Injectable()
export class UserInstruService {
  create(createUserInstruDto: CreateUserInstruDto) {
    return 'This action adds a new userInstru';
  }

  findAll() {
    return `This action returns all userInstru`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInstru`;
  }

  update(id: number, updateUserInstruDto: UpdateUserInstruDto) {
    return `This action updates a #${id} userInstru`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInstru`;
  }
}
