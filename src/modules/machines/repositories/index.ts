import { container } from 'tsyringe';

import IMachineRepository from '@modules/machines/repositories/IMachineRepository';
import MachineRepository from '@modules/machines/infra/typeorm/repositories/MachineRepository';

container.registerSingleton<IMachineRepository>('MachineRepository', MachineRepository);
