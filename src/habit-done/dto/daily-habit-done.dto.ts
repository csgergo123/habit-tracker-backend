import { ApiProperty } from '@nestjs/swagger';

export class DailyHabitDoneDto {
  @ApiProperty()
  readonly day: string;

  @ApiProperty()
  readonly dones: number;
}
