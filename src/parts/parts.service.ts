import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { Book } from 'src/books/entities/book.entity';
import { Instrument } from 'src/instruments/entities/instrument.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Instrument)
    private readonly instrumentRepository: Repository<Instrument>,
  ) {}

  // Add a Parts
  async create(createPartDto: CreatePartDto, id: string) {
    const book = await this.bookRepository.findOne({
      where: {
        id: +id,
      },
    });
    const instruments = await Promise.all(
      createPartDto.instruments.map((name) =>
        this.preloadInstrumentByName(name),
      ),
    );

    const part = this.partRepository.create({
      ...createPartDto,
      book,
      instruments,
    });
    return this.partRepository.save(part);
  }

  async findAllBookParts(id: string) {
    const book = await this.bookRepository.findOne({
      where: {
        id: +id,
      },
      order: { id: 'ASC' },
    });

    return this.partRepository.find({
      relations: {
        book: true,
        instruments: true,
      },
      where: {
        book: book,
      },
    });
  }

  // Find All Parts
  findAll() {
    return this.partRepository.find({
      relations: {
        book: true,
        instruments: true,
      },
    });
  }

  // Find one part
  async findOne(id: string) {
    const part = await this.partRepository.findOne({
      where: { id: +id },
      relations: {
        book: true,
        instruments: true,
      },
    });

    if (!part) {
      throw new NotFoundException('Part not found');
    }
    return part;
  }

  // Update one part
  async update(id: string, updatePartDto: UpdatePartDto) {
    const instruments =
      updatePartDto.instruments &&
      (await Promise.all(
        updatePartDto.instruments.map((name) =>
          this.preloadInstrumentByName(name),
        ),
      ));
    const part = await this.partRepository.preload({
      id: +id,
      ...updatePartDto,
      instruments,
    });
    if (!part) {
      throw new NotFoundException(`Part ${id} not found`);
    }
    return this.partRepository.save(part);
  }

  // Remove one part
  async remove(id: string) {
    const part = await this.findOne(id);
    return this.partRepository.remove(part);
  }

  // Preload Instrument
  private async preloadInstrumentByName(name: string): Promise<Instrument> {
    const existingInstrument = await this.instrumentRepository.findOne({
      where: { name },
    });
    if (existingInstrument) {
      return existingInstrument;
    }
    return this.instrumentRepository.create({ name });
  }
}
