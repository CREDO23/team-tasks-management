import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
