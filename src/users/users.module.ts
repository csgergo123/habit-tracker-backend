import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/User';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
