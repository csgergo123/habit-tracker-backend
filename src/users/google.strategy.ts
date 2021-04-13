import * as config from 'config';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UsersService } from './users.service';

const googleConfig = config.get('google');
const url = config.get('url');

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UsersService) {
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: `${url}/users/google/callback`,
      passReqToCallback: true,
      scope: ['profile email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    // eslint-disable-next-line @typescript-eslint/ban-types
    done: Function,
  ) {
    try {
      const user = await this.userService.signInWithGoogle(profile);

      done(null, user);
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  }
}
