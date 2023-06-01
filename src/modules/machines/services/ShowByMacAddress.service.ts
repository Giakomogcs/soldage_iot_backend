import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Machine from '@modules/machines/infra/typeorm/entities/Machine';
import IMachinesRepository from '@modules/machines/repositories/IMachineRepository';

@injectable()
class ShowByMacAddress {
  constructor(
    @inject('MachineRepository')
    private machineRepository: IMachinesRepository,
  ) {}

  public async execute(mac_address: string): Promise<Machine | undefined> {
    const machine = await this.machineRepository.findByMacAddress(mac_address);

    return machine;
  }
}

export default ShowByMacAddress;
