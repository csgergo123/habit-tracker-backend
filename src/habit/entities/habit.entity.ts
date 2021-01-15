import * as moment from 'moment';

import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Intensity } from '../dto/intensity.dto';
import { Regularity } from '../dto/regularity.dto';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user.',
  })
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty({
    example: 'Do the homework',
    description: 'The title of the habit.',
  })
  @Column({ length: 255 })
  title: string;

  @ApiProperty({
    example: 'daily',
    description:
      "The interval of the habit. Should be 'daily' or 'weekly' but the user can add his own.",
  })
  @Column({ length: 50 })
  regularity: Regularity;

  @ApiProperty({
    example: 'normal',
    description: 'The difficulty of the habit.',
  })
  @Column({ length: 45 })
  intensity: Intensity;

  @ApiProperty({
    example: 'lightblue',
    description: 'The color of the habit in the frontend.',
  })
  @Column({ length: 45 })
  color: string;

  @ApiProperty({
    description: 'The datetime when the habit was created.',
  })
  @Column({
    name: 'date_added',
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  dateAdded: string;

  constructor(partial: Partial<Habit>) {
    Object.assign(this, partial);
  }
}
