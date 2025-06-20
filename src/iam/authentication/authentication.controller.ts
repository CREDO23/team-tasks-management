import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SignupService } from './signup.service';
import { SigninDto } from './DTOs/signin.dto';
import { PublicResource } from 'src/common/decorators/public-ressource-metadata';
import { SignupDto } from './DTOs/signup.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private signinService: SigninService,
    private signupService: SignupService,
  ) {}

  @PublicResource()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() userData: SigninDto) {
    return this.signinService.signin(userData);

    // If you want to use cookies
    // const accessToken = await this.signinService.signin(userData);

    // response.cookie('access_token', accessToken, {
    //   httpOnly: true,
    //   sameSite: true,
    //   secure: true,
    // });
  }

  @PublicResource()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() userData: SignupDto) {
    return this.signupService.signup(userData);
  }
}
