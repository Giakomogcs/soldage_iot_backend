import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMachineRepository from '@modules/machines/repositories/fakes/FakeMachineRepository';
import ShowByClient from '@modules/machines/services/ShowByClient.service';

let fakeUserRepository: FakeUserRepository;
let fakeMachineRepository: FakeMachineRepository;
let showByClient: ShowByClient;

describe('ShowByClient', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMachineRepository = new FakeMachineRepository();
    showByClient = new ShowByClient(fakeMachineRepository);
  });

  it('should be able to show machines', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    await fakeMachineRepository.create({
      client_id: user.id,
      code: 'some-machine-code01',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    await fakeMachineRepository.create({
      client_id: user.id,
      code: 'some-machine-code02',
      description: 'some-description',
      mac_address: 'mac:address:02',
    });

    const machines = await showByClient.execute(user.id);

    expect(machines?.length).toBe(2);
  });
});
