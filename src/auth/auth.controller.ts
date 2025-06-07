import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SignupService } from './signup.service';
import { SigninDto } from './DTOs/signin.dto';
import { SignupDto } from './DTOs/signup.dto';
import { PublicResource } from 'src/common/decorators/public-ressource-metadata';

@Controller('auth')
export class AuthController {
  constructor(
    private signinService: SigninService,
    private signupService: SignupService,
  ) {}

  @PublicResource()
  @Post('signin')
  @HttpCode(HttpStatus.ACCEPTED)
  signin(@Body() userData: SigninDto) {
    return this.signinService.signin(userData);
  }

  @PublicResource()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() userData: SignupDto) {
    return this.signupService.signup(userData);
  }
}
