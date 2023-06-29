import { PartialType } from '@nestjs/mapped-types';
import { CreateArrangorDto } from './create-arrangor.dto';

export class UpdateArrangorDto extends PartialType(CreateArrangorDto) {}
