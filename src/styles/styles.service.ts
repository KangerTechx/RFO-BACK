import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StylesService {
  constructor(
    @InjectRepository(Style)
    private readonly styleRepository: Repository<Style>,
  ) {}

  // Create Style
  create(createStyleDto: CreateStyleDto) {
    try {
      const style = this.styleRepository.create(createStyleDto);
      return this.styleRepository.save(style);
    } catch (e) {
      console.log(e);
    }
  }

  // Find all Styles
  findAll() {
    return this.styleRepository.find({
      relations: {
        books: true,
      },
    });
  }

  // Find one style
  async findOne(id: string) {
    const style = await this.styleRepository.findOne({
      where: { id: +id },
      relations: {
        books: true,
      },
    });

    if (!style) {
      throw new NotFoundException('Style not found');
    }
    return style;
  }

  // Update one style
  async update(id: string, updateStyleDto: UpdateStyleDto) {
    const style = await this.styleRepository.preload({
      id: +id,
      ...updateStyleDto,
    });
    if (!style) {
      throw new NotFoundException(`Style ${id} not found`);
    }
    return this.styleRepository.save(style);
  }

  // Remove style
  async remove(id: string) {
    const style = await this.findOne(id);
    return this.styleRepository.remove(style);
  }
}
