import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TerminusModule } from '@nestjs/terminus';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HealthController } from './health/health.controller';
import { HabitModule } from './habit/habit.module';
import { TodoModule } from './todo/todo.module';
import { HabitDoneModule } from './habit-done/habit-done.module';
import { UserMetaModule } from './user-meta/user-meta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    TerminusModule,
    HabitModule,
    TodoModule,
    HabitDoneModule,
    UserMetaModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
