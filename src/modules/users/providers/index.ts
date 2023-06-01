import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BcriptHashProvider from '@modules/users/providers/HashProvider/implementations/BcriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcriptHashProvider);
