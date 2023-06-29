import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from '../decorators/auth.decorators';
import { AuthType } from '../enums/auth-type.enum';
import { Response } from 'express';

@Auth(AuthType.None)
@Controller('login')
export class LoginController {
  constructor(private readonly authService: LoginService) {}

  @HttpCode(HttpStatus.OK) // by default @Post does 201, we wanted 200 - hence using @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const accessToken = await this.authService.signIn(signInDto);
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }
}
