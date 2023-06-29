import { PartialType } from '@nestjs/mapped-types';
import { CreateCompositorDto } from './create-compositor.dto';

export class UpdateCompositorDto extends PartialType(CreateCompositorDto) {}
