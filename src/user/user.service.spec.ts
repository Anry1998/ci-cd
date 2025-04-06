import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const mockUserArray = [
  { id: 1, name: 'Alice', email: 'alice@email.com' },
  { id: 2, name: 'Bob', email: 'bob@email.com' },
];

const mockUserRepository = () => ({
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockImplementation(dto => Promise.resolve(dto)),
  find: jest.fn().mockResolvedValue(mockUserArray),
  findOne: jest.fn(({ where: { id } }) =>
    Promise.resolve(mockUserArray.find(user => user.id === id)),
  ),
  update: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
});

describe('UserService', () => {
  let service: UserService;
  let repository: ReturnType<typeof mockUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const dto = { name: 'Alice', email: 'alice@email.com' };
    const createdUser = await service.create(dto);
    expect(createdUser).toEqual(dto);
    expect(repository.save).toHaveBeenCalledWith(dto);
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual(mockUserArray);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one user by id', async () => {
    const user = await service.findOne(1);
    expect(user).toEqual(mockUserArray[0]);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });


});
