import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import UpdateUserService from '@modules/users/services/UpdateUser.service';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateUserService: UpdateUserService;

describe('updateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    updateUserService = new UpdateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should not be able to update an non existent user ', async () => {
    await expect(
      updateUserService.execute({
        user_id: 'non-existent-user-id',
        name: 'User A',
        email: 'jj@email.com',
        password: '123456',
        inactive: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update email whit an existent email from other user ', async () => {
    await fakeUserRepository.create({
      name: 'User A',
      email: 'jja@email.com',
      password: '12345',
    });

    const user = await fakeUserRepository.create({
      name: 'User B',
      email: 'jjb@email.com',
      password: '12346',
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'User C',
        email: 'jja@email.com',
        password: '12346',
        inactive: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '12345',
    });

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      email: 'jj@email.com',
      name: 'User A',
      password: '123123',
      oldPassword: '12345',
      inactive: true,
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should be able to update user no req fields', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '12345',
    });

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      inactive: true,
    });

    expect(updatedUser.password).toBe('12345');
  });

  it('should not be able to update password without an old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '12345',
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'User A',
        email: 'jj@email.com',
        password: '1234589',
        inactive: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to update password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        email: 'jj@email.com',
        name: 'Eduardo',
        password: '123123',
        oldPassword: '123123',
        inactive: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
