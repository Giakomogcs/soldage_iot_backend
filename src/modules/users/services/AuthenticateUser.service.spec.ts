import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUser.service';
import AuthenticateUserService from './AuthenticateUser.service';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('authUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();
    authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeMailProvider);
  });
  it('should be able to auth', async () => {
    await createUser.execute({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'jj@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to login with incorrect email', async () => {
    await createUser.execute({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'jjj@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to login with incorrect password', async () => {
    await createUser.execute({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'jj@email.com',
        password: '1234564',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
