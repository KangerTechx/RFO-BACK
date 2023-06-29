import { IsString, MinLength } from 'class-validator';

export class CreateStyleDto {
  @IsString()
  @MinLength(4)
  readonly name: string;
}
