import { Module } from '@nestjs/common';
import { ArrangorsService } from './arrangors.service';
import { ArrangorsController } from './arrangors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arrangor } from './entities/arrangor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Arrangor])],
  controllers: [ArrangorsController],
  providers: [ArrangorsService],
})
export class ArrangorsModule {}
