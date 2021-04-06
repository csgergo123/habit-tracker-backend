import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMetaDto } from './create-user-meta.dto';

export class UpdateUserMetaDto extends PartialType(CreateUserMetaDto) {}
