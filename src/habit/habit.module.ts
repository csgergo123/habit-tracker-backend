import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import { Habit } from './entities/Habit';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habit]), UsersModule],
  controllers: [HabitController],
  providers: [HabitService],
})
export class HabitModule {}
