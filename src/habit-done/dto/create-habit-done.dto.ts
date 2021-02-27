import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateHabitDoneDto {
  @ApiPropertyOptional({
    description: 'The datetime when the habit was created.',
  })
  @IsOptional()
  readonly date: Date | null;
}
