import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface Request {
  user_id: string;
  name?: string;
  email?: string;
  inactive?: boolean;
  password?: string;
  oldPassword?: string;
}

@injectable()
class UpdateUser {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, name, email, inactive, oldPassword, password }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    if (email) {
      const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
        throw new AppError('Email já está em uso');
      }

      user.email = email;
    }

    if (password && !oldPassword) {
      throw new AppError('É necessário informar a senha antiga para alterar para uma senha nova');
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(oldPassword, user.password);
      if (!checkOldPassword) {
        throw new AppError('Senha antiga incorreta');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (name) user.name = name;

    if (inactive !== undefined) user.inactive = inactive;

    return this.userRepository.save(user);
  }
}

export default UpdateUser;
