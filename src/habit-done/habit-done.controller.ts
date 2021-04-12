import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HabitDoneService } from './habit-done.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/entities/User';

@ApiBearerAuth()
@ApiTags('HabitDone')
@Controller('habit-dones')
@UseGuards(AuthGuard())
export class HabitDoneController {
  constructor(private readonly habitDoneService: HabitDoneService) {}

  @Get('/daily/last-week')
  getDailyHabitDonesForLastWeek(@GetUser() user: User) {
    return this.habitDoneService.getDailyHabitDonesForLastWeek(user);
  }

  @Get('/weekly/last-month')
  getWeeklyHabitDonesForLastMonth(@GetUser() user: User) {
    return this.habitDoneService.getWeeklyHabitDonesForLastMonth(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.habitDoneService.remove(user, +id);
  }
}
