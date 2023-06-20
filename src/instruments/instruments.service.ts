import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instrument } from './entities/instrument.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectRepository(Instrument)
    private readonly instrumentRepository: Repository<Instrument>,
  ) {}

  // Ajouter un instrument
  create(createInstrumentDto: CreateInstrumentDto) {
    try {
      const instrument = this.instrumentRepository.create(createInstrumentDto);
      return this.instrumentRepository.save(instrument);
    } catch (e) {
      console.log(e);
    }
  }

  //Trouver tous les instruments
  findAll() {
    return this.instrumentRepository.find();
  }

  // Trouver un instrument
  async findOne(id: string) {
    const instrument = await this.instrumentRepository.findOne({
      where: { id: +id },
    });

    if (!instrument) {
      throw new NotFoundException('Instrument not found');
    }
    return instrument;
  }

  //Modifier un instrument
  async update(id: string, updateInstrumentDto: UpdateInstrumentDto) {
    const instrument = await this.instrumentRepository.preload({
      id: +id,
      ...updateInstrumentDto,
    });
    if (!instrument) {
      throw new NotFoundException(`Instrument ${id} not found`);
    }
    return this.instrumentRepository.save(instrument);
  }

  //Supprimer un instrument
  async remove(id: string) {
    const instrument = await this.findOne(id);
    return this.instrumentRepository.remove(instrument);
  }
}
