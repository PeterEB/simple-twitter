import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetResolver } from './tweet.resolver';
import { TweetService } from './tweet.service';
import { TweetRepository } from './tweet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TweetRepository])],
  providers: [TweetResolver, TweetService],
})
export class TweetModule {}
