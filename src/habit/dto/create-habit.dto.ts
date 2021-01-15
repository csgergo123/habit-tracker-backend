import * as moment from 'moment';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Intensity } from './intensity.dto';
import { Regularity } from './regularity.dto';

export class CreateHabitDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ enum: Regularity, default: 'daily' })
  @IsNotEmpty()
  readonly regularity: Regularity;

  @ApiProperty({ enum: Intensity, default: 'normal' })
  @IsNotEmpty()
  readonly intensity: Intensity;

  @ApiProperty({ default: 'lightblue' })
  readonly color?: string;

  @ApiProperty({ default: moment().format('YYYY-MM-DD HH:mm:ss') })
  readonly dateAdded?: string;
}
