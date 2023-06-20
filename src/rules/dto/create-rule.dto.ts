import { IsString } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  readonly name: string;
}
