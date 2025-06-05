import { Module } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SignupService } from './signup.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [SigninService, SignupService],
  controllers: [AuthController],
})
export class AuthModule {}
