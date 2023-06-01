import FakeReadingRepository from '@modules/readings/repositories/fakes/FakeReadingRepository';
import DeleteOldByMachine from '@modules/readings/services/DeleteOldByMachine.service';

let fakeReadingRepository: FakeReadingRepository;
let deleteOldByMachine: DeleteOldByMachine;

describe('DeleteOldByMachine', () => {
  beforeEach(() => {
    fakeReadingRepository = new FakeReadingRepository();
    deleteOldByMachine = new DeleteOldByMachine(fakeReadingRepository);
  });
  it('should be able to delete an old reading', async () => {
    await fakeReadingRepository.create({
      machine_id: 'machine-id-01',
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
      created_at: new Date(),
    });

    await fakeReadingRepository.create({
      machine_id: 'machine-id-01',
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
      created_at: new Date(),
    });

    await fakeReadingRepository.create({
      machine_id: 'machine-id-01',
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
      machine_id: 'machine-id-02',
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
      machine_id: 'machine-id-02',
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

    await deleteOldByMachine.execute('machine-id-02');

    const readings = await fakeReadingRepository.findAll();

    expect(readings?.length).toBe(4);
  });
});
