import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/tweet/tweet.entity';
import { TweetRepository } from './tweet.repository';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetRepository)
    private tweetRepository: TweetRepository,
  ) {}

  async findAllByUser(userId: number): Promise<Tweet[]> {
    return this.tweetRepository.findAllByUser(userId);
  }

  async createTweet(
    userId: number,
    title: string,
    content: string,
  ): Promise<Tweet> {
    return this.tweetRepository.createTweet(userId, title, content);
  }
}
