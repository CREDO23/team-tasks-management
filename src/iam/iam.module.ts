import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { SigninService } from './authentication/signin.service';
import { SignupService } from './authentication/signup.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthenticationGuard } from './guards/authentication.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    SigninService,
    SignupService,
    AccessTokenGuard,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
