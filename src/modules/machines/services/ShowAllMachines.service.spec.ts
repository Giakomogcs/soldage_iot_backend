import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMachineRepository from '@modules/machines/repositories/fakes/FakeMachineRepository';
import ShowAllMachines from '@modules/machines/services/ShowAllMachines.service';

let fakeUserRepository: FakeUserRepository;
let fakeMachineRepository: FakeMachineRepository;
let showAllMachines: ShowAllMachines;

describe('ShowAllMachines', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMachineRepository = new FakeMachineRepository();
    showAllMachines = new ShowAllMachines(fakeMachineRepository);
  });

  it('should be able to show machines', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    await fakeMachineRepository.create({
      client_id: user.id,
      code: 'some-machine-code',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    await fakeMachineRepository.create({
      client_id: user.id,
      code: 'some-machine-code2',
      description: 'some-description',
      mac_address: 'mac:address:02',
    });

    const machines = await showAllMachines.execute();

    expect(machines?.length).toBe(2);
  });
});
