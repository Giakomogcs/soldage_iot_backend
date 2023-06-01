import { Request, Response, NextFunction } from 'express';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import AppError from '@shared/errors/AppError';

export default async function ensureAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userRepository = new UserRepository();

    const user = await userRepository.findById(req.user.id);

    if (user?.isadmin === false) {
      throw new AppError('Usuário não é administrador', 401);
    }

    return next();
  } catch (err) {
    console.log(err);
    throw new AppError('Usuário não é administrador', 401);
  }
}
