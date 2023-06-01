import FakeReadingRepository from '@modules/readings/repositories/fakes/FakeReadingRepository';
import ShowByFiltersServices from '@modules/readings/services/ShowByFilters.service';

let fakeReadingRepository: FakeReadingRepository;
let showByFiltersServices: ShowByFiltersServices;

describe('ShowByFilters', () => {
  beforeEach(() => {
    fakeReadingRepository = new FakeReadingRepository();
    showByFiltersServices = new ShowByFiltersServices(fakeReadingRepository);
  });

  it('should be able to show readings no filters', async () => {
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

    const readings = await showByFiltersServices.execute({});

    expect(readings?.length).toBe(2);
  });

  it('should be able to show readings filtered by machine', async () => {
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

    const readings = await showByFiltersServices.execute({ machine_id: 'machine-id-02' });

    expect(readings?.length).toBe(2);
  });

  it('should be able to show readings filtered by dates', async () => {
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
      created_at: new Date('2021-02-02'),
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
      created_at: new Date('2021-02-02'),
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
      created_at: new Date('2021-01-04'),
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
      created_at: new Date('2021-01-02 12:04'),
    });
    const readings = await showByFiltersServices.execute({ begin_date: new Date('2021-01-02'), final_date: new Date('2021-01-03 12:04') });

    expect(readings?.length).toBe(2);
  });
});
