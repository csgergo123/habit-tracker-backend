import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User({ ...createUserDto });

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
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, { ...updateUserDto });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {}
}
