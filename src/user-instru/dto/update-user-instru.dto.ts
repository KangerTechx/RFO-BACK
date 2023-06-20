import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInstruDto } from './create-user-instru.dto';

export class UpdateUserInstruDto extends PartialType(CreateUserInstruDto) {}
