import FakeReadingRepository from '@modules/readings/repositories/fakes/FakeReadingRepository';
import ShowAllReadings from '@modules/readings/services/ShowAllReadings.service';

let fakeReadingRepository: FakeReadingRepository;
let showAllReadings: ShowAllReadings;

describe('ShowAllReadings', () => {
  beforeEach(() => {
    fakeReadingRepository = new FakeReadingRepository();
    showAllReadings = new ShowAllReadings(fakeReadingRepository);
  });

  it('should be able to show readings', async () => {
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

    const readings = await showAllReadings.execute();

    expect(readings?.length).toBe(2);
  });
});
