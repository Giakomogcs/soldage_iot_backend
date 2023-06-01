import IMailTemplateProvider from '@shared/container/providers/MailTemplateProviders/models/IMailTemplateProvider';

class FakeMailProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'mail Content';
  }
}

export default FakeMailProvider;
