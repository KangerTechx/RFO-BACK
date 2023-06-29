import { IsString, MinLength } from 'class-validator';

export class CreateArrangorDto {
  @IsString()
  @MinLength(4)
  readonly name: string;
}
