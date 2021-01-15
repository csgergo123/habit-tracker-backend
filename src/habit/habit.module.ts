import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import { Habit } from './entities/habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit])],
  controllers: [HabitController],
  providers: [HabitService],
})
export class HabitModule {}
