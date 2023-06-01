import FakeReadingRepository from '@modules/readings/repositories/fakes/FakeReadingRepository';
import FakeMachineRepository from '@modules/machines/repositories/fakes/FakeMachineRepository';
import CreateReadingService from '@modules/readings/services/CreateReading.service';
import AppError from '@shared/errors/AppError';

let fakeReadingRepository: FakeReadingRepository;
let fakeMachineRepository: FakeMachineRepository;
let createReadingService: CreateReadingService;

describe('CreateReading', () => {
  beforeEach(() => {
    fakeMachineRepository = new FakeMachineRepository();
    fakeReadingRepository = new FakeReadingRepository();
    createReadingService = new CreateReadingService(fakeReadingRepository, fakeMachineRepository);
  });
  it('should be able to create a new reading', async () => {
    const machine = await fakeMachineRepository.create({
      client_id: 'some-user-id',
      code: 'some-reading-code',
      description: 'some-description',
      mac_address: 'mac:address:01',
    });

    const readings = await createReadingService.execute({
      mac_address: machine.mac_address,
      welding_current: 12.34,
      welding_voltage: 2.78,
      wire_speed: 1,
      arc_status: true,
      currentL1: 23.78,
      currentL2: 34,
      currentL3: 2.005,
      voltageL1: 5.8,
      voltageL2: 3,
      voltageL3: 9.07,
      gas_flow: 2.25,
    });

    expect(readings).toHaveProperty('id');
  });

  it('should not be able to create a reading with no existing machine', async () => {
    await expect(
      createReadingService.execute({
        mac_address: 'unknown-machine-address',
        welding_current: 12.34,
        welding_voltage: 2.78,
        wire_speed: 1,
        arc_status: true,
        currentL1: 23.78,
        currentL2: 34,
        currentL3: 2.005,
        voltageL1: 5.8,
        voltageL2: 3,
        voltageL3: 9.07,
        gas_flow: 2.25,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
