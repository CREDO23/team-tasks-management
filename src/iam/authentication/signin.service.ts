import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { HashingService } from '../hashing/hashing.service';
import { SigninDto } from './DTOs/signin.dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SigninService {
  constructor(
    private userService: UserService,
    private hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signin(data: SigninDto) {
    const doesUserExist = await this.userService.findOneUserByFields({
      email: data.email,
    });

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

    const accessToken = await this.jwtService.signAsync(
      {
        sub: doesUserExist.id,
        userId: doesUserExist.id,
        email: doesUserExist.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
      },
    );

    return {
      accessToken,
    };
  }
}
