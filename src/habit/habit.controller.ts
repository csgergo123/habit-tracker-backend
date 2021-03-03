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
import { HabitService } from './habit.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/entities/User';
import { CreateHabitDoneDto } from 'src/habit-done/dto/create-habit-done.dto';
import { HabitDoneService } from 'src/habit-done/habit-done.service';

@ApiBearerAuth()
@ApiTags('Habits')
@Controller('habits')
@UseGuards(AuthGuard())
export class HabitController {
  constructor(
    private readonly habitService: HabitService,
    private readonly habitDoneService: HabitDoneService,
  ) {}

  @Post()
  create(@Body() createHabitDto: CreateHabitDto, @GetUser() user: User) {
    return this.habitService.create(createHabitDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.habitService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string, @GetUser() user: User) {
    return this.habitService.findOne(user, +id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateHabitDto: UpdateHabitDto,
    @GetUser() user: User,
  ) {
    return this.habitService.update(user, updateHabitDto, +id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string, @GetUser() user: User) {
    return this.habitService.remove(user, +id);
  }

  @Post(':id/done')
  habitDone(
    @Param('id', ParseIntPipe) id: string,
    @Body() createHabitDoneDto: CreateHabitDoneDto,
    @GetUser() user: User,
  ) {
    return this.habitDoneService.makeDone(user, createHabitDoneDto, +id);
  }
}
