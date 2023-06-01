import { injectable, inject } from 'tsyringe';
import Reading from '@modules/readings/infra/typeorm/entities/Reading';
import AppError from '@shared/errors/AppError';
import IMachinesRepository from '@modules/machines/repositories/IMachineRepository';
import IReadingRepository from '@modules/readings/repositories/IReadingRepository';

interface IRequest {
  mac_address: string;
  welding_current: number;
  welding_voltage: number;
  arc_status: boolean;
  wire_speed: number;
  voltageL1: number;
  voltageL2: number;
  voltageL3: number;
  currentL1: number;
  currentL2: number;
  currentL3: number;
  gas_flow: number;
}

@injectable()
class CreateReadingService {
  constructor(
    @inject('ReadingsRepository')
    private readingsRepository: IReadingRepository,

    @inject('MachineRepository')
    private machinesRepository: IMachinesRepository,
  ) {}

  public async execute({
    mac_address,
    welding_current,
    welding_voltage,
    arc_status,
    wire_speed,
    voltageL1,
    voltageL2,
    voltageL3,
    currentL1,
    currentL2,
    currentL3,
    gas_flow,
  }: IRequest): Promise<Reading> {
    const findMachine = await this.machinesRepository.findByMacAddress(mac_address);

    if (!findMachine) {
      throw new AppError('Máquina não encontrada com endereço mac fornecedido');
    }

    const reading = await this.readingsRepository.create({
      machine_id: findMachine.id,
      welding_current,
      welding_voltage,
      arc_status,
      wire_speed,
      voltageL1,
      voltageL2,
      voltageL3,
      currentL1,
      currentL2,
      currentL3,
      gas_flow,
    });

    return reading;
  }
}

export default CreateReadingService;
