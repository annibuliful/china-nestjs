import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, UserData, UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/users')
  async create(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData as UserDto);
  }
}
