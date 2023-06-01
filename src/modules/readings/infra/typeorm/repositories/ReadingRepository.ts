import { getRepository, In, Repository } from 'typeorm';
import Reading from '@modules/readings/infra/typeorm/entities/Reading';
import IReadingRepository from '@modules/readings/repositories/IReadingRepository';
import ICreateReadingDTO from '@modules/readings/dtos/ICreateReadingDTO';

interface ReadingsFilters {
  machine_id?: string;
  begin_date?: Date;
  final_date?: Date;
}

class ReadingRepository implements IReadingRepository {
  private ormRepository: Repository<Reading>;

  constructor() {
    this.ormRepository = getRepository(Reading);
  }

  public async findAll(): Promise<Reading[] | undefined> {
    const readings = await this.ormRepository.find({
      order: {
        created_at: 'DESC',
      },
      take: 200,
      relations: ['machine', 'machine.client'],
    });

    return readings;
  }

  public async findLastestByGroupMachines(machines_ids: string[]): Promise<Reading[] | undefined> {
    const readings = await this.ormRepository.find({
      where: { machine_id: In(machines_ids) },
      order: {
        created_at: 'DESC',
      },
      take: 200,
      relations: ['machine', 'machine.client'],
    });

    return readings;
  }

  public async findLastestByMachine(machine_id: string): Promise<Reading[] | undefined> {
    const readings = await this.ormRepository.find({
      where: { machine_id },
      order: {
        created_at: 'DESC',
      },
      take: 200,
      relations: ['machine', 'machine.client'],
    });

    return readings;
  }

  public async findByFilter({ machine_id, begin_date, final_date }: ReadingsFilters): Promise<Reading[]> {
    let query = this.ormRepository
      .createQueryBuilder('readings')
      .innerJoinAndSelect('readings.machine', 'machines')
      .innerJoinAndSelect('machines.client', 'clients');

    if (machine_id && machine_id !== ' ') {
      query = query.andWhere(`machine_id = '${machine_id}'`);
    }

    if (begin_date) {
      query = query.andWhere('readings.created_at >= :begin_date', { begin_date });
    }

    if (final_date) {
      query = query.andWhere('readings.created_at <= :final_date', { final_date });
    }

    query = query.addOrderBy('readings.created_at', 'DESC');

    const readings = query.getMany();

    return readings;
  }

  public async deleteOldByMachine(limit_date: Date, machine_id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .andWhere('readings.created_at <= :created_at', { created_at: limit_date })
      .andWhere('readings.machine_id = :machine_id', { machine_id })
      .execute();
  }

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
    gas_flow,
  }: ICreateReadingDTO): Promise<Reading> {
    const reading = this.ormRepository.create({
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
      gas_flow,
    });
    await this.ormRepository.save(reading);

    return reading;
  }

  public async save(reading: Reading): Promise<Reading> {
    return this.ormRepository.save(reading);
  }
}

export default ReadingRepository;
