import Machine from '@modules/machines/infra/typeorm/entities/Machine';
import ICreateMachineDTO from '@modules/machines/dtos/ICreateMachineDTO';

export default interface IMachineRepository {
  findById(id: string): Promise<Machine | undefined>;
  findByMacAddress(mac_address: string): Promise<Machine | undefined>;
  findByCode(code: string): Promise<Machine | undefined>;
  findByClient(client_id: string): Promise<Machine[] | undefined>;
  findAll(): Promise<Machine[] | undefined>;
  create(data: ICreateMachineDTO): Promise<Machine>;
  save(machine: Machine): Promise<Machine>;
}
