import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Habit } from '../../habit/entities/Habit';
import { User } from '../../users/entities/User';

@Index('fk_User_has_Habit_Habit1_idx', ['habitId'], {})
@Index('fk_User_has_Habit_User1_idx', ['userId'], {})
@Entity('habit_done', { schema: 'habit_tracker' })
export class HabitDone extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('int', { name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column('int', { name: 'habit_id' })
  habitId: number;

  @ApiProperty()
  @Column('datetime', { name: 'date' })
  date: Date;

  @ManyToOne(() => Habit, (habit) => habit.habitDones, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'habit_id', referencedColumnName: 'id' }])
  habit: Habit;

  @ManyToOne(() => User, (user) => user.habitDones, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  constructor(init?: Partial<HabitDone>) {
    super();
    Object.assign(this, init);
  }
}
