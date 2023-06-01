import { uuid } from 'uuidv4';

import IReadingRepository from '@modules/readings/repositories/IReadingRepository';
import Reading from '@modules/readings/infra/typeorm/entities/Reading';

interface ReadingsFilters {
  machine_id?: string;
  begin_date?: Date;
  final_date?: Date;
}

interface IReadings {
  machine_id: string;
  welding_current: number;
  welding_voltage: number;
  arc_status: boolean;
  wire_speed: number;
  voltageL1: number;
  voltageL2: number;
  voltageL3: number;
  currentL1: number;
  currentL2: number;
  currentL3: number;
  created_at: Date;
  gas_flow: number;
}

class ReadingRepository implements IReadingRepository {
  private readings: Reading[] = [];

  public async create({
    machine_id,
    welding_current,
    welding_voltage,
    arc_status,
    wire_speed,
    voltageL1,
    voltageL2,
    voltageL3,
    currentL1,
    currentL2,
    currentL3,
    created_at,
    gas_flow,
  }: IReadings): Promise<Reading> {
    const reading = new Reading();

    Object.assign(reading, {
      id: uuid(),
      machine_id,
      welding_current,
      welding_voltage,
      arc_status,
      wire_speed,
      voltageL1,
      voltageL2,
      voltageL3,
      currentL1,
      currentL2,
      currentL3,
      created_at,
      gas_flow,
    });

    this.readings.push(reading);

    return reading;
  }

  public async findAll(): Promise<Reading[] | undefined> {
    const findReadings = this.readings;

    return findReadings;
  }

  public async findByFilter({ machine_id, begin_date, final_date }: ReadingsFilters): Promise<Reading[] | undefined> {
    let findReadings = this.readings;

    if (machine_id) {
      findReadings = findReadings.filter(reading => reading.machine_id === machine_id);
    }

    if (begin_date) {
      findReadings = findReadings.filter(reading => reading.created_at >= begin_date);
    }

    if (final_date) {
      findReadings = findReadings.filter(reading => reading.created_at <= final_date);
    }

    return findReadings;
  }

  public async findLastestByGroupMachines(machines_ids: string[]): Promise<Reading[] | undefined> {
    const findReadings = this.readings.filter(readings => machines_ids.includes(readings.machine_id));

    return findReadings;
  }

  public async findLastestByMachine(machine_id: string): Promise<Reading[] | undefined> {
    const findReadings = this.readings.filter(readings => readings.machine_id === machine_id);

    return findReadings;
  }

  public async deleteOldByMachine(date: Date, machine_id: string): Promise<void> {
    const index = this.readings.filter(readings => readings.created_at <= date).findIndex(readings => readings.machine_id === machine_id);

    this.readings.splice(index, 1);
  }

  public async save(reading: Reading): Promise<Reading> {
    const index = this.readings.findIndex(readings => readings.id === reading.id);

    this.readings[index] = reading;

    return reading;
  }
}

export default ReadingRepository;
