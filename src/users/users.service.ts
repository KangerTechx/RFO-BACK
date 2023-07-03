import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Rule } from 'src/rules/entities/rule.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    @InjectRepository(Rule) private readonly ruleRepository: Repository<Rule>,
  ) {}

  // Add new user
  async create(createUserDto: CreateUserDto) {
    const rules = await Promise.all(
      createUserDto.rules.map((name) => this.preloadRuleByName(name)),
    );
    const user = this.userRepository.create({
      ...createUserDto,
      password: await this.hashingService.hash(createUserDto.password),
      rules,
    });
    return this.userRepository.save(user);
  }

  // Find All users
  findAll() {
    return this.userRepository.find({
      relations: {
        rules: true,
        userInstru: true,
      },
      order: { lastName: 'ASC' },
    });
  }

  // find one User
  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: +id },
      relations: {
        rules: true,
        userInstru: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Update one user
  async update(id: string, updateUserDto: UpdateUserDto) {
    const rules =
      updateUserDto.rules &&
      (await Promise.all(
        updateUserDto.rules.map((name) => this.preloadRuleByName(name)),
      ));
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
      rules,
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.userRepository.save(user);
  }

  // Remove one user
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // Preload rules
  private async preloadRuleByName(name: string): Promise<Rule> {
    const existingRule = await this.ruleRepository.findOne({
      where: { name },
    });
    if (existingRule) {
      return existingRule;
    }
    return this.ruleRepository.create({ name });
  }
}
