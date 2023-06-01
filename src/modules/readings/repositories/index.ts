import { container } from 'tsyringe';

import IReadingRepository from '@modules/readings/repositories/IReadingRepository';
import ReadingRepository from '@modules/readings/infra/typeorm/repositories/ReadingRepository';

container.registerSingleton<IReadingRepository>('ReadingsRepository', ReadingRepository);
