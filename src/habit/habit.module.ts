import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import { Habit } from './entities/Habit';
import { UsersModule } from 'src/users/users.module';
import { HabitDoneModule } from 'src/habit-done/habit-done.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habit]), UsersModule, HabitDoneModule],
  controllers: [HabitController],
  providers: [HabitService],
  exports: [HabitService],
})
export class HabitModule {}
