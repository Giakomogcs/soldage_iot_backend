import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import CreateUserService from '@modules/users/services/CreateUser.service';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeMailProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUserService.execute({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'User A',
        email: 'jj@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
