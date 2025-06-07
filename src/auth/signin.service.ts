import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './DTOs/signin.dto';

@Injectable()
export class SigninService {
  constructor(private userService: UserService) {}

  async signin(data: SigninDto) {
    const isValidUser = await this.userService.findOneUserByFields(data);

    if (!isValidUser) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    return isValidUser;
  }
}
