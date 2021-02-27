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
  @ApiProperty({ example: 'test@test.com', description: 'The email address' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Asd123', description: 'Cleartext password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak. Use mimimum 1 lettercase, 1 lowercase and 1 number.',
  })
  password: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'The last name of the user',
  })
  @IsOptional()
  readonly lastName: string | null;

  @ApiPropertyOptional({
    example: '+361251215',
    description: 'The phone number of the user',
  })
  @IsOptional()
  readonly phone: string | null;

  @ApiProperty({ enum: RegisterWith, default: 'email' })
  @IsNotEmpty()
  @IsEnum(RegisterWith)
  readonly registerWith: RegisterWith;

  @ApiPropertyOptional({
    description: 'The datetime when the user verified the registration',
  })
  @IsOptional()
  readonly emailVerifiedAt: Date | null;
}
