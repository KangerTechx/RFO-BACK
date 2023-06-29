import { IsString, MinLength } from 'class-validator';

export class CreateCompositorDto {
  @IsString()
  @MinLength(4)
  readonly name: string;
}
