import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  [x: string]: any;
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

  @IsString({ each: true })
  readonly compositors: string[];

  @IsString({ each: true })
  readonly arrangors: string[];

  @IsString({ each: true })
  readonly styles: string[];
}
