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
import { User } from '../../users/entities/User';

@Index('fk_Todo_User1_idx', ['userId'], {})
@Entity('todo', { schema: 'habit_tracker' })
export class Todo extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('int', { name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @ApiProperty()
  @Column('datetime', {
    name: 'date_added',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateAdded: Date;

  @ApiProperty()
  @Column('date', {
    name: 'issue_date',
  })
  issueDate: Date;

  @ApiProperty()
  @Column('tinyint', { name: 'done', default: () => 0 })
  done: number;

  @ApiProperty()
  @Column('varchar', { name: 'color', length: 45, default: 'lightblue' })
  color: string | null;

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
