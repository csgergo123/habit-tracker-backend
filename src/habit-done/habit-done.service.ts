import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitService } from 'src/habit/habit.service';
import { User } from 'src/users/entities/User';
import { Repository } from 'typeorm';
import { CreateHabitDoneDto } from './dto/create-habit-done.dto';
import { UpdateHabitDoneDto } from './dto/update-habit-done.dto';
import { HabitDone } from './entities/HabitDone';

@Injectable()
export class HabitDoneService {
  private logger = new Logger('HabitDoneService');

  constructor(
    @InjectRepository(HabitDone)
    private readonly habitDoneRepository: Repository<HabitDone>,
    private readonly habitService: HabitService,
  ) {}

  async create(createHabitDoneDto: CreateHabitDoneDto, user: User) {
    const habitDone = new HabitDone({ ...createHabitDoneDto, user });

    try {
      const savedHabitDone = await this.habitDoneRepository.save(habitDone);
      // Remove the user object from response
      delete savedHabitDone.user;
      return savedHabitDone;
    } catch (error) {
      this.logger.error(
        `Error during save habit done to the database. Habit: ${JSON.stringify(
          habitDone,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async findAll(user: User): Promise<HabitDone[]> {
    return this.habitDoneRepository.find({ where: { user } });
  }

  async findOne(user: User, id: number) {
    const found = await this.habitDoneRepository.findOne({
      where: { id, user },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async update(
    user: User,
    updateHabitDoneDto: UpdateHabitDoneDto,
    id: number,
  ): Promise<void> {
    const result = await this.habitDoneRepository.update(
      { id, user },
      { ...updateHabitDoneDto },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`The habit done with ID ${id} not found.`);
    }
  }

  async remove(user: User, id: number): Promise<void> {
    const result = await this.habitDoneRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`The habit done with ID ${id} not found.`);
    }
  }

  async makeDone(
    user: User,
    createHabitDoneDto: CreateHabitDoneDto,
    id: number,
  ): Promise<void> {
    const habit = await this.habitService.findOne(user, id);
    const habitDone = new HabitDone({ ...createHabitDoneDto, user, habit });

    try {
      const savedHabitDone = await this.habitDoneRepository.save(habitDone);
    } catch (error) {
      this.logger.error(
        `Error during save habit done to the database. Habit: ${JSON.stringify(
          habitDone,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
