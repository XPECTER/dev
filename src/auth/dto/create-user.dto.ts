import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and must be 8-20 characters long',
  })
  password: string;

  @IsPhoneNumber('KR')
  phone: string;
}
