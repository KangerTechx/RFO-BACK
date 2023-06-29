import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Library } from './entities/library.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
  ) {}

  // ADD A Library
  create(createLibraryDto: CreateLibraryDto) {
    const library = this.libraryRepository.create(createLibraryDto);
    return this.libraryRepository.save(library);
  }

  // Find all libraries
  findAll() {
    return this.libraryRepository.find({
      relations: {
        books: true,
      },
    });
  }

  // Find one library
  async findOne(id: string) {
    const library = await this.libraryRepository.findOne({
      where: { id: +id },
    });

    if (!library) {
      throw new NotFoundException('Library not found');
    }
    return library;
  }

  // Update a library
  async update(id: string, updateLibraryDto: UpdateLibraryDto) {
    const library = await this.libraryRepository.preload({
      id: +id,
      ...updateLibraryDto,
    });
    if (!library) {
      throw new NotFoundException(`Library ${id} not found`);
    }
    return this.libraryRepository.save(library);
  }

  // Remove a library
  async remove(id: string) {
    const library = await this.findOne(id);
    return this.libraryRepository.remove(library);
  }
}
