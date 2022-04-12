import { DailyHabitDoneDto } from './dto/daily-habit-done.dto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import * as moment from 'moment';

import { HabitService } from 'src/habit/habit.service';
import { User } from 'src/users/entities/User';
import { CreateHabitDoneDto } from './dto/create-habit-done.dto';
import { HabitDone } from './entities/HabitDone';
import { Regularity } from 'src/habit/entities/regularity.enum';
import { WeeklyHabitDoneDto } from './dto/weekly-habit-done.dto';

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

  async getDailyHabitDonesForLastWeek(
    user: User,
  ): Promise<DailyHabitDoneDto[]> {
    const dailyHabitDones: DailyHabitDoneDto[] = [];
    const lastWeek = moment().subtract(7, 'd').format('YYYY-MM-DD');
    // Set finish date
    const tomorrow = moment().add(1, 'days');

    // Workaround solution because the TypeORM where not working in relation
    const habitDones = await this.habitDoneRepository.find({
      join: { alias: 'habit-done', innerJoin: { habit: 'habit-done.habit' } },
      where: (qb) => {
        qb.where({
          user,
          date: MoreThanOrEqual(lastWeek),
        }).andWhere('habit.regularity = :reg', { reg: Regularity.daily }); // Filter related field
      },
    });

    if (!habitDones) {
      throw new NotFoundException();
    }

    // Set initial day what is today - 7 days
    let day = moment().startOf('day').subtract(6, 'd');

    // Loop through the last week days
    do {
      let count = 0;
      // Loop through the last week habit dones and get where date is the actual day
      habitDones.forEach((done: HabitDone) => {
        if (moment(done.date).isSame(day, 'day')) {
          count++;
        }
      });
      const dailyDone = {
        day: moment(day).format('dddd'),
        dones: count,
      };
      dailyHabitDones.push(dailyDone);
      day = day.add(1, 'd');
    } while (!tomorrow.isSame(moment(day).format(), 'day'));

    return dailyHabitDones;
  }

  async getWeeklyHabitDonesForLastMonth(
    user: User,
  ): Promise<WeeklyHabitDoneDto[]> {
    const weeklyHabitDones: WeeklyHabitDoneDto[] = [];
    const lastMonth = moment().subtract(1, 'month').format('YYYY-MM-DD');
    // Set finish date
    const nextWeek = moment().add(1, 'week');

    // Workaround solution because the TypeORM where not working in relation
    const habitDones = await this.habitDoneRepository.find({
      join: { alias: 'habit-done', innerJoin: { habit: 'habit-done.habit' } },
      where: (qb) => {
        qb.where({
          user,
          date: MoreThanOrEqual(lastMonth),
        }).andWhere('habit.regularity = :reg', { reg: Regularity.weekly }); // Filter related field
      },
    });

    if (!habitDones) {
      throw new NotFoundException();
    }

    // Set initial day what is today - 1 month
    let week = moment().startOf('day').subtract(1, 'month');

    // Loop through the last week days
    do {
      let count = 0;
      // Loop through the last week habit dones and get where date is the actual day
      habitDones.forEach((done: HabitDone) => {
        if (moment(done.date).isSame(week, 'week')) {
          count++;
        }
      });
      const weeklyDone = {
        week: moment(week).week() + 'th',
        dones: count,
      };
      weeklyHabitDones.push(weeklyDone);
      week = week.add(1, 'week');
    } while (!nextWeek.isSame(moment(week).format(), 'week'));

    return weeklyHabitDones;
  }
}
