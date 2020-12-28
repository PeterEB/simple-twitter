import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllByUser(userId: number): Promise<Tweet[]> {
    return this.tweetRepository.find({ userId: userId });
  }

  async createTweet(
    userId: number,
    title: string,
    content: string,
  ): Promise<Tweet> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} is not found`);
    }

    const tweet = this.tweetRepository.create({ title, content, user });

    await this.tweetRepository.save(tweet);

    return tweet;
  }
}
