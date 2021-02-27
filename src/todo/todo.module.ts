import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/Todo';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
