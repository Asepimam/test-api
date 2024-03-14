import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  readonly username: string;

  @IsString({ message: 'Password is required' })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minNumbers: 2,
    minSymbols: 1,
  })
  @MaxLength(8)
  readonly password: string;
}
