import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const found = await this.habitRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
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
