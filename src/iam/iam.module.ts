import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { SigninService } from './authentication/signin.service';
import { SignupService } from './authentication/signup.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    SigninService,
    SignupService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
