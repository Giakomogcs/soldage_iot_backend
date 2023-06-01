import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Reading from '@modules/readings/infra/typeorm/entities/Reading';
import IReadingsRepository from '@modules/readings/repositories/IReadingRepository';

@injectable()
class ShowAllReadings {
  constructor(
    @inject('ReadingsRepository')
    private readingsRepository: IReadingsRepository,
  ) {}

  public async execute(): Promise<Reading[] | undefined> {
    const readings = await this.readingsRepository.findAll();

    return readings;
  }
}

export default ShowAllReadings;
