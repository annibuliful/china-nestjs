import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @Length(8)
  password: string;
}

export class UserDto extends CreateUserDto {
  id?: string;
}

export type UserData = Omit<UserDto, 'id'>;
