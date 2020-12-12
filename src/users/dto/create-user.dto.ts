import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly firstName: string;

  readonly lastName?: string;

  readonly phone?: string;

  @IsNotEmpty()
  readonly registerWith: string;

  readonly emailVerifiedAt?: string;
}
