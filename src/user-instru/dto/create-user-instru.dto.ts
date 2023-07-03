import { IsEnum } from 'class-validator';

enum CatInstru {
  ORCHESTRE = 'Orchestre',
  SORTIE = 'Sortie',
  TOUS = 'Les deux',
}

export class CreateUserInstruDto {
  @IsEnum(CatInstru)
  readonly category: CatInstru;
}
