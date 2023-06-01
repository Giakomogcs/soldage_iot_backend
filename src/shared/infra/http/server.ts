import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';

import AppError from '@shared/errors/AppError';
import rateLimiter from '@shared/infra/http/middleware/rateLimiter';

import routes from './routes';
import '@shared/infra/typeorm';

import '@shared/container';
import frontEnd, { frontEndFolder } from './routes/staticRoutes';

// const port = 3333;
const port = 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static(frontEndFolder));
app.use('/app', frontEnd);

app.use(errors());
app.use(rateLimiter);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(port, () => console.log(`✔✔ server running on  ${port}!!!`));
