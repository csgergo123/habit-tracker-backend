import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './entities/Habit';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { User } from 'src/users/entities/User';

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
  ) {}

  async create(createHabitDto: CreateHabitDto, user: User) {
    const habit = new Habit({ ...createHabitDto, user });

    const savedHabit = await this.habitRepository.save(habit);

    // Remove the user object from response
    delete savedHabit.user;

    return savedHabit;
  }

  async findAll(user: User): Promise<Habit[]> {
    return this.habitRepository.find({ where: { user } });
  }

  async findOne(user: User, id: number): Promise<Habit> {
    const found = await this.habitRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async update(user: User, updateHabitDto: UpdateHabitDto, id: number) {
    const habit = await this.findOne(user, id);
    return this.habitRepository.update(id, { ...updateHabitDto });
  }

  async remove(user: User, id: number): Promise<void> {
    const result = await this.habitRepository.delete({ id, user }); // TODO
    if (result.affected === 0) {
      throw new NotFoundException(`The habit with ID ${id} not found.`);
    }
  }
}
