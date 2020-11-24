import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

export const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  preload: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

export const createMockRedis = () => ({});
