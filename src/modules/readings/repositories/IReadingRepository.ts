import Reading from '@modules/readings/infra/typeorm/entities/Reading';
import ICreateReadingDTO from '@modules/readings/dtos/ICreateReadingDTO';

interface ReadingsFilters {
  machine_id?: string;
  begin_date?: Date;
  final_date?: Date;
}

export default interface IReadingRepository {
  findLastestByGroupMachines(machines_ids: string[]): Promise<Reading[] | undefined>;
  findLastestByMachine(machine_id: string): Promise<Reading[] | undefined>;
  findByFilter(data: ReadingsFilters): Promise<Reading[] | undefined>;
  findAll(): Promise<Reading[] | undefined>;
  deleteOldByMachine(limit_date: Date, machine_id: string): Promise<void>;
  create(data: ICreateReadingDTO): Promise<Reading>;
  save(reading: Reading): Promise<Reading>;
}
