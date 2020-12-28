import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { TweetResolver } from './tweet.resolver';
import { TweetService } from './tweet.service';
import { Tweet } from './tweet.entity';
import { User } from '../user/user.entity';

describe('Tweet Resolver', () => {
  let resolver: TweetResolver;
  let service: TweetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TweetResolver,
        TweetService,
        {
          provide: getRepositoryToken(Tweet),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<TweetResolver>(TweetResolver);
    service = module.get<TweetService>(TweetService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Query: tweets', () => {
    let tweet1: Tweet;
    let tweet2: Tweet;

    beforeEach(() => {
      tweet1 = new Tweet();
      tweet2 = new Tweet();
    });

    it('should get an array of tweets', async () => {
      const findSpy = jest
        .spyOn(service, 'findAllByUser')
        .mockResolvedValue([new Tweet(), new Tweet()]);

      const userId = 1;
      const fetchedTweets = await resolver.tweets(userId);

      expect(findSpy).toBeCalledWith(userId);
      expect(fetchedTweets).toEqual([tweet1, tweet2]);
    });
  });

  describe('Mutation: createTweet', () => {
    let tweet1: Tweet;

    beforeEach(() => {
      tweet1 = new Tweet();
    });

    it('should create a new tweet', async () => {
      const createSpy = jest
        .spyOn(service, 'createTweet')
        .mockResolvedValue(new Tweet());

      const userId = 1;
      const title = 'My first tweet';
      const content = 'blah blah blah...';

      const fetchedTweet = await resolver.createTweet(userId, title, content);

      expect(createSpy).toBeCalledWith(userId, title, content);
      expect(fetchedTweet).toEqual(tweet1);
    });
  });
});
