import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { LoginController } from './login/login.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { LoginService } from './login/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './authentication/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { Rule } from 'src/rules/entities/rule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Rule]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    /*{
      provide: APP_GUARD, // Ici
      useClass: AuthenticationGuard,
    },*/
    AccessTokenGuard,
    AuthenticationService,
    LoginService,
  ],
  controllers: [AuthenticationController, LoginController],
})
export class AuthModule {}
