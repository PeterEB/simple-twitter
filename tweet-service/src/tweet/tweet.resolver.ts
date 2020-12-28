import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TweetService } from './tweet.service';
import { Tweet } from './tweet.entity';

@Resolver('tweet')
export class TweetResolver {
  constructor(private tweetService: TweetService) {}

  @Query()
  async tweets(@Args('userId') userId: number): Promise<Tweet[]> {
    return this.tweetService.findAllByUser(userId);
  }

  @Mutation('createTweet')
  async createTweet(
    @Args('userId') userId: number,
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<Tweet> {
    return this.tweetService.createTweet(userId, title, content);
  }
}
