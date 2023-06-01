import FakeReadingRepository from '@modules/readings/repositories/fakes/FakeReadingRepository';
import FakeMachineRepository from '@modules/machines/repositories/fakes/FakeMachineRepository';
import ShowLatestByMachineService from '@modules/readings/services/ShowLatestByMachine.service';

let fakeReadingRepository: FakeReadingRepository;
let fakeMachineRepository: FakeMachineRepository;
let showLatestByMachineService: ShowLatestByMachineService;

describe('ShowLatestByClient', () => {
  beforeEach(() => {
    fakeReadingRepository = new FakeReadingRepository();
    fakeMachineRepository = new FakeMachineRepository();
    showLatestByMachineService = new ShowLatestByMachineService(fakeReadingRepository);
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

    const readings = await showLatestByMachineService.execute(machine1.id);

    expect(readings?.length).toBe(2);
  });
});
