import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import MachinesController from '@modules/machines/infra/http/controllers/MachinesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/users/infra/http/middlewares/ensureAdmin';

const machinesController = new MachinesController();
const machinesRouter = Router();

machinesRouter.get('/', ensureAuthenticated, machinesController.index);

machinesRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string().required(),
      code: Joi.string().required(),
      description: Joi.string().required(),
      mac_address: Joi.string().required(),
    },
  }),
  machinesController.create,
);

machinesRouter.get('/:machine_id', ensureAuthenticated, machinesController.show);

machinesRouter.get('/client/:client_id', ensureAuthenticated, machinesController.showByClient);

machinesRouter.put(
  '/:machine_id',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string().optional(),
      code: Joi.string().optional(),
      description: Joi.string().optional(),
      mac_address: Joi.string().optional(),
    },
  }),

  machinesController.update,
);

export default machinesRouter;
