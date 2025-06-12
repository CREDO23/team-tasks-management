import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hashPassword(password: string | Buffer): Promise<string>;

  abstract comparePasswords(
    password: string | Buffer,
    hashedPassword: string,
  ): Promise<boolean>;
}
