import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitDoneService } from './habit-done.service';
import { HabitDoneController } from './habit-done.controller';
import { HabitDone } from './entities/HabitDone';

@Module({
  imports: [TypeOrmModule.forFeature([HabitDone])],
  controllers: [HabitDoneController],
  providers: [HabitDoneService],
})
export class HabitDoneModule {}
