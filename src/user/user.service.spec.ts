import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../testutils';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: mockRepository,
        },
      ],
    }).compile();
    repo = module.get<Repository<User>>(getRepositoryToken(User));
    service = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const testUser: User = {
      username: 'toto',
    };

    jest.spyOn(repo, 'save').mockReturnValueOnce(Promise.resolve(testUser));
    expect(await service.create(testUser)).toEqual(testUser);
  });
});
