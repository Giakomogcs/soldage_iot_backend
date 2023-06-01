import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Machine from '@modules/machines/infra/typeorm/entities/Machine';
import IMachinesRepository from '@modules/machines/repositories/IMachineRepository';

@injectable()
class ShowAllMachines {
  constructor(
    @inject('MachineRepository')
    private machineRepository: IMachinesRepository,
  ) {}

  public async execute(): Promise<Machine[] | undefined> {
    const machines = await this.machineRepository.findAll();

    return machines;
  }
}

export default ShowAllMachines;
