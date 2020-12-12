import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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

  @ApiProperty()
  @IsNotEmpty()
  readonly registerWith: string;

  @ApiProperty()
  readonly emailVerifiedAt?: string;
}
