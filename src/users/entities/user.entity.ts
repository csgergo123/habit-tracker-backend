import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterWith } from './register-with.enum';
import { Habit } from 'src/habit/entities/Habit';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test@test.com', description: 'The email address' })
  @Column({ length: 100 })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Asd123', description: 'Cleartext password' })
  @Exclude()
  @Column({ length: 255 })
  password: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @ApiProperty({
    example: '+361251215',
    description: 'The phone number of the user',
  })
  @Column({ length: 45 })
  phone: string;

  @ApiProperty({
    example: 'email',
    description: "It can be 'email', 'google' or 'facebook'",
  })
  @Column({ name: 'register_with', length: 45 })
  registerWith: RegisterWith;

  @ApiProperty({
    description: 'The datetime when the user verified the registration',
  })
  @Column({ name: 'email_verified_at' })
  emailVerifiedAt: string;

  @Column({
    name: 'updated_at',
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  updatedAt: string;

  @OneToMany(() => Habit, (habit) => habit.user)
  habits: Habit[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
