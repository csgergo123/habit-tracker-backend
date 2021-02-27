import * as moment from 'moment';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Intensity } from '../entities/intensity.enum';
import { Regularity } from '../entities/regularity.enum';

export class CreateHabitDto {
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

  @ApiPropertyOptional({
    default: 'lightblue',
    description: 'The color of the habit in the frontend.',
  })
  @IsString()
  readonly color: string | null;

  @ApiPropertyOptional({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
    description: 'The datetime when the habit was created.',
  })
  @IsString()
  readonly dateAdded: Date | null;
}
