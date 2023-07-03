import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController, bookPartsController } from './parts.controller';
import { Part } from './entities/part.entity';
import { Book } from 'src/books/entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from 'src/instruments/entities/instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, Book, Instrument])],
  controllers: [PartsController, bookPartsController],
  providers: [PartsService],
})
export class PartsModule {}
