import IparseMailTemplateDTO from '@shared/container/providers/MailTemplateProviders/dtos/IparseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IparseMailTemplateDTO): Promise<string>;
}
