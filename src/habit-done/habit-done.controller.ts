import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HabitDoneService } from './habit-done.service';
import { CreateHabitDoneDto } from './dto/create-habit-done.dto';
import { UpdateHabitDoneDto } from './dto/update-habit-done.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HabitDone')
@Controller('habit-done')
export class HabitDoneController {
  constructor(private readonly habitDoneService: HabitDoneService) {}

  @Post()
  create(@Body() createHabitDoneDto: CreateHabitDoneDto) {
    return this.habitDoneService.create(createHabitDoneDto);
  }

  @Get()
  findAll() {
    return this.habitDoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitDoneService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHabitDoneDto: UpdateHabitDoneDto,
  ) {
    return this.habitDoneService.update(+id, updateHabitDoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitDoneService.remove(+id);
  }
}
