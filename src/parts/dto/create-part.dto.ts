import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  readonly pdfName: string;

  @IsString({ each: true })
  readonly instruments: string[];
}
