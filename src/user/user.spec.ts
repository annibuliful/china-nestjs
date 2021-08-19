import { Test, TestingModule } from '@nestjs/testing';
import { ChinaDbDriver } from '../drivers/china-db';
import { UserController } from './user.controller';
import { CreateUserDto, UserDto } from './user.dto';
import { UserService } from './user.service';

describe('user service', () => {
  let userService: UserService;
  let chinaDbDriver: ChinaDbDriver<UserDto>;
  beforeAll(() => {
    chinaDbDriver = new ChinaDbDriver();
    userService = new UserService(chinaDbDriver);
  });
  beforeEach(() => {
    chinaDbDriver.resetStores();
  });
  it('insert valid user data', async () => {
    const mockValidData = {
      username: 'MOCK_USERNAME',
      password: 'MOCK_PASSWORD',
    };
    const result = await userService.create(mockValidData);

    expect(result.id).toBeDefined();
    expect(result.password).toEqual(mockValidData.password);
    expect(result.username).toEqual(mockValidData.username);
  });

  it('insert invalid user data', async () => {
    const mockValidData = {
      username: 'MOCK_USERNAME',
      password: 'MOCK_P',
    };
    expect(userService.create(mockValidData)).rejects.toThrow(
      'password must be at least 8 characters',
    );
  });
});

describe('user controller', () => {
  let userController: UserController;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: 'ChinaDbDriver', useClass: ChinaDbDriver },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  it('insert new valid user', async () => {
    const user = new CreateUserDto();
    user.password = 'MOCK_PASSWORD';
    user.username = 'MOCK_USERNAME';
    const result = await userController.create(user);
    expect(result.id).toBeDefined();
    console.log('user', result);
  });
});
