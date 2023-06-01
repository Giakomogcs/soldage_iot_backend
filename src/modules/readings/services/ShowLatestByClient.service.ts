import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Reading from '@modules/readings/infra/typeorm/entities/Reading';
import IReadingsRepository from '@modules/readings/repositories/IReadingRepository';
import IMachineRepository from '@modules/machines/repositories/IMachineRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowLatestByClient {
  constructor(
    @inject('ReadingsRepository')
    private readingsRepository: IReadingsRepository,

    @inject('MachineRepository')
    private machineRepository: IMachineRepository,
  ) {}

  public async execute(client_id: string): Promise<Reading[] | undefined> {
    const machines = await this.machineRepository.findByClient(client_id);

    if (machines?.length === 0 || !machines) {
      throw new AppError('Cliente não possui máquinas');
    }

    const machines_ids: string[] = [];

    machines.forEach(machine => {
      machines_ids.push(machine.id);
    });

    const reading = await this.readingsRepository.findLastestByGroupMachines(machines_ids);

    return reading;
  }
}

export default ShowLatestByClient;
