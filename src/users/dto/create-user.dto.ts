import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { RegisterWith } from './register-with.dto';
export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'The email address' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'Asd123', description: 'Cleartext password' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'The last name of the user',
  })
  readonly lastName?: string;

  @ApiPropertyOptional({
    example: '+361251215',
    description: 'The phone number of the user',
  })
  readonly phone?: string;

  @ApiProperty({ enum: RegisterWith, default: 'email' })
  @IsNotEmpty()
  @IsEnum(RegisterWith)
  readonly registerWith: RegisterWith;

  @ApiPropertyOptional({
    description: 'The datetime when the user verified the registration',
  })
  readonly emailVerifiedAt?: string;
}
