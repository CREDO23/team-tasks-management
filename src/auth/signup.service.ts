import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/DTOs/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SignupService {
  constructor(private userService: UserService) {}

  async signup(user: CreateUserDto) {
    const doesUserExist = await this.userService.findOneUserByFields({
      email: user.email,
    });

    if (doesUserExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return this.userService.createUser(user);
  }
}
