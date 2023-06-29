import { Injectable } from '@nestjs/common';
import { CreateUserInstruDto } from './dto/create-user-instru.dto';
import { UpdateUserInstruDto } from './dto/update-user-instru.dto';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserInstru } from './entities/user-instru.entity';

@Injectable()
export class UserInstruService {
  constructor(
    @InjectRepository(UserInstru)
    private readonly userInstruRepository: Repository<UserInstru>,
    @InjectRepository(Instrument)
    private readonly instrumentRepository: Repository<Instrument>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Add a new user instrument
  async create(createUserInstruDto: CreateUserInstruDto, id) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });
    const instrument = await Promise.apply(
      createUserInstruDto.instrument.map((name) => {
        this.preloadInstrumentByName(name);
      }),
    );
    const userInstru = this.userInstruRepository.create({
      ...createUserInstruDto,
      user,
      instrument,
    });
    return this.userInstruRepository.save(userInstru);
  }

  // find All Instrument for a User
  async findAll(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });
    return this.userInstruRepository.find({
      where: {
        user: user,
      },
      relations: {
        user: true,
        instrument: true,
      },
    });
  }

  update(id: number, updateUserInstruDto: UpdateUserInstruDto) {
    return `This action updates a #${id} userInstru`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInstru`;
  }

  // Preload arrangors
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
