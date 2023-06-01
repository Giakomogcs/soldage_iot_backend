import { getRepository, Repository } from 'typeorm';
import Machine from '@modules/machines/infra/typeorm/entities/Machine';
import IMachineRepository from '@modules/machines/repositories/IMachineRepository';
import ICreateMachineDTO from '@modules/machines/dtos/ICreateMachineDTO';

class MachineRepository implements IMachineRepository {
  private ormRepository: Repository<Machine>;

  constructor() {
    this.ormRepository = getRepository(Machine);
  }

  public async findById(id: string): Promise<Machine | undefined> {
    const findMachine = await this.ormRepository.findOne(id, { relations: ['client'] });

    return findMachine;
  }

  public async findByMacAddress(mac_address: string): Promise<Machine | undefined> {
    const findMachine = await this.ormRepository.findOne({ where: { mac_address }, relations: ['client'] });

    return findMachine;
  }

  public async findByCode(code: string): Promise<Machine | undefined> {
    const findMachine = await this.ormRepository.findOne({ where: { code }, relations: ['client'] });

    return findMachine;
  }

  public async findByClient(client_id: string): Promise<Machine[] | undefined> {
    const findMachine = await this.ormRepository.find({
      where: { client_id },
      relations: ['client'],
    });

    return findMachine;
  }

  public async findAll(): Promise<Machine[]> {
    const machines = await this.ormRepository.find({ relations: ['client'] });

    return machines;
  }

  public async create({ client_id, code, description, mac_address }: ICreateMachineDTO): Promise<Machine> {
    const machine = this.ormRepository.create({ client_id, code, description, mac_address });
    await this.ormRepository.save(machine);

    return machine;
  }

  public async save(machine: Machine): Promise<Machine> {
    return this.ormRepository.save(machine);
  }
}

export default MachineRepository;
