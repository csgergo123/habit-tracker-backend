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
import { CreateHabitDoneDto } from './dto/create-habit-done.dto';
import { UpdateHabitDoneDto } from './dto/update-habit-done.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/entities/User';

@ApiTags('HabitDone')
@Controller('habit-dones')
@UseGuards(AuthGuard())
export class HabitDoneController {
  constructor(private readonly habitDoneService: HabitDoneService) {}

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHabitDoneDto: UpdateHabitDoneDto,
    @GetUser() user: User,
  ) {
    return this.habitDoneService.update(user, updateHabitDoneDto, +id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.habitDoneService.remove(user, +id);
  }
}
