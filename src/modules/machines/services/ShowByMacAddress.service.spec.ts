import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMachineRepository from '@modules/machines/repositories/fakes/FakeMachineRepository';
import ShowByMacAddress from '@modules/machines/services/ShowByMacAddress.service';

let fakeUserRepository: FakeUserRepository;
let fakeMachineRepository: FakeMachineRepository;
let showByMacAddress: ShowByMacAddress;

describe('ShowByMacAddress', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMachineRepository = new FakeMachineRepository();
    showByMacAddress = new ShowByMacAddress(fakeMachineRepository);
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

    const machine = await showByMacAddress.execute('mac:address:01');

    expect(machine?.mac_address).toBe('mac:address:01');
  });
});
