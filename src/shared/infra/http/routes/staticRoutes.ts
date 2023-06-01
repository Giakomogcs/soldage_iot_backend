import { Request, Response, Router } from 'express';
import path from 'path';

export const frontEndFolder = path.join(`${process.cwd()}/frontEnd`);
const frontEndFile = path.join(`${process.cwd()}/frontEnd/index.html`);

const staticRouter = Router();

staticRouter.get('/', (req: Request, res: Response): void => {
  res.sendFile(frontEndFile);
});
staticRouter.get('/passwords*', (req: Request, res: Response): void => {
  res.sendFile(frontEndFile);
});
staticRouter.get('/dashboard*', (req: Request, res: Response): void => {
  res.sendFile(frontEndFile);
});
staticRouter.get('/users*', (req: Request, res: Response): void => {
  res.sendFile(frontEndFile);
});
staticRouter.get('/machines*', (req: Request, res: Response): void => {
  res.sendFile(frontEndFile);
});

export default staticRouter;
