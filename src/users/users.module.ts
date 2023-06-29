import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Rule } from 'src/rules/entities/rule.entity';
import { BcryptService } from 'src/auth/hashing/bcrypt.service';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rule])],
  controllers: [UsersController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    UsersService,
  ],
})
export class UsersModule {}
