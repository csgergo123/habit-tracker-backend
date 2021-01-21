import { Test, TestingModule } from '@nestjs/testing';
import { UserMetaService } from './user-meta.service';

describe('UserMetaService', () => {
  let service: UserMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMetaService],
    }).compile();

    service = module.get<UserMetaService>(UserMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
