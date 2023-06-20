import { IsString, MinLength } from 'class-validator';

export class CreateInstrumentDto {
  @IsString()
  @MinLength(6)
  readonly name: string;
}
