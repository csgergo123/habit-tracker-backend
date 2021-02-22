import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/User';

@Index('fk_User_meta_User_idx', ['userId'], {})
@Entity('user_meta', { schema: 'habit_tracker' })
export class UserMeta extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'ip', nullable: true, length: 100 })
  ip: string | null;

  @Column('varchar', { name: 'country', nullable: true, length: 100 })
  country: string | null;

  @Column('varchar', { name: 'city', nullable: true, length: 100 })
  city: string | null;

  @Column('varchar', { name: 'time_zone', nullable: true, length: 100 })
  timeZone: string | null;

  @Column('varchar', { name: 'org', nullable: true, length: 100 })
  org: string | null;

  @Column('varchar', { name: 'asn', nullable: true, length: 255 })
  asn: string | null;

  @ManyToOne(() => User, (user) => user.userMetas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  constructor(init?: Partial<UserMeta>) {
    super();
    Object.assign(this, init);
  }
}
