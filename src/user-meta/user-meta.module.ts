import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserMetaService } from './user-meta.service';
import { UserMetaController } from './user-meta.controller';
import { UserMeta } from './entities/UserMeta';

@Module({
  imports: [TypeOrmModule.forFeature([UserMeta])],
  controllers: [UserMetaController],
  providers: [UserMetaService],
})
export class UserMetaModule {}
