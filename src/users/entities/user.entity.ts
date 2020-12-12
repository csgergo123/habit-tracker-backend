import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import * as moment from 'moment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsEmail()
  email: string;

  @Exclude()
  @Column({ length: 255 })
  password: string;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ length: 45 })
  phone: string;

  @Column({ name: 'register_with', length: 45 })
  registerWith: string;

  @Column({ name: 'email_verified_at' })
  emailVerifiedAt: string;

  @Column({
    name: 'updated_at',
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  updatedAt: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
