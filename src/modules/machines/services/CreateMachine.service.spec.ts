import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMachineRepository from '@modules/machines/repositories/fakes/FakeMachineRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import CreateMachineService from '@modules/machines/services/CreateMachine.service';

let fakeUserRepository: FakeUserRepository;
let fakeMachineRepository: FakeMachineRepository;
let fakeMailProvider: FakeMailProvider;
let createMachineService: CreateMachineService;

describe('CreateMachine', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMachineRepository = new FakeMachineRepository();
    fakeMailProvider = new FakeMailProvider();
    createMachineService = new CreateMachineService(fakeMachineRepository, fakeUserRepository, fakeMailProvider);
  });
  it('should be able to create a new machine', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    const machine = await createMachineService.execute({
      client_id: user.id,
      code: 'some-machine-code',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    expect(machine).toHaveProperty('id');
  });

  it('should not be able to create two machines with same mac address', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    await createMachineService.execute({
      client_id: user.id,
      code: 'code01',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    await expect(
      createMachineService.execute({
        client_id: user.id,
        code: 'code02',
        description: 'some-description',
        mac_address: 'mac:address:01',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two machines with same code', async () => {
    const user = await fakeUserRepository.create({
      name: 'User A',
      email: 'jj@email.com',
      password: '123456',
    });

    await createMachineService.execute({
      client_id: user.id,
      code: 'code01',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    await expect(
      createMachineService.execute({
        client_id: user.id,
        code: 'code01',
        description: 'some-description',
        mac_address: 'mac:address:02',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a machine with no existing client', async () => {
    await expect(
      createMachineService.execute({
        client_id: 'unknown-user-id',
        code: 'code01',
        description: 'some-description',
        mac_address: 'mac:address:01',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
