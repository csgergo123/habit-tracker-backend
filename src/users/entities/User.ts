import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';

import { Habit } from '../../habit/entities/Habit';
import { HabitDone } from '../../habit-done/entities/HabitDone';
import { Todo } from '../../todo/entities/Todo';
import { UserMeta } from '../../user-meta/entities/UserMeta';

@Entity('user', { schema: 'habit_tracker' })
@Unique(['email'])
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @IsEmail()
  @Column('varchar', { name: 'email', length: 100 })
  email: string;

  @ApiProperty()
  @Exclude()
  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @ApiProperty()
  @Column('varchar', { name: 'first_name', length: 100 })
  firstName: string;

  @ApiProperty()
  @Column('varchar', { name: 'last_name', nullable: true, length: 100 })
  lastName: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'phone', nullable: true, length: 45 })
  phone: string | null;

  @ApiProperty({
    example: 'email',
    description: "It can be 'email', 'google' or 'facebook'",
  })
  @Column('varchar', { name: 'register_with', length: 45 })
  registerWith: string;

  @ApiProperty()
  @Column('datetime', { name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @ApiProperty()
  @Column({ length: 100 })
  salt: string;

  @OneToMany(() => Habit, (habit) => habit.user, { eager: true })
  habits: Habit[];

  @OneToMany(() => HabitDone, (habitDone) => habitDone.user)
  habitDones: HabitDone[];

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => UserMeta, (userMeta) => userMeta.user)
  userMetas: UserMeta[];

  constructor(init?: Partial<User>) {
    super();
    Object.assign(this, init);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
