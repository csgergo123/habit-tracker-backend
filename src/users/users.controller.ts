import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  Logger,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import * as config from 'config';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
const frontend = config.get('frontend');

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private logger = new Logger('UserController');

  constructor(private readonly usersService: UsersService) {}

  @Post('/signUp')
  @ApiOperation({ summary: 'Regist user' })
  @ApiResponse({ status: 201, description: 'The user record.' })
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`A new user created. ${JSON.stringify(createUserDto)}`);
    return this.usersService.signUp(createUserDto);
  }

  @Post('/signIn')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 201 })
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(authCredentialsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 201, description: 'Array of the user records.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const accessToken: string = req.user.accessToken;
    if (accessToken)
      res.redirect(`${frontend.url}/login/success/` + accessToken);
    else res.redirect(`${frontend.url}/login/failure`);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 201, description: 'The user record.' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 201, description: 'The updated user record.' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 201, description: 'Remove user.' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
