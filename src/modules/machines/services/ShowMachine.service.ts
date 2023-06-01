import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Machine from '@modules/machines/infra/typeorm/entities/Machine';

import IMachinesRepository from '@modules/machines/repositories/IMachineRepository';

interface Request {
  machine_id: string;
}

@injectable()
class ShowMachine {
  constructor(
    @inject('MachineRepository')
    private machineRepository: IMachinesRepository,
  ) {}

  public async execute({ machine_id }: Request): Promise<Machine> {
    const machine = await this.machineRepository.findById(machine_id);

    if (!machine) {
      throw new AppError('Máquina não encontrada');
    }

    return machine;
  }
}

export default ShowMachine;
