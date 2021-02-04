import * as moment from 'moment';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Intensity } from './intensity.enum';
import { Regularity } from './regularity.enum';
import { User } from 'src/users/entities/User';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user.',
  })
  @ManyToOne(() => User, (user) => user.habits)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
    enum: Regularity,
  })
  @Column({ length: 50, default: 'lightblue' })
  regularity: Regularity;

  @ApiProperty({
    example: 'normal',
    description: 'The difficulty of the habit.',
    enum: Intensity,
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
