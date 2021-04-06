import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { RegisterWith } from '../entities/register-with.enum';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak. Use mimimum 1 lettercase, 1 lowercase and 1 number.',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly lastName: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  readonly phone: string | null;

  @ApiProperty({ enum: RegisterWith, default: 'email' })
  @IsNotEmpty()
  @IsEnum(RegisterWith)
  readonly registerWith: RegisterWith;

  @ApiPropertyOptional()
  @IsOptional()
  readonly emailVerifiedAt: Date | null;
}
