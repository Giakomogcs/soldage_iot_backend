import ShowAllUsersService from '@modules/users/services/ShowAllUsers.service';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

let fakeUserRepository: FakeUserRepository;
let showAllUsersService: ShowAllUsersService;

describe('ShowAllUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showAllUsersService = new ShowAllUsersService(fakeUserRepository);
  });

  it('should be able to show users', async () => {
    await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '12345',
    });

    await fakeUserRepository.create({
      name: 'User B',
      email: 'jjb@email.com',
      password: '123456',
    });

    const users = await showAllUsersService.execute();

    expect(users?.length).toBe(2);
  });
});
