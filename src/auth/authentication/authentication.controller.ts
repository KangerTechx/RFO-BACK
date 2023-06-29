import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Patch('update-user/:id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.authService.update(id, updateUserDto);
  }
}
