import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/user/user.entity';

@Resolver('user')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query()
  async user(@Args('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Mutation('createUser')
  async createUser(@Args('name') name: string): Promise<User> {
    return this.userService.createUser(name);
  }

  @Mutation('addFollowerToUser')
  async addFollowerToUser(
    @Args('id') id: number,
    @Args('followerUserId') followerUserId: number,
  ): Promise<User> {
    return this.userService.addFollowerToUser(id, followerUserId);
  }
}
