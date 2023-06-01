import { injectable, inject } from 'tsyringe';
import { addDays } from 'date-fns';
import IReadingRepository from '@modules/readings/repositories/IReadingRepository';

@injectable()
class DeleteOldReadinsByMachineService {
  constructor(
    @inject('ReadingsRepository')
    private readingRepository: IReadingRepository,
  ) {}

  public async execute(machine_id: string): Promise<void> {
    if (process.env.MAX_DAYS !== '0') {
      const limit_date = addDays(Date.now(), -Number(process.env.MAX_DAYS));

      await this.readingRepository.deleteOldByMachine(limit_date, machine_id);
    }
  }
}

export default DeleteOldReadinsByMachineService;
