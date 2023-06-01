import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes';
import machinesRouter from '@modules/machines/infra/http/routes/machines.routes';
import readingsRouter from '@modules/readings/infra/http/routes/readings.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/machines', machinesRouter);
routes.use('/readings', readingsRouter);
routes.use('/passwords', passwordsRouter);

routes.get('/hello', (req, res) => {
  return res.send('hello from  api!!');
});

export default routes;
