import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('User Resolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Query: users', () => {
    let user1: User;
    let user2: User;

    beforeEach(() => {
      user1 = new User();
      user2 = new User();
    });

    it('should get an array of users', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue([new User(), new User()]);

      const fetchedUsers = await resolver.users();

      expect(fetchedUsers).toEqual([user1, user2]);
    });
  });

  describe('Query: user', () => {
    let user1: User;

    beforeEach(() => {
      user1 = new User();
    });

    it('should get a user', async () => {
      const findSpy = jest
        .spyOn(service, 'findOneById')
        .mockResolvedValue(new User());

      const userId = 1;
      const fetchedUser = await resolver.user(userId);

      expect(findSpy).toBeCalledWith(userId);
      expect(fetchedUser).toEqual(user1);
    });
  });

  describe('Mutation: createUser', () => {
    let user1: User;

    beforeEach(() => {
      user1 = new User();
    });

    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'createUser')
        .mockResolvedValue(new User());

      const name = 'Peter Yi';

      const fetchedUser = await resolver.createUser(name);

      expect(createSpy).toBeCalledWith(name);
      expect(fetchedUser).toEqual(user1);
    });
  });

  describe('Mutation: addFollowerToUser', () => {
    let user1: User;

    beforeEach(() => {
      user1 = new User();
    });

    it('should add a follower to user', async () => {
      const addFollowerSpy = jest
        .spyOn(service, 'addFollowerToUser')
        .mockResolvedValue(new User());

      const id = 1;
      const followerUserId = 2;

      const fetchedUser = await resolver.addFollowerToUser(id, followerUserId);

      expect(addFollowerSpy).toBeCalledWith(id, followerUserId);
      expect(fetchedUser).toEqual(user1);
    });
  });
});
