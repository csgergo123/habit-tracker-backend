import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDoneDto } from './create-habit-done.dto';

export class UpdateHabitDoneDto extends PartialType(CreateHabitDoneDto) {}
