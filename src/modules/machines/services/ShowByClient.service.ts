import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Machine from '@modules/machines/infra/typeorm/entities/Machine';
import IMachinesRepository from '@modules/machines/repositories/IMachineRepository';

@injectable()
class ShowByClient {
  constructor(
    @inject('MachineRepository')
    private machineRepository: IMachinesRepository,
  ) {}

  public async execute(client_id: string): Promise<Machine[] | undefined> {
    const machines = await this.machineRepository.findByClient(client_id);

    return machines;
  }
}

export default ShowByClient;
