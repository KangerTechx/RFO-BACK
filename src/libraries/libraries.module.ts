import { Module } from '@nestjs/common';
import { LibrariesService } from './libraries.service';
import { LibrariesController } from './libraries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './entities/library.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Library])],
  controllers: [LibrariesController],
  providers: [LibrariesService],
})
export class LibrariesModule {}
