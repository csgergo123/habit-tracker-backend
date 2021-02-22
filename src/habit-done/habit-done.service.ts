import { Injectable } from '@nestjs/common';
import { CreateHabitDoneDto } from './dto/create-habit-done.dto';
import { UpdateHabitDoneDto } from './dto/update-habit-done.dto';

@Injectable()
export class HabitDoneService {
  create(createHabitDoneDto: CreateHabitDoneDto) {
    return 'This action adds a new habitDone';
  }

  findAll() {
    return `This action returns all habitDone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habitDone`;
  }

  update(id: number, updateHabitDoneDto: UpdateHabitDoneDto) {
    return `This action updates a #${id} habitDone`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitDone`;
  }
}
