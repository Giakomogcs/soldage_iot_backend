import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/users/infra/http/middlewares/ensureAdmin';

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.get('/', ensureAuthenticated, usersController.index);

usersRouter.get('/active', ensureAuthenticated, usersController.active);

usersRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/:user_id', ensureAuthenticated, ensureAdmin, usersController.show);

usersRouter.put(
  '/:user_id',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().optional(),
      name: Joi.string().optional(),
      inactive: Joi.boolean().required(),
    },
  }),
  usersController.update,
);

usersRouter.put(
  '/password',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      oldPassword: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  usersController.update,
);

export default usersRouter;
