import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/User';
import { HabitDone } from '../../habit-done/entities/HabitDone';
import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import { Intensity } from '../dto/intensity.dto';

@Index('fk_Habit_User1_idx', ['userId'], {})
@Entity('habit', { schema: 'habit_tracker' })
export class Habit extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user.',
  })
  @Column('int', { name: 'user_id' })
  userId: number;

  @ApiProperty({
    example: 'Do the homework',
    description: 'The title of the habit.',
  })
  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('datetime', {
    name: 'date_added',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateAdded: Date;

  @ApiProperty({
    example: 'daily',
    description:
      "The interval of the habit. Should be 'daily' or 'weekly' but the user can add his own.",
  })
  @Column('varchar', { name: 'regularity', length: 50 })
  regularity: string;

  @ApiProperty({
    example: 'normal',
    description: 'The difficulty of the habit.',
    enum: Intensity,
  })
  @Column('enum', { name: 'intensity', enum: Intensity })
  intensity: 'weak' | 'normal' | 'strong';

  @ApiProperty({
    example: 'lightblue',
    description: 'The color of the habit in the frontend.',
  })
  @Column('varchar', { name: 'color', length: 45, default: 'lightblue' })
  color: string | null;

  @ManyToOne(() => User, (user) => user.habits, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => HabitDone, (habitDone) => habitDone.habit)
  habitDones: HabitDone[];

  constructor(init?: Partial<Habit>) {
    super();
    Object.assign(this, init);
  }
}
