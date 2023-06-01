import FakeReadingRepository from '@modules/readings/repositories/fakes/FakeReadingRepository';
import FakeMachineRepository from '@modules/machines/repositories/fakes/FakeMachineRepository';
import ShowLatestByClientService from '@modules/readings/services/ShowLatestByClient.service';
import AppError from '@shared/errors/AppError';

let fakeReadingRepository: FakeReadingRepository;
let fakeMachineRepository: FakeMachineRepository;
let showLatestByClientService: ShowLatestByClientService;

describe('ShowLatestByClient', () => {
  beforeEach(() => {
    fakeReadingRepository = new FakeReadingRepository();
    fakeMachineRepository = new FakeMachineRepository();
    showLatestByClientService = new ShowLatestByClientService(fakeReadingRepository, fakeMachineRepository);
  });

  it('should be able to show readings', async () => {
    const machine1 = await fakeMachineRepository.create({
      client_id: 'client-01',
      code: 'Code-A',
      description: 'Machine A',
      mac_address: 'mac:01:02',
    });

    const machine2 = await fakeMachineRepository.create({
      client_id: 'client-02',
      code: 'Code-A',
      description: 'Machine A',
      mac_address: 'mac:01:02',
    });

    await fakeReadingRepository.create({
      machine_id: machine1.id,
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
      created_at: new Date('2021-01-02'),
    });

    await fakeReadingRepository.create({
      machine_id: machine1.id,
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
      created_at: new Date('2021-01-02'),
    });

    await fakeReadingRepository.create({
      machine_id: machine2.id,
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
      created_at: new Date('2021-01-02'),
    });

    const readings = await showLatestByClientService.execute('client-01');

    expect(readings?.length).toBe(2);
  });

  it('should not be able to show readings of machines that don´t belong to client', async () => {
    await fakeReadingRepository.create({
      machine_id: 'some-machine-id',
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
      created_at: new Date('2021-01-02'),
    });

    await expect(showLatestByClientService.execute('client-01')).rejects.toBeInstanceOf(AppError);
  });
});
