import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 100 })
  @Column('first_name')
  firstName: string;

  @Column({ length: 100 })
  @Column('last_name')
  lastname: string;

  @Column({ length: 45 })
  phone: string;

  @Column({ length: 45 })
  @Column('register_with')
  registerWith: string;

  @Column('email_verified_at')
  emailVerifiedAt: Timestamp;

  @Column('updated_at')
  updatedAt: Timestamp;
}
