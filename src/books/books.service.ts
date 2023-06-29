import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Compositor } from 'src/compositors/entities/compositor.entity';
import { Arrangor } from 'src/arrangors/entities/arrangor.entity';
import { Style } from 'src/styles/entities/style.entity';
import { Library } from 'src/libraries/entities/library.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Compositor)
    private readonly compositorRepository: Repository<Compositor>,
    @InjectRepository(Arrangor)
    private readonly arrangorRepository: Repository<Arrangor>,
    @InjectRepository(Style)
    private readonly styleRepository: Repository<Style>,
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
  ) {}

  // Create new book
  async create(createBookDto: CreateBookDto, id: string) {
    const compositors = await Promise.all(
      createBookDto.compositors.map((name) =>
        this.preloadCompositorByName(name),
      ),
    );

    const arrangors = await Promise.all(
      createBookDto.arrangors.map((name) => this.preloadArrangorByName(name)),
    );

    const styles = await Promise.all(
      createBookDto.styles.map((name) => this.preloadStyleByName(name)),
    );

    const library = await this.libraryRepository.findOne({
      where: {
        id: +id,
      },
    });

    const book = this.bookRepository.create({
      ...createBookDto,
      compositors,
      arrangors,
      styles,
      library,
    });
    return this.bookRepository.save(book);
  }

  // Find all books
  findAll() {
    return this.bookRepository.find({
      relations: {
        compositors: true,
        arrangors: true,
        styles: true,
        library: true,
        parts: true,
      },
    });
  }

  // Find one book
  async findOne(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id: +id },
      relations: {
        compositors: true,
        arrangors: true,
        styles: true,
        library: true,
        parts: true,
      },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  //update one book
  async update(id: string, updateBookDto: UpdateBookDto) {
    const compositors =
      updateBookDto.compositors &&
      (await Promise.all(
        updateBookDto.compositors.map((name) =>
          this.preloadCompositorByName(name),
        ),
      ));
    const arrangors =
      updateBookDto.arrangors &&
      (await Promise.all(
        updateBookDto.arrangors.map((name) => 
        this.preloadArrangorByName(name)),
      ));
    const styles =
      updateBookDto.styles &&
      (await Promise.all(
        updateBookDto.styles.map((name) => 
        this.preloadStyleByName(name)),
      ));

    const book = await this.bookRepository.preload({
      id: +id,
      ...updateBookDto,
      compositors,
      arrangors,
      styles,
    });
    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }
    return this.bookRepository.save(book);
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    return this.bookRepository.remove(book);
  }

  // Preload compositors
  private async preloadCompositorByName(name: string): Promise<Compositor> {
    const existingCompositor = await this.compositorRepository.findOne({
      where: { name },
    });
    if (existingCompositor) {
      return existingCompositor;
    }
    return this.compositorRepository.create({ name });
  }

  // Preload arrangors
  private async preloadArrangorByName(name: string): Promise<Arrangor> {
    const existingArrangor = await this.arrangorRepository.findOne({
      where: { name },
    });
    if (existingArrangor) {
      return existingArrangor;
    }
    return this.arrangorRepository.create({ name });
  }

  // Preload arrangors
  private async preloadStyleByName(name: string): Promise<Style> {
    const existingStyle = await this.styleRepository.findOne({
      where: { name },
    });
    if (existingStyle) {
      return existingStyle;
    }
    return this.styleRepository.create({ name });
  }
}
