import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Rule } from 'src/rules/entities/rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rule])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
