import { container } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProviders/models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from '@shared/container/providers/MailTemplateProviders/implementations/HandleBarsMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandleBarsMailTemplateProvider);
