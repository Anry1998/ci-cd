import { Test, TestingModule } from '@nestjs/testing'; // Импорт тестовых утилит NestJS
import { UserController } from './user.controller';     // Импортируем контроллер
import { UserService } from './user.service';           // Импортируем сервис
import { CreateUserDto } from './dto/create-user.dto';

// Фейковый массив пользователей, как будто из базы
const mockUserArray = [
  { id: 1, name: 'Alice', email: 'alice@email.com' },
  { id: 2, name: 'Bob', email: 'bob@email.com' },
];

// Мок-сервис, подделка UserService с заглушками для всех методов
const mockUserService = {
  findAll: jest.fn().mockResolvedValue(mockUserArray), // вернёт всех пользователей
  findOne: jest.fn().mockImplementation((id: number) =>
    Promise.resolve(mockUserArray.find(user => user.id === id)), // найдёт по id
  ),
  create: jest.fn().mockImplementation((dto: CreateUserDto) =>
    Promise.resolve({ id: 1, ...dto }), // создаёт нового (фейково)
  ),
  update: jest.fn().mockImplementation((id, dto) =>
    Promise.resolve({ id, ...dto }), // обновляет пользователя
  ),
  remove: jest.fn().mockResolvedValue({ deleted: true }), // удаляет
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  // Настраиваем тестовый модуль перед каждым тестом
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController], // только контроллер
      providers: [
        {
          provide: UserService,      // подменяем UserService на mock
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController); // получаем контроллер
    service = module.get<UserService>(UserService);           // и сервис
  });

  // Проверка, что контроллер существует
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Проверка: получить всех пользователей
  it('should return all users', async () => {
    expect(await controller.findAll()).toEqual(mockUserArray);
    expect(service.findAll).toHaveBeenCalled(); // проверяем, что метод был вызван
  });

  // Проверка: получить одного пользователя по id
  it('should return a single user by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockUserArray[0]);
    expect(service.findOne).toHaveBeenCalledWith(1); // контроллер конвертирует строку '1' в число
  });

  // Проверка: создать нового пользователя
  it('should create a new user', async () => {
    const dto = { name: 'Alice', email: 'alice@email.com' };
    expect(await controller.create(dto)).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto); // проверка передачи DTO
  });

  // Проверка: обновить пользователя
  it('should update a user', async () => {
    const dto = { name: 'Updated', email: 'updated@email.com' };
    expect(await controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
    });
    expect(service.update).toHaveBeenCalledWith(1, dto); // проверяем, что передали id и dto
  });

  // Проверка: удалить пользователя
  it('should delete a user', async () => {
    expect(await controller.remove('1')).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1); // id преобразуется в число
  });
});
