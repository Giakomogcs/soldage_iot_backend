import handlebars from 'handlebars';
import fs from 'fs';

import IparseMailTemplateDTO from '@shared/container/providers/MailTemplateProviders/dtos/IparseMailTemplateDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProviders/models/IMailTemplateProvider';

class HandlebarsMailProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IparseMailTemplateDTO): Promise<string> {
    const fileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(fileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailProvider;
