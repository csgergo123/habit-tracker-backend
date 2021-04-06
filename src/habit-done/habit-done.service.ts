import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, Like } from 'typeorm';
import * as moment from 'moment';

import { HabitService } from 'src/habit/habit.service';
import { User } from 'src/users/entities/User';
import { CreateHabitDoneDto } from './dto/create-habit-done.dto';
import { HabitDone } from './entities/HabitDone';
import { Regularity } from 'src/habit/entities/regularity.enum';

@Injectable()
export class HabitDoneService {
  private logger = new Logger('HabitDoneService');

  constructor(
    @InjectRepository(HabitDone)
    private readonly habitDoneRepository: Repository<HabitDone>,
    private readonly habitService: HabitService,
  ) {}

  async findOne(user: User, id: number) {
    const found = await this.habitDoneRepository.findOne({
      where: { id, user },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
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
      await this.habitDoneRepository.save(habitDone);
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

  async getDailyHabitDonesForLastWeek(user: User): Promise<number[]> {
    const dailyHabitDones: number[] = [];
    const lastWeek = moment().subtract(7, 'd').format('YYYY-MM-DD');
    const today = moment();

    const habitDones = await this.habitDoneRepository.find({
      where: {
        user,
        date: MoreThanOrEqual(lastWeek),
        //habit: { regularity: Regularity.daily },  // TODO
      },
      relations: ['habit'],
    });
    //console.log('habitDones', habitDones);

    if (!habitDones) {
      throw new NotFoundException();
    }

    // Set initial day what is today - 7 days
    let day = moment().subtract(7, 'd');
    // Loop through the last week days
    do {
      let count = 0;
      // Loop through the last week habit dones and get where date is the actual day
      habitDones.forEach((done: HabitDone) => {
        if (moment(done.date).isSame(day, 'day')) {
          count++;
        }
      });
      dailyHabitDones.push(count);
      day = day.add(1, 'd');
    } while (!today.isSame(moment(day).format(), 'day'));

    return dailyHabitDones;
  }
}
