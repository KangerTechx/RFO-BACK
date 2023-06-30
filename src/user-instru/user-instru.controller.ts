import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserInstruService } from './user-instru.service';
import { CreateUserInstruDto } from './dto/create-user-instru.dto';

@Controller('user-instru')
export class UserInstruController {
  constructor(private readonly userInstruService: UserInstruService) {}

  @Post()
  create(
    @Body() createUserInstruDto: CreateUserInstruDto,
    @Query() addUserInstru,
  ) {
    const { userId, instruId } = addUserInstru;
    return this.userInstruService.create(createUserInstruDto, userId, instruId);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.userInstruService.findAll(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userInstruService.remove(id);
  }
}
