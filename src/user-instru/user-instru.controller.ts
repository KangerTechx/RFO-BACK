import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserInstruService } from './user-instru.service';
import { CreateUserInstruDto } from './dto/create-user-instru.dto';
import { UpdateUserInstruDto } from './dto/update-user-instru.dto';

@Controller('user-instru')
export class UserInstruController {
  constructor(private readonly userInstruService: UserInstruService) {}

  @Post()
  create(@Body() createUserInstruDto: CreateUserInstruDto) {
    return this.userInstruService.create(createUserInstruDto);
  }

  @Get()
  findAll() {
    return this.userInstruService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userInstruService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserInstruDto: UpdateUserInstruDto,
  ) {
    return this.userInstruService.update(+id, updateUserInstruDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userInstruService.remove(+id);
  }
}
