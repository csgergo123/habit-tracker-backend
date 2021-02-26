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
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';

import { Habit } from '../../habit/entities/Habit';
import { HabitDone } from '../../habit-done/entities/HabitDone';
import { Todo } from '../../todo/entities/Todo';
import { UserMeta } from '../../user-meta/entities/UserMeta';

@Entity('user', { schema: 'habit_tracker' })
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({ example: 'test@test.com', description: 'The email address' })
  @IsEmail()
  @Column('varchar', { name: 'email', length: 100 })
  email: string;

  @ApiProperty({ example: 'Asd123', description: 'Cleartext password' })
  @Exclude()
  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @Column('varchar', { name: 'first_name', length: 100 })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @Column('varchar', { name: 'last_name', nullable: true, length: 100 })
  lastName: string | null;

  @ApiProperty({
    example: '+361251215',
    description: 'The phone number of the user',
  })
  @Column('varchar', { name: 'phone', nullable: true, length: 45 })
  phone: string | null;

  @ApiProperty({
    example: 'email',
    description: "It can be 'email', 'google' or 'facebook'",
  })
  @Column('varchar', { name: 'register_with', length: 45 })
  registerWith: string;

  @ApiProperty({
    description: 'The datetime when the user verified the registration',
  })
  @Column('datetime', { name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @ApiProperty({
    description: 'The salt for the password.',
  })
  @Column({ length: 100 })
  salt: string;

  @OneToMany(() => Habit, (habit) => habit.user)
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
