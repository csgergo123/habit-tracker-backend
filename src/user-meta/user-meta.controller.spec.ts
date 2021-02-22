import { Test, TestingModule } from '@nestjs/testing';
import { UserMetaController } from './user-meta.controller';
import { UserMetaService } from './user-meta.service';

describe('UserMetaController', () => {
  let controller: UserMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMetaController],
      providers: [UserMetaService],
    }).compile();

    controller = module.get<UserMetaController>(UserMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
