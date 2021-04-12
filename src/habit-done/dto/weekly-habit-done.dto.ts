import { ApiProperty } from '@nestjs/swagger';

export class WeeklyHabitDoneDto {
  @ApiProperty()
  readonly week: string;

  @ApiProperty()
  readonly dones: number;
}
