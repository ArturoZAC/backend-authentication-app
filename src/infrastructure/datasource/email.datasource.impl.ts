import nodemailer from "nodemailer"

import { EmailDatasource } from "../../domain/datasources/email.datasource";
import { SendEmailOptions } from "../../domain/repositories/email.repository";
import { envs } from "../../config/envs";

export class EmailDatasourceImpl implements EmailDatasource {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  public async sendEmail(options: SendEmailOptions): Promise<boolean> {
    
    const {to, subject, htmlBody, attachments = []} = options;

    try {
      await this.transporter.sendMail({
        to, subject, html:htmlBody, attachments
      })

      return true;
    } catch {
      return false;
    }

  }

}