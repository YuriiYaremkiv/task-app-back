import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be string' })
  @Length(4, 20, { message: 'Min length 4, max 20' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Must be a string' })
  @Length(4, 20, { message: 'Min length 4, max 20' })
  password: string;

  @IsString({ message: 'Must be a string' })
  refreshToken: string;
}
