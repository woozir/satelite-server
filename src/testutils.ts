export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  preload: jest.fn(),
  save: jest.fn(),
}));
