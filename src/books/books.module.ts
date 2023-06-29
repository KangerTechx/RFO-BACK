import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compositor } from 'src/compositors/entities/compositor.entity';
import { Arrangor } from 'src/arrangors/entities/arrangor.entity';
import { Style } from 'src/styles/entities/style.entity';
import { Library } from 'src/libraries/entities/library.entity';
import { Book } from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compositor, Arrangor, Style, Library, Book]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
