import { Test, TestingModule } from '@nestjs/testing';
import { HabitDoneController } from './habit-done.controller';
import { HabitDoneService } from './habit-done.service';

describe('HabitDoneController', () => {
  let controller: HabitDoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitDoneController],
      providers: [HabitDoneService],
    }).compile();

    controller = module.get<HabitDoneController>(HabitDoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
