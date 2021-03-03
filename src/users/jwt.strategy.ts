import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from './entities/jwt-payload.interface';
import * as config from 'config';

import { User } from './entities/User';
const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const { password, salt, ...user } = await this.usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
