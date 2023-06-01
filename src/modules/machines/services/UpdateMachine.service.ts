import { injectable, inject } from 'tsyringe';
import Machine from '@modules/machines/infra/typeorm/entities/Machine';
import AppError from '@shared/errors/AppError';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMachinesRepository from '@modules/machines/repositories/IMachineRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
  machine_id: string;
  client_id?: string;
  code?: string;
  description?: string;
  mac_address?: string;
}

@injectable()
class UpdateMachineService {
  constructor(
    @inject('MachineRepository')
    private machineRepository: IMachinesRepository,

    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ machine_id, client_id, code, description, mac_address }: IRequest): Promise<Machine> {
    const machine = await this.machineRepository.findById(machine_id);

    if (!machine) {
      throw new AppError('Máquina não encontrada');
    }

    if (client_id) {
      const userExists = await this.userRepository.findById(client_id);

      if (!userExists) {
        throw new AppError('Cliente não encontrado');
      }

      machine.client = userExists;
    }

    if (mac_address) {
      const macExistis = await this.machineRepository.findByMacAddress(mac_address);

      if (macExistis && macExistis.id !== machine.id) {
        throw new AppError('Endereço mac já está em uso');
      }

      machine.mac_address = mac_address;
    }

    if (code) {
      const codeExists = await this.machineRepository.findByCode(code);

      if (codeExists && codeExists.id !== machine.id) {
        throw new AppError('Código já está em uso');
      }

      machine.code = code;
    }

    if (description) machine.description = description;

    if (client_id && client_id !== machine.client_id) {
      const forgotPasswordMailTemplate = path.resolve(__dirname, '..', 'views', 'createUpdateMachine.hbs');

      await this.mailProvider.sendMail({
        to: {
          name: machine.client.name,
          email: machine.client.email,
        },
        subject: 'Máquina Soldage',
        templateData: {
          file: forgotPasswordMailTemplate,
          variables: {
            name: machine.client.name,
            code: machine.code,
            description: machine.description,
          },
        },
      });
    }

    return this.machineRepository.save(machine);
  }
}

export default UpdateMachineService;
