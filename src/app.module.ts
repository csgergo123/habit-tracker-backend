import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TerminusModule } from '@nestjs/terminus';

import { UsersModule } from './users/users.module';
import { HealthController } from './health/health.controller';
import { HabitModule } from './habit/habit.module';
import { TodoModule } from './todo/todo.module';
import { HabitDoneModule } from './habit-done/habit-done.module';
import { UserMetaModule } from './user-meta/user-meta.module';
import { typeOrmConfig } from 'config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    TerminusModule,
    HabitModule,
    TodoModule,
    HabitDoneModule,
    UserMetaModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
