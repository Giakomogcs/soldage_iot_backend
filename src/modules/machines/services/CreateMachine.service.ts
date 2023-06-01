import { injectable, inject } from 'tsyringe';
import Machine from '@modules/machines/infra/typeorm/entities/Machine';
import AppError from '@shared/errors/AppError';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMachinesRepository from '@modules/machines/repositories/IMachineRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
  client_id: string;
  code: string;
  description: string;
  mac_address: string;
}

@injectable()
class CreateMachineService {
  constructor(
    @inject('MachineRepository')
    private machineRepository: IMachinesRepository,

    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ client_id, code, description, mac_address }: IRequest): Promise<Machine> {
    const userExists = await this.userRepository.findById(client_id);

    if (!userExists) {
      throw new AppError('Cliente não encontrado');
    }

    const macExistis = await this.machineRepository.findByMacAddress(mac_address);

    if (macExistis) {
      throw new AppError('Endereço mac já está em uso');
    }

    const codeExists = await this.machineRepository.findByCode(code);

    if (codeExists) {
      throw new AppError('Código já está em uso');
    }

    const machine = await this.machineRepository.create({
      client_id,
      code,
      description,
      mac_address,
    });

    const forgotPasswordMailTemplate = path.resolve(__dirname, '..', 'views', 'createUpdateMachine.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: userExists.name,
        email: userExists.email,
      },
      subject: 'Máquina Soldage',
      templateData: {
        file: forgotPasswordMailTemplate,
        variables: {
          name: userExists.name,
          code: machine.code,
          description: machine.description,
        },
      },
    });

    return machine;
  }
}

export default CreateMachineService;
