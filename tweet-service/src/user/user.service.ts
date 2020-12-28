import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(
      { id },
      { relations: ['followers', 'tweets'] },
    );

    if (!user) {
      throw new NotFoundException(`User with ID ${id} is not found`);
    }

    return user;
  }

  async createUser(name: string): Promise<User> {
    const user = this.userRepository.create({ name });

    await this.userRepository.save(user);

    return user;
  }

  async addFollowerToUser(id: number, followerUserId: number): Promise<User> {
    if (id === followerUserId) {
      throw new BadRequestException(
        `User ID and Follower User ID can not be the same`,
      );
    }

    const user = await this.userRepository.findOne(
      { id },
      { relations: ['followers'] },
    );
    const followerUser = await this.userRepository.findOne({
      id: followerUserId,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} is not found`);
    }

    if (!followerUser) {
      throw new NotFoundException(
        `Follower User with ID ${followerUserId} is not found`,
      );
    }

    const followerUserIsExist = user.followers.find(
      user => user.id === followerUserId,
    )
      ? true
      : false;

    if (!followerUserIsExist) {
      user.followers.push(followerUser);

      await this.userRepository.save(user);
    }

    return user;
  }
}
