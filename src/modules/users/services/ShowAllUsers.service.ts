import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

@injectable()
class ShowAllUsers {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const users = await this.userRepository.findAllUsers();

    return users;
  }
}

export default ShowAllUsers;
