import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SignupService } from './signup.service';
import { SigninDto } from './DTOs/signin.dto';
import { SignupDto } from './DTOs/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private signinService: SigninService,
    private signupService: SignupService,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.ACCEPTED)
  signin(@Body() userData: SigninDto) {
    return this.signinService.signin(userData);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() userData: SignupDto) {
    return this.signupService.signup(userData);
  }
}
