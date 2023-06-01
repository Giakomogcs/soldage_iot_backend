import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMachineRepository from '@modules/machines/repositories/fakes/FakeMachineRepository';
import ShowMachine from '@modules/machines/services/ShowMachine.service';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeMachineRepository: FakeMachineRepository;
let showMachine: ShowMachine;

describe('ShowMachine', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMachineRepository = new FakeMachineRepository();
    showMachine = new ShowMachine(fakeMachineRepository);
  });

  it('should be able to show a machine', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    const machine = await fakeMachineRepository.create({
      client_id: user.id,
      code: 'some-machine-code01',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    const foundMachine = await showMachine.execute({ machine_id: machine.id });

    expect(foundMachine.id).toBe(machine.id);
  });

  it('should not be able to show a non existing machine', async () => {
    await expect(
      showMachine.execute({
        machine_id: 'unknown-machine-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
