import { Test, TestingModule } from '@nestjs/testing';
import { HabitDoneService } from './habit-done.service';

describe('HabitDoneService', () => {
  let service: HabitDoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitDoneService],
    }).compile();

    service = module.get<HabitDoneService>(HabitDoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
