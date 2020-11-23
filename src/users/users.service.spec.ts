import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMockRepository } from '../testutils';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();
    repo = module.get<Repository<User>>(getRepositoryToken(User));
    service = module.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create user when params are right', async () => {
      const testUser: User = {
        username: 'toto',
      };
      jest.spyOn(repo, 'save').mockReturnValueOnce(Promise.resolve(testUser));
      expect(await service.create(testUser)).toEqual(testUser);
    });
  });

  describe('findall', () => {
    it('should get all users when db has records', async () => {
      const testUsers: User[] = [
        {
          username: 'toto',
        },
        {
          username: 'toto1',
        },
        {
          username: 'toto2',
        },
      ];
      jest.spyOn(repo, 'find').mockReturnValueOnce(Promise.resolve(testUsers));
      expect(await service.findAll()).toEqual(testUsers);
    });

    it('otherwise should return empty array', async () => {
      jest.spyOn(repo, 'find').mockReturnValueOnce(Promise.resolve([]));
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update user when user exists', async () => {
      const userId = '134-abc-124';
      const testUser: User = {
        username: 'toto',
      };
      jest
        .spyOn(repo, 'preload')
        .mockReturnValueOnce(Promise.resolve(testUser));
      jest.spyOn(repo, 'save').mockReturnValueOnce(Promise.resolve(testUser));
      expect(await service.update(userId, testUser)).toEqual(testUser);
    });
    it('otherwise should throw NotFoundError', async () => {
      const userId = '134-abc-124';
      const testUser: User = {
        username: 'toto',
      };
      jest.spyOn(repo, 'save').mockReturnValueOnce(Promise.resolve(testUser));
      try {
        await service.update(userId, testUser);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete an existing user', async () => {
      const user = { id: '134-abc-124', username: 'toto' };
      const deleteResult: DeleteResult = {
        raw: '',
        affected: 1,
      };

      jest.spyOn(repo, 'findOne').mockReturnValueOnce(Promise.resolve(user));
      jest
        .spyOn(repo, 'delete')
        .mockReturnValueOnce(Promise.resolve(deleteResult));

      expect(await service.delete(user.id)).toBeTruthy();
    });
  });

  describe('findOne by id', () => {
    it('should find a user already existing', async () => {
      const user = { id: '134-abc-124', username: 'toto' };
      jest.spyOn(repo, 'findOne').mockReturnValueOnce(Promise.resolve(user));
      expect(await service.findOne(user.id)).toBeTruthy();
    });

    it('should throw if user not found', async () => {
      const user = { id: '134-abc-124', username: 'toto' };
      jest.spyOn(repo, 'findOne').mockReturnValueOnce(undefined);
      try {
        await service.findOne(user.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findOne by username', () => {
    it('should find a user already existing', async () => {
      const user = { id: '134-abc-124', username: 'toto' };
      jest.spyOn(repo, 'findOne').mockReturnValueOnce(Promise.resolve(user));
      expect(await service.findByUsername(user.username)).toEqual(user);
    });

    it('should throw if user not found', async () => {
      const user = { id: '134-abc-124', username: 'toto' };
      jest.spyOn(repo, 'findOne').mockReturnValueOnce(undefined);
      try {
        await service.findByUsername(user.username);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('set presence', () => {
    it('should update an existing user', async () => {
      const userId = '134-abc-124';

      jest.spyOn(repo, 'preload').mockReturnValueOnce(
        Promise.resolve({
          username: 'toto',
          present: true,
        }),
      );
      jest.spyOn(repo, 'save').mockReturnValueOnce(
        Promise.resolve({
          username: 'toto',
          present: true,
        }),
      );
      expect(await service.setPresent({ id: userId, present: true })).toEqual({
        username: 'toto',
        present: true,
      });
    });
    it('otherwise should throw NotFoundError', async () => {
      const userId = '134-abc-124';
      const testUser: User = {
        username: 'toto',
      };
      jest.spyOn(repo, 'save').mockReturnValueOnce(Promise.resolve(testUser));
      try {
        await service.setPresent({ id: userId, present: false });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
