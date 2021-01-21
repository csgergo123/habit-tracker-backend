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

@Index('fk_Todo_User1_idx', ['userId'], {})
@Entity('todo', { schema: 'habit_tracker' })
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('datetime', {
    name: 'date_added',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateAdded: Date;

  @Column('tinyint', { name: 'done' })
  done: number;

  @Column('varchar', { name: 'color', length: 45 })
  color: string;

  @ManyToOne(() => User, (user) => user.todos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  constructor(init?: Partial<Todo>) {
    super();
    Object.assign(this, init);
  }
}
