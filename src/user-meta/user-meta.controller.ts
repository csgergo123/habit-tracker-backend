import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserMetaService } from './user-meta.service';
import { CreateUserMetaDto } from './dto/create-user-meta.dto';
import { UpdateUserMetaDto } from './dto/update-user-meta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserMeta')
@Controller('user-meta')
export class UserMetaController {
  constructor(private readonly userMetaService: UserMetaService) {}

  @Post()
  create(@Body() createUserMetaDto: CreateUserMetaDto) {
    return this.userMetaService.create(createUserMetaDto);
  }

  @Get()
  findAll() {
    return this.userMetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMetaService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserMetaDto: UpdateUserMetaDto,
  ) {
    return this.userMetaService.update(+id, updateUserMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMetaService.remove(+id);
  }
}
