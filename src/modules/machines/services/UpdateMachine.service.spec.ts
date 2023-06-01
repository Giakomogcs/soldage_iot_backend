import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeMachineRepository from '@modules/machines/repositories/fakes/FakeMachineRepository';
import UpdateMachine from '@modules/machines/services/UpdateMachine.service';

let fakeUserRepository: FakeUserRepository;
let fakeMachineRepository: FakeMachineRepository;
let fakeMailProvider: FakeMailProvider;
let updateMachine: UpdateMachine;

describe('UpdateMachine', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMachineRepository = new FakeMachineRepository();
    fakeMailProvider = new FakeMailProvider();
    updateMachine = new UpdateMachine(fakeMachineRepository, fakeUserRepository, fakeMailProvider);
  });
  it('should be able to update a machine', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'User B',
      email: 'jj@email2.com',
      password: '123456',
    });

    const machine = await fakeMachineRepository.create({
      client_id: user1.id,
      code: 'code-01',
      description: 'description 01',
      mac_address: 'mac:address:01',
    });

    const updatedMachine = await updateMachine.execute({
      machine_id: machine.id,
      client_id: user2.id,
      code: 'code-02',
      description: 'description 02',
      mac_address: 'mac:address:02',
    });

    expect(updatedMachine.code).toBe('code-02');
    expect(updatedMachine.description).toBe('description 02');
    expect(updatedMachine.mac_address).toBe('mac:address:02');
  });

  it('should be able to update non required fields', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    const machine = await fakeMachineRepository.create({
      client_id: user1.id,
      code: 'code-01',
      description: 'description 01',
      mac_address: 'mac:address:01',
    });

    const updatedMachine = await updateMachine.execute({
      machine_id: machine.id,
    });

    expect(updatedMachine.id).toBe(machine.id);
  });

  it('should not be able to update unexisting machine', async () => {
    await expect(
      updateMachine.execute({
        machine_id: 'unknown-machine-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update machine with used code', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    await fakeMachineRepository.create({
      client_id: user.id,
      code: 'code01',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    const machine = await fakeMachineRepository.create({
      client_id: user.id,
      code: 'code02',
      description: 'some-description',
      mac_address: 'mac:address:02',
    });

    await expect(
      updateMachine.execute({
        machine_id: machine.id,
        client_id: user.id,
        code: 'code01',
        description: 'some-description',
        mac_address: 'mac:address:03',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update machine with used mac address', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    await fakeMachineRepository.create({
      client_id: user.id,
      code: 'code01',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    const machine = await fakeMachineRepository.create({
      client_id: user.id,
      code: 'code02',
      description: 'some-description',
      mac_address: 'mac:address:02',
    });

    await expect(
      updateMachine.execute({
        machine_id: machine.id,
        client_id: user.id,
        code: 'code02',
        description: 'some-description',
        mac_address: 'mac:address:01',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update machine with no existing client', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    const machine = await fakeMachineRepository.create({
      client_id: user.id,
      code: 'code01',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    await expect(
      updateMachine.execute({
        machine_id: machine.id,
        client_id: 'unkwnown-client-id',
        code: 'code02',
        description: 'some-description',
        mac_address: 'mac:address:02',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
