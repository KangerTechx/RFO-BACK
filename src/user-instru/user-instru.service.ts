import { Injectable } from '@nestjs/common';
import { CreateUserInstruDto } from './dto/create-user-instru.dto';
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
  async create(createUserInstruDto: CreateUserInstruDto, userId, instruId) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const instrument = await this.instrumentRepository.findOne({
      where: {
        id: instruId,
      },
    });

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

  async remove(id: string) {
    const userInstru = await this.userInstruRepository.findOne({
      where: {
        id: +id,
      },
    });
    return this.userInstruRepository.remove(userInstru);
  }
}
