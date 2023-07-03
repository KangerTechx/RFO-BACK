import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArrangorDto } from './dto/create-arrangor.dto';
import { UpdateArrangorDto } from './dto/update-arrangor.dto';
import { Arrangor } from './entities/arrangor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArrangorsService {
  constructor(
    @InjectRepository(Arrangor)
    private readonly arrangorRepository: Repository<Arrangor>,
  ) {}

  // Add Arrangor
  create(createArrangorDto: CreateArrangorDto) {
    try {
      const arrangor = this.arrangorRepository.create(createArrangorDto);
      return this.arrangorRepository.save(arrangor);
    } catch (e) {
      console.log(e);
    }
  }

  // Find all arrangors
  findAll() {
    return this.arrangorRepository.find({
      order: { name: 'ASC' },
    });
  }

  // Find an arrangor
  async findOne(id: string) {
    const arrangor = await this.arrangorRepository.findOne({
      where: { id: +id },
    });

    if (!arrangor) {
      throw new NotFoundException('Arrangor not found');
    }
    return arrangor;
  }

  // Update arrangor
  async update(id: string, updateArrangorDto: UpdateArrangorDto) {
    const arrangor = await this.arrangorRepository.preload({
      id: +id,
      ...updateArrangorDto,
    });
    if (!arrangor) {
      throw new NotFoundException(`Arrangor ${id} not found`);
    }
    return this.arrangorRepository.save(arrangor);
  }

  // Remove an arrangor
  async remove(id: string) {
    const arrangor = await this.findOne(id);
    return this.arrangorRepository.remove(arrangor);
  }
}
