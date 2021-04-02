import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

import { Habit } from './entities/Habit';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { User } from 'src/users/entities/User';

@Injectable()
export class HabitService {
  private logger = new Logger('HabitService');

  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
  ) {}

  async create(createHabitDto: CreateHabitDto, user: User) {
    const habit = new Habit({ ...createHabitDto, user });
    console.log('habit', habit);

    try {
      const savedHabit = await this.habitRepository.save(habit);
      // Remove the user object from response
      delete savedHabit.user;
      return savedHabit;
    } catch (error) {
      this.logger.error(
        `Error during save habit to the database. Habit: ${JSON.stringify(
          habit,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async findAll(user: User): Promise<Habit[]> {
    return this.habitRepository.find({ where: { user } });
  }

  async findOne(user: User, id: number): Promise<Habit> {
    const habits = await this.habitRepository.findOne({ where: { id, user } });
    if (!habits) {
      throw new NotFoundException();
    }
    return habits;
  }

  async findToBeDone(user: User): Promise<Habit[]> {
    let habitsToDone: Habit[] = [];
    const habits = await this.habitRepository.find({ where: { user } });
    if (!habits) {
      throw new NotFoundException();
    }
    habits.forEach((habit) => {
      // If daily regularity then there is no done for today
      if (habit.regularity == 'daily') {
        let isDone = false;
        habit.habitDones.forEach((done) => {
          if (moment().isSame(done.date, 'day')) {
            isDone = true;
          }
        });
        if (!isDone) {
          habitsToDone.push(habit);
        }
      }

      // If weekly regularity then there is no done for this week
      if (habit.regularity == 'weekly') {
        let isDone = false;
        habit.habitDones.forEach((done) => {
          if (moment().isSame(done.date, 'week')) {
            isDone = true;
          }
        });
        if (!isDone) {
          habitsToDone.push(habit);
        }
      }
    });
    return habitsToDone;
  }

  async update(
    user: User,
    updateHabitDto: UpdateHabitDto,
    id: number,
  ): Promise<void> {
    const result = await this.habitRepository.update(
      { id, user },
      { ...updateHabitDto },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`The habit with ID ${id} not found.`);
    }
  }

  async remove(user: User, id: number): Promise<void> {
    const result = await this.habitRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`The habit with ID ${id} not found.`);
    }
  }
}
