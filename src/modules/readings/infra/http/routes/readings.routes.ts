import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ReadingsController from '@modules/readings/infra/http/controllers/ReadingsController';

const readingsController = new ReadingsController();

const readingsRouter = Router();

readingsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      mac_address: Joi.string().required(),
      welding_current: Joi.number().required(),
      welding_voltage: Joi.number().required(),
      wire_speed: Joi.number().required(),
      arc_status: Joi.boolean().required(),
      currentL1: Joi.number().required(),
      currentL2: Joi.number().required(),
      currentL3: Joi.number().required(),
      voltageL1: Joi.number().required(),
      voltageL2: Joi.number().required(),
      voltageL3: Joi.number().required(),
      gas_flow: Joi.number().required(),
    },
  }),
  readingsController.create,
);

readingsRouter.get(
  '/filters',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      machine_id: Joi.string().optional(),
      begin_date: Joi.string().optional(),
      final_date: Joi.string().optional(),
    },
  }),
  readingsController.index,
);

readingsRouter.get('/client/:client_id', ensureAuthenticated, readingsController.showByClient);

readingsRouter.get('/machine/:machine_id', ensureAuthenticated, readingsController.showByMachine);

readingsRouter.get('/', ensureAuthenticated, readingsController.showAll);

export default readingsRouter;
