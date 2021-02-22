import { Injectable } from '@nestjs/common';
import { CreateUserMetaDto } from './dto/create-user-meta.dto';
import { UpdateUserMetaDto } from './dto/update-user-meta.dto';

@Injectable()
export class UserMetaService {
  create(createUserMetaDto: CreateUserMetaDto) {
    return 'This action adds a new userMeta';
  }

  findAll() {
    return `This action returns all userMeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMeta`;
  }

  update(id: number, updateUserMetaDto: UpdateUserMetaDto) {
    return `This action updates a #${id} userMeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMeta`;
  }
}
