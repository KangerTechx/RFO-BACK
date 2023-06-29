import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly lastName: string;

  @IsOptional()
  @IsString()
  readonly adress: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly avatar: string;

  @IsBoolean()
  readonly isMember: boolean;

  @IsBoolean()
  readonly isActive: boolean;

  @IsOptional()
  readonly startMusicDate: Date;

  @IsString({ each: true })
  readonly rules: string[];
}
