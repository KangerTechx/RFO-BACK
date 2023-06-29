import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
  ) {}

  create(createRuleDto: CreateRuleDto) {
    const rule = this.ruleRepository.create(createRuleDto);
    return this.ruleRepository.save(rule);
  }

  findAll() {
    return this.ruleRepository.find();
  }

  async findOne(id: string) {
    const rule = await this.ruleRepository.findOne({
      where: { id: +id },
    });

    if (!rule) {
      throw new NotFoundException('Rule not found');
    }
    return rule;
  }

  async update(id: string, updateRuleDto: UpdateRuleDto) {
    const rule = await this.ruleRepository.preload({
      id: +id,
      ...updateRuleDto,
    });
    if (!rule) {
      throw new NotFoundException(`Rule ${id} not found`);
    }
    return this.ruleRepository.save(rule);
  }

  async remove(id: string) {
    const rule = await this.findOne(id);
    return this.ruleRepository.remove(rule);
  }
}
