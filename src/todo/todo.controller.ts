import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/User';
import { GetUser } from 'src/users/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Todo')
@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @GetUser() user: User) {
    return this.todoService.create(createTodoDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.todoService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string, @GetUser() user: User) {
    return this.todoService.findOne(user, +id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user: User,
  ) {
    return this.todoService.update(user, updateTodoDto, +id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string, @GetUser() user: User) {
    return this.todoService.remove(user, +id);
  }
}
