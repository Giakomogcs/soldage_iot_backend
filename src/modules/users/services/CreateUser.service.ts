import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const isEmailUsed = await this.userRepository.findByEmail(email);
    if (isEmailUsed) {
      throw new AppError('E-mail já está em uso');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const emailLowercaseWithoutSpaces = email.trim().toLowerCase();

    const user = await this.userRepository.create({
      name,
      email: emailLowercaseWithoutSpaces,
      password: hashedPassword,
    });

    const forgotPasswordMailTemplate = path.resolve(__dirname, '..', 'views', 'createUser.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Bem vindo ao nosso sistema',
      templateData: {
        file: forgotPasswordMailTemplate,
        variables: {
          name: user.name,
          email: user.email,
          password,
        },
      },
    });

    return user;
  }
}

export default CreateUserService;
