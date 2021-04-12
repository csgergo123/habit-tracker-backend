import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/User';
import { HabitDone } from '../../habit-done/entities/HabitDone';
import { Intensity } from './intensity.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Regularity } from './regularity.enum';

@Entity('habit', { schema: 'habit_tracker' })
export class Habit extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('int', { name: 'user_id' })
  userId: number;

  @ApiProperty({
    example: 'Do the homework',
    description: 'The title of the habit.',
  })
  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @ApiProperty({
    example: 'lightblue',
    description: 'The color of the habit in the frontend.',
  })
  @Column('varchar', { name: 'color', length: 45 })
  color: string;

  @ApiProperty({
    example: 'normal',
    description: 'The difficulty of the habit.',
    enum: Intensity,
  })
  @Column('varchar', { name: 'intensity', length: 45 })
  intensity: Intensity;

  @ApiProperty({
    example: 'daily',
    description:
      "The interval of the habit. Should be 'daily' or 'weekly' but the user can add his own.",
    enum: Regularity,
  })
  @Column('varchar', { name: 'regularity', length: 50 })
  regularity: Regularity;

  @ApiPropertyOptional()
  @Column({
    type: 'timestamp',
    name: 'date_added',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateAdded: Date;

  @ApiProperty()
  @Column({
    type: 'date',
    name: 'start_date',
  })
  startDate: Date;

  @ManyToOne(() => User, (user) => user.habits, {
    eager: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => HabitDone, (habitDone) => habitDone.habit, { eager: false })
  habitDones: HabitDone[];

  constructor(init?: Partial<Habit>) {
    super();
    Object.assign(this, init);
  }
}
