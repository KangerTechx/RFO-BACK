import { IsEnum, IsString } from 'class-validator';

enum CatInstru {
  ORCHESTRE = 'Orchestre',
  SORTIE = 'Sortie',
  TOUS = 'Les deux',
}

export class CreateUserInstruDto {
  @IsString()
  readonly instrument: string[];

  @IsEnum(CatInstru)
  readonly category: CatInstru;
}
