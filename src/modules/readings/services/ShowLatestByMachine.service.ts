import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Reading from '@modules/readings/infra/typeorm/entities/Reading';
import IReadingsRepository from '@modules/readings/repositories/IReadingRepository';

@injectable()
class ShowLatestByClient {
  constructor(
    @inject('ReadingsRepository')
    private readingsRepository: IReadingsRepository,
  ) {}

  public async execute(machine_id: string): Promise<Reading[] | undefined> {
    const readings = await this.readingsRepository.findLastestByMachine(machine_id);

    return readings;
  }
}

export default ShowLatestByClient;
