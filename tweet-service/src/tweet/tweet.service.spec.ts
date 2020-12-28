import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { TweetService } from './tweet.service';
import { Tweet } from './tweet.entity';
import { User } from '../user/user.entity';

describe('Tweet Service', () => {
  let service: TweetService;
  let tweetRepository: Repository<Tweet>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<TweetService>(TweetService);
    tweetRepository = module.get<Repository<Tweet>>(getRepositoryToken(Tweet));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Function: findAllByUser', () => {
    let tweet1: Tweet;
    let tweet2: Tweet;

    beforeEach(() => {
      tweet1 = new Tweet();
      tweet2 = new Tweet();
    });

    it('should get an array of tweets', async () => {
      const findSpy = jest
        .spyOn(tweetRepository, 'find')
        .mockResolvedValue([new Tweet(), new Tweet()]);

      const userId = 1;
      const fetchedTweets = await service.findAllByUser(userId);

      expect(findSpy).toBeCalledWith({ userId });
      expect(fetchedTweets).toEqual([tweet1, tweet2]);
    });
  });

  describe('Function: createTweet', () => {
    let user1: User;
    let tweet1: Tweet;

    beforeEach(() => {
      user1 = new User();
      tweet1 = new Tweet();
    });

    it('should create a new tweet', async () => {
      const findUserSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation((conditions: { id: number }) => {
          const { id } = conditions;

          user1.id = id;

          return Promise.resolve(user1);
        });
      const createSpy = jest
        .spyOn(tweetRepository, 'create')
        .mockImplementation(
          (entityLike: { title: string; content: string; user: User }) => {
            const { title, content, user } = entityLike;
            let tweet1WithData = new Tweet();

            tweet1WithData.userId = user.id;
            tweet1WithData.title = title;
            tweet1WithData.content = content;

            return tweet1WithData;
          },
        );
      const saveSpy = jest
        .spyOn(tweetRepository, 'save')
        .mockResolvedValue(tweet1);

      const userId = 1;
      const title = 'My first tweet';
      const content = 'blah blah blah...';

      tweet1.userId = userId;
      tweet1.title = title;
      tweet1.content = content;

      const fetchedTweet = await service.createTweet(userId, title, content);

      expect(findUserSpy).toBeCalledWith({ id: userId });
      expect(createSpy).toBeCalledWith({ title, content, user: user1 });
      expect(saveSpy).toBeCalledWith(tweet1);
      expect(fetchedTweet).toEqual(tweet1);
    });

    it('should throw a NotFoundException error', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const userId = 9;
      const title = 'My first tweet';
      const content = 'blah blah blah...';

      expect(service.createTweet(userId, title, content)).rejects.toThrow();
    });
  });
});
