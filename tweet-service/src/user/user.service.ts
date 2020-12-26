import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneById(id);
  }

  async createUser(name: string): Promise<User> {
    return this.userRepository.createUser(name);
  }

  async addFollowerToUser(id: number, followerUserId: number): Promise<User> {
    return this.userRepository.addFollowerToUser(id, followerUserId);
  }
}
