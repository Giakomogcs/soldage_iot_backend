import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IstorageProvider';

import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskstorageProvider';
import S3StorageProvider from '@shared/container/providers/StorageProvider/implementations/S3StorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', uploadConfig.driver === 'disk' ? DiskStorageProvider : S3StorageProvider);
