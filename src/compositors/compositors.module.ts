import { Module } from '@nestjs/common';
import { CompositorsService } from './compositors.service';
import { CompositorsController } from './compositors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compositor } from './entities/compositor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compositor])],
  controllers: [CompositorsController],
  providers: [CompositorsService],
})
export class CompositorsModule {}
