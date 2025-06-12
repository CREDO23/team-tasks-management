import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from 'src/contracts/user/user.interface';
import { SignupDto } from 'src/iam/authentication/DTOs/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneUserByFields(
    fields: Partial<UserInterface>,
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: fields });
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(user: SignupDto): Promise<UserEntity> {
    try {
      const userEntity = this.userRepository.create(user);
      return await this.userRepository.save(userEntity);
    } catch (error: unknown) {
      console.log('ERRRRRRR', error);
      const CONFLICT_ERROR_CODE = '23505';
      if (error instanceof Error) {
        if ('code' in error) {
          if (error.code === CONFLICT_ERROR_CODE) {
            // Unique constraint violation
            throw new ConflictException('User already exists');
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
