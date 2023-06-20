import { Module } from '@nestjs/common';
import { UserInstruService } from './user-instru.service';
import { UserInstruController } from './user-instru.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInstru } from './entities/user-instru.entity';
import { User } from 'src/users/entities/user.entity';
import { Instrument } from 'src/instruments/entities/instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInstru, User, Instrument])],
  controllers: [UserInstruController],
  providers: [UserInstruService],
})
export class UserInstruModule {}
