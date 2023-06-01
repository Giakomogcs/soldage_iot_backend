import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Reading from '@modules/readings/infra/typeorm/entities/Reading';
import IReadingsRepository from '@modules/readings/repositories/IReadingRepository';

interface IFilters {
  machine_id?: string;
  begin_date?: Date;
  final_date?: Date;
}

@injectable()
class ShowByFilters {
  constructor(
    @inject('ReadingsRepository')
    private readingsRepository: IReadingsRepository,
  ) {}

  public async execute({ machine_id, begin_date, final_date }: IFilters): Promise<Reading[] | undefined> {
    const reading = await this.readingsRepository.findByFilter({ machine_id, begin_date, final_date });

    return reading;
  }
}

export default ShowByFilters;
