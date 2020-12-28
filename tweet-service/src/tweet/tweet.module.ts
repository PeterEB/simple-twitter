import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetResolver } from './tweet.resolver';
import { TweetService } from './tweet.service';
import { Tweet } from './tweet.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, User])],
  providers: [TweetResolver, TweetService],
})
export class TweetModule {}
