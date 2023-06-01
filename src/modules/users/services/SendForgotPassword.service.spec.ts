import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepo from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import SendForgotPasswordService from './SendForgotPassword.service';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepo: FakeUserTokenRepo;
let sendForgotPassword: SendForgotPasswordService;

describe('SendForgotPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepo = new FakeUserTokenRepo();
    sendForgotPassword = new SendForgotPasswordService(fakeUserRepository, fakeMailProvider, fakeUserTokenRepo);
  });

  it('should br able to recover password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '12345',
    });

    await sendForgotPassword.execute({ email: 'jj@email.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a invalid password', async () => {
    await expect(sendForgotPassword.execute({ email: 'jj@email.com' })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepo, 'generate');

    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '12345',
    });

    await sendForgotPassword.execute({ email: 'jj@email.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
