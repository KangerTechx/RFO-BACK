import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  readonly slug: string;

  @IsPositive()
  readonly number: number;

  @IsString()
  @IsOptional()
  readonly mp3: string;

  @IsOptional()
  @IsBoolean()
  isSelected: boolean;
}
