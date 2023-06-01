import { uuid } from 'uuidv4';

import IMachineRepository from '@modules/machines/repositories/IMachineRepository';
import ICreateMachineDTO from '@modules/machines/dtos/ICreateMachineDTO';
import Machine from '@modules/machines/infra/typeorm/entities/Machine';

class MachineRepository implements IMachineRepository {
  private machines: Machine[] = [];

  public async findAll(): Promise<Machine[] | undefined> {
    return this.machines;
  }

  public async findById(id: string): Promise<Machine | undefined> {
    const findMachine = this.machines.find(machine => machine.id === id);

    return findMachine;
  }

  public async findByCode(code: string): Promise<Machine | undefined> {
    const findMachine = this.machines.find(machine => machine.code === code);

    return findMachine;
  }

  public async findByMacAddress(mac_address: string): Promise<Machine | undefined> {
    const findMachine = this.machines.find(machine => machine.mac_address === mac_address);

    return findMachine;
  }

  public async findByClient(client_id: string): Promise<Machine[] | undefined> {
    const findMachine = this.machines.filter(machine => machine.client_id === client_id);

    return findMachine;
  }

  public async create({ client_id, mac_address, description, code }: ICreateMachineDTO): Promise<Machine> {
    const machine = new Machine();

    Object.assign(machine, { id: uuid(), client_id, mac_address, description, code });

    this.machines.push(machine);

    return machine;
  }

  public async save(machine: Machine): Promise<Machine> {
    const index = this.machines.findIndex(findMachine => findMachine.id === machine.id);

    this.machines[index] = machine;

    return machine;
  }
}

export default MachineRepository;
