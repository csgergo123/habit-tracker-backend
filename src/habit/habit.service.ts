import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './entities/Habit';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
  ) {}

  create(createHabitDto: CreateHabitDto) {
    console.log(
      '🚀 ~ file: habit.service.ts ~ line 16 ~ HabitService ~ create ~ createHabitDto',
      createHabitDto,
    );
    const habit = new Habit({ ...createHabitDto });

    return this.habitRepository.save(habit);
  }

  async findAll(): Promise<Habit[]> {
    return this.habitRepository.find();
  }

  findOne(id: number): Promise<Habit> {
    return this.habitRepository.findOne(id);
  }

  update(id: number, updateHabitDto: UpdateHabitDto) {
    return this.habitRepository.update(id, { ...updateHabitDto });
  }

  async remove(id: number): Promise<void> {
    await this.habitRepository.delete(id);
  }
}
