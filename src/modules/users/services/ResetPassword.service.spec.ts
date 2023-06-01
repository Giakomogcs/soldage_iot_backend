import FakeUserTokenRepo from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPassword from '@modules/users/services/ResetPassword.service';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepo: FakeUserTokenRepo;
let resetPassword: ResetPassword;
let fakeHashProvider: FakeHashProvider;

describe('ResetForgotPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepo = new FakeUserTokenRepo();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPassword(fakeUserRepository, fakeHashProvider, fakeUserTokenRepo);
  });

  it('should br able to reset password using email', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '12345',
    });

    const { token } = await fakeUserTokenRepo.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({ password: '123123', token });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should be able to reset password whit an non existing token', async () => {
    await expect(resetPassword.execute({ token: 'unavaliable', password: '123456' })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset password whit an non existing user', async () => {
    const { token } = await fakeUserTokenRepo.generate('unavaliable');
    await expect(resetPassword.execute({ token, password: '123456' })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset password after 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '12345',
    });

    const { token } = await fakeUserTokenRepo.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(resetPassword.execute({ token, password: '123456' })).rejects.toBeInstanceOf(AppError);
  });
});
