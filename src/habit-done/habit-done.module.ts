import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitDoneService } from './habit-done.service';
import { HabitDoneController } from './habit-done.controller';
import { HabitDone } from './entities/HabitDone';
import { HabitModule } from 'src/habit/habit.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HabitDone]),
    UsersModule,
    forwardRef(() => HabitModule),
  ],
  controllers: [HabitDoneController],
  providers: [HabitDoneService],
  exports: [HabitDoneService],
})
export class HabitDoneModule {}
