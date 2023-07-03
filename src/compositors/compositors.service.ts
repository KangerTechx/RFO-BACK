import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompositorDto } from './dto/create-compositor.dto';
import { UpdateCompositorDto } from './dto/update-compositor.dto';
import { Compositor } from './entities/compositor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompositorsService {
  constructor(
    @InjectRepository(Compositor)
    private readonly compositorRepository: Repository<Compositor>,
  ) {}
  create(createCompositorDto: CreateCompositorDto) {
    try {
      const compositor = this.compositorRepository.create(createCompositorDto);
      return this.compositorRepository.save(compositor);
    } catch (e) {
      console.log(e);
    }
  }

  // Find All compositors
  findAll() {
    return this.compositorRepository.find({
      relations: {
        books: true,
      },
      order: { name: 'ASC' },
    });
  }

  //find one compositor
  async findOne(id: string) {
    const compositor = await this.compositorRepository.findOne({
      where: { id: +id },
      relations: {
        books: true,
      },
    });

    if (!compositor) {
      throw new NotFoundException('Compositor not found');
    }
    return compositor;
  }

  // Update compositor
  async update(id: string, updateCompositorDto: UpdateCompositorDto) {
    const compositor = await this.compositorRepository.preload({
      id: +id,
      ...updateCompositorDto,
    });
    if (!compositor) {
      throw new NotFoundException(`Compositor ${id} not found`);
    }
    return this.compositorRepository.save(compositor);
  }

  // Remove a compositor
  async remove(id: string) {
    const compositor = await this.findOne(id);
    return this.compositorRepository.remove(compositor);
  }
}
