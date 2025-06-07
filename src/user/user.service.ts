import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from 'src/contracts/user/user.interface';
import { CreateUserDto } from 'src/user/DTOs/create-user.dto';

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

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const userEntity = this.userRepository.create(user);
    return this.userRepository.save(userEntity);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
