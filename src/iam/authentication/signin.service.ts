import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { HashingService } from '../hashing/hashing.service';
import { SigninDto } from './DTOs/signin.dto';

@Injectable()
export class SigninService {
  constructor(
    private userService: UserService,
    private hashingService: HashingService,
  ) {}

  async signin(data: SigninDto) {
    const doesUserExist = await this.userService.findOneUserByFields(data);

    if (!doesUserExist) {
      throw new BadRequestException('Invalid credentials');
    }

    const doesPasswordMatch = await this.hashingService.comparePasswords(
      data.password,
      doesUserExist.password,
    );

    if (!doesPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return true;
  }
}
