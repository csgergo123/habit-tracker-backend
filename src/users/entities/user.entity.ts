import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastname: string;

  @Column({ length: 45 })
  phone: string;

  @Column({ name: 'register_with', length: 45 })
  registerWith: string;

  @Column({ name: 'email_verified_at' })
  emailVerifiedAt: Timestamp;

  @Column({ name: 'updated_at' })
  updatedAt: Timestamp;
}
