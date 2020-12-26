import { NotFoundException, BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAll(): Promise<User[]> {
    const users = await User.find();

    return users;
  }

  async findOneById(id: number): Promise<User> {
    const user = await User.findOne({ id }, { relations: ['followers'] });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} is not found`);
    }

    return user;
  }

  async createUser(name: string): Promise<User> {
    const user = new User();

    user.name = name;

    await user.save();

    return user;
  }

  async addFollowerToUser(id: number, followerUserId: number): Promise<User> {
    if (id === followerUserId) {
      throw new BadRequestException(
        `User ID and Follower User ID can not be the same`,
      );
    }

    const user = await User.findOne({ id }, { relations: ['followers'] });
    const followerUser = await User.findOne({ id: followerUserId });

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

      await user.save();
    }

    return user;
  }
}
