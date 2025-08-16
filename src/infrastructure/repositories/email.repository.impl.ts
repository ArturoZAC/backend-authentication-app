import { EmailDatasource } from "../../domain/datasources/email.datasource";
import { EmailRepository, SendEmailOptions } from "../../domain/repositories/email.repository";

export class EmailRepositoryImpl implements EmailRepository{

  public constructor(
    private readonly emailDatasource: EmailDatasource
  ){}

  public async sendEmail(options: SendEmailOptions): Promise<boolean> {
    return this.emailDatasource.sendEmail(options);
  }

}