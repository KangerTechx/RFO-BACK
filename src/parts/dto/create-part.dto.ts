import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  readonly pdfName: string;

  @IsString()
  readonly ref: string;

  @IsString({ each: true })
  readonly instruments: string[];
}
