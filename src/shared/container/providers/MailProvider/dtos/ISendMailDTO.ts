import IparseMailTemplateDTO from '@shared/container/providers/MailTemplateProviders/dtos/IparseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface iSendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IparseMailTemplateDTO;
}
