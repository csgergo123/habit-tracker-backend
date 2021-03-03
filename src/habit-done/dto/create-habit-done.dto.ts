import * as moment from 'moment';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateHabitDoneDto {
  @ApiPropertyOptional({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  @IsOptional()
  readonly date: Date | null;
}
