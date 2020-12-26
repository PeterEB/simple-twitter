import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Tweet } from 'src/tweet/tweet.entity';
import { User } from 'src/user/user.entity';

@EntityRepository(Tweet)
export class TweetRepository extends Repository<Tweet> {
  async findAllByUser(userId: number): Promise<Tweet[]> {
    const tweets = await Tweet.find({ userId: userId });

    return tweets;
  }

  async createTweet(
    userId: number,
    title: string,
    content: string,
  ): Promise<Tweet> {
    const user = await User.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} is not found`);
    }

    const tweet = new Tweet();

    tweet.title = title;
    tweet.content = content;
    tweet.user = user;

    await tweet.save();

    return tweet;
  }
}
