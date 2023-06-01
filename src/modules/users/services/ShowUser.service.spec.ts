import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ShowUserService from './ShowUser.service';

let fakeUserRepository: FakeUserRepository;
let showUserService: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showUserService = new ShowUserService(fakeUserRepository);
  });
  it('should be able to show an user', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '12345',
    });

    const showUser = await showUserService.execute({ user_id: user.id });

    expect(showUser.id).toBe(user.id);
  });

  it('should not be able to show a non-exitent user', async () => {
    expect(showUserService.execute({ user_id: 'non-exitent-user_id' })).rejects.toBeInstanceOf(AppError);
  });
});
