import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('User Service', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Query: findAll', () => {
    let user1: User;
    let user2: User;

    beforeEach(() => {
      user1 = new User();
      user2 = new User();
    });

    it('should get an array of users', async () => {
      jest
        .spyOn(userRepository, 'find')
        .mockResolvedValue([new User(), new User()]);

      const fetchedUsers = await service.findAll();

      expect(fetchedUsers).toEqual([user1, user2]);
    });
  });

  describe('Query: findOneById', () => {
    let user1: User;

    beforeEach(() => {
      user1 = new User();
    });

    it('should get a user', async () => {
      const findSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(new User());

      const userId = 1;
      const fetchedUser = await service.findOneById(userId);

      expect(findSpy).toBeCalledWith(
        { id: userId },
        {
          relations: ['followers', 'tweets'],
        },
      );
      expect(fetchedUser).toEqual(user1);
    });

    it('should throw a NotFoundException error', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const userId = 9;

      expect(service.findOneById(userId)).rejects.toThrow();
    });
  });

  describe('Mutation: createUser', () => {
    let user1: User;

    beforeEach(() => {
      user1 = new User();
    });

    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(userRepository, 'create')
        .mockImplementation((conditions: { name: string }) => {
          const { name } = conditions;

          user1.name = name;

          return user1;
        });
      const saveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(user1);

      const name = 'Peter Yi';

      const fetchedUser = await service.createUser(name);

      expect(createSpy).toBeCalledWith({ name });
      expect(saveSpy).toBeCalledWith(user1);
      expect(fetchedUser).toEqual(user1);
    });
  });

  describe('Mutation: addFollowerToUser', () => {
    let user1: User;
    let user2: User;

    beforeEach(() => {
      user1 = new User();
      user2 = new User();
    });

    it('should add a follower to user', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation((conditions: { id: number }) => {
          const { id } = conditions;

          if (id === 1) {
            return Promise.resolve(user1);
          }

          return Promise.resolve(user2);
        });
      const saveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(user1);

      user1.followers = [];

      const userId = 1;
      const followerUserId = 2;

      const fetchedUser = await service.addFollowerToUser(
        userId,
        followerUserId,
      );

      expect(saveSpy).toBeCalledTimes(1);
      expect(fetchedUser.followers).toEqual([user2]);
    });

    it('should throw a BadRequestException error', async () => {
      const userId = 1;
      const followerUserId = 1;

      expect(
        service.addFollowerToUser(userId, followerUserId),
      ).rejects.toThrow();
    });

    it('should throw a NotFoundException error', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const userId = 9;
      const followerUserId = 2;

      expect(
        service.addFollowerToUser(userId, followerUserId),
      ).rejects.toThrow();
    });
  });
});
