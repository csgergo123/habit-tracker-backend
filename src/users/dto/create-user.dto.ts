import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RegisterWith } from './register-with.dto';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ required: false })
  readonly lastName?: string;

  @ApiProperty({ required: false })
  readonly phone?: string;

  @ApiProperty({ enum: RegisterWith, default: 'email' })
  @IsNotEmpty()
  readonly registerWith: RegisterWith;

  @ApiProperty()
  readonly emailVerifiedAt?: string;
}
