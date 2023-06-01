import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUser.service';
import ShowAllUsers from '@modules/users/services/ShowAllUsers.service';
import ShowAllActiveUsers from '@modules/users/services/ShowAllActiveUsers.service';
import UpdateUserService from '@modules/users/services/UpdateUser.service';
import ShowUserService from '@modules/users/services/ShowUser.service';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      password,
      email,
    });

    return res.json(classToClass(user));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const showAllUsers = container.resolve(ShowAllUsers);

    const users = await showAllUsers.execute();

    return res.json(classToClass(users));
  }

  public async active(req: Request, res: Response): Promise<Response> {
    const showAllActiveUsers = container.resolve(ShowAllActiveUsers);

    const users = await showAllActiveUsers.execute();

    return res.json(classToClass(users));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ user_id });

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { name, email, inactive, password, oldPassword } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({ user_id, name, password, email, inactive, oldPassword });

    return res.json(classToClass(user));
  }
}
