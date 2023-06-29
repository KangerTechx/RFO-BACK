import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Rule } from 'src/rules/entities/rule.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    @InjectRepository(Rule) private readonly ruleRepository: Repository<Rule>,
  ) {}

  // Ajouter un utilisateur
  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      user.firstName = signUpDto.firstName;
      user.lastName = signUpDto.lastName;
      user.adress = signUpDto.adress;
      user.phone = signUpDto.phone;
      user.avatar = signUpDto.avatar;
      user.isMember = signUpDto.isMember;
      user.isActive = signUpDto.isActive;
      user.startMusicDate = signUpDto.startMusicDate;
      return await this.usersRepository.save(user);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  //Modifier un utilisateur
  async update(id: string, updateUserDto: UpdateUserDto) {
    const rules =
      updateUserDto.rules &&
      (await Promise.all(
        updateUserDto.rules.map((name) => this.preloadRuleByName(name)),
      ));
    const user = await this.usersRepository.preload({
      id: +id,
      ...updateUserDto,
      rules,
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.usersRepository.save(user);
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
