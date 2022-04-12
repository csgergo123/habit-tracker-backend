import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './entities/jwt-payload.interface';
import { GoogleProfileDto } from './dto/google-profile.dto';

@Injectable()
export class UsersService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();

    createUserDto.password = await this.hashPassword(
      createUserDto.password,
      salt,
    );

    const user = new User({ ...createUserDto });
    user.salt = salt;

    let savedUser: User;
    try {
      savedUser = await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    delete savedUser.password;
    delete savedUser.salt;

    return savedUser;
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      delete user.password;
      delete user.salt;

      return user;
    }
    return null;
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const {
      id,
      email,
      firstName,
      lastName,
      phone,
    } = await this.validateUserPassword(authCredentialsDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id, email, firstName, lastName, phone };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  private async registerGoogleUser(profile: GoogleProfileDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      email: profile.emails[0].value,
    });
    if (user) return user;

    let savedUser: User;
    try {
      savedUser = await this.usersRepository.save({
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        registerWith: 'google',
      });
    } catch (error) {
      this.logger.error(
        'Error during save Google user to the database.',
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return savedUser;
  }

  async signInWithGoogle(
    profile: GoogleProfileDto,
  ): Promise<{ accessToken: string }> {
    const {
      id,
      email,
      firstName,
      lastName,
      phone,
    } = await this.registerGoogleUser(profile);

    const payload: JwtPayload = { id, email, firstName, lastName, phone };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.usersRepository.update(id, { ...updateUserDto });
    this.logger.debug(`Update #${id} user.`, JSON.stringify(updateUserDto));
    if (result.affected === 0) {
      throw new NotFoundException(`User #${id} not found.`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User #${id} not found.`);
    }
  }
}
