import * as moment from 'moment';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Intensity } from './intensity.dto';
import { Regularity } from './regularity.dto';

export class CreateHabitDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the user.',
  })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({
    example: 'Do the homework',
    description: 'The title of the habit.',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    enum: Regularity,
    default: 'daily',
    description:
      "The interval of the habit. Should be 'daily' or 'weekly' but the user can add his own.",
  })
  @IsNotEmpty()
  readonly regularity: string;

  @ApiProperty({
    default: 'normal',
    description: 'The difficulty of the habit.',
    enum: Intensity,
  })
  @IsNotEmpty()
  @IsEnum(Intensity)
  readonly intensity: Intensity;

  @ApiProperty({
    default: 'lightblue',
    description: 'The color of the habit in the frontend.',
  })
  readonly color: string | null;

  @ApiProperty({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
    description: 'The datetime when the habit was created.',
  })
  readonly dateAdded: Date | null;
}
