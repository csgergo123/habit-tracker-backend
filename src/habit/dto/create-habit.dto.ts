import * as moment from 'moment';

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Intensity } from '../entities/intensity.enum';
import { Regularity } from '../entities/regularity.enum';

export class CreateHabitDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    enum: Regularity,
    default: 'daily',
    description:
      "The interval of the habit. Should be 'daily' or 'weekly' but the user can add his own.",
  })
  @IsNotEmpty()
  readonly regularity: Regularity;

  @ApiProperty({
    default: 'normal',
    enum: Intensity,
  })
  @IsNotEmpty()
  @IsEnum(Intensity, {
    message: "Intensity can be 'easy', 'normal' or 'hard'.",
  })
  readonly intensity: Intensity;

  @ApiProperty({
    default: 'lightblue',
    description: 'The color of the habit in the frontend.',
  })
  readonly color: string;

  @ApiProperty({
    default: moment().format('YYYY-MM-DD'),
  })
  readonly startDate: Date;
}
