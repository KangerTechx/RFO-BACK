import { IsString, MinLength } from 'class-validator';

export class CreateLibraryDto {
  @IsString()
  @MinLength(6)
  readonly name: string;
}
