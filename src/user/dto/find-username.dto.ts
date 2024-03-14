import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserNameDto {
  @IsNotEmpty()
  @IsString()
  readonly userName: string;
}
