import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User';
import { LessThanOrEqual, Repository } from 'typeorm';
import * as moment from 'moment';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/Todo';

@Injectable()
export class TodoService {
  private logger = new Logger('TodoService');

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, user: User) {
    const todo = new Todo({ ...createTodoDto, user });
    console.log('todo', todo);

    try {
      const savedTodo = await this.todoRepository.save(todo);
      // Remove the user object from response
      delete savedTodo.user;
      return savedTodo;
    } catch (error) {
      this.logger.error(
        `Error during save todo to the database. Todo: ${JSON.stringify(todo)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  findAll(user: User): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user } });
  }

  async findOne(user: User, id: number): Promise<Todo> {
    const found = await this.todoRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async findUndones(user: User): Promise<Todo[]> {
    const todos = await this.todoRepository.find({
      where: { user, done: 0, issueDate: LessThanOrEqual(moment().format()) },
    });
    if (!todos) {
      throw new NotFoundException();
    }
    return todos;
  }

  async update(user: User, updateTodoDto: UpdateTodoDto, id: number) {
    const result = await this.todoRepository.update(
      { id, user },
      { ...updateTodoDto },
    );
    this.logger.debug(`Update #${id} habit.`, JSON.stringify(result));
    if (result.affected === 0) {
      throw new NotFoundException(`Todo #${id} not found.`);
    }
  }

  async remove(user: User, id: number): Promise<void> {
    const result = await this.todoRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Todo #${id} not found.`);
    }
  }
}
