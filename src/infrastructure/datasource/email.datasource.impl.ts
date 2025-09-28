import nodemailer from "nodemailer";

import { EmailDatasource } from "../../domain/datasources/email.datasource";
import { SendEmailOptions } from "../../domain/repositories/email.repository";
import { envs } from "../../config/envs";

export class EmailDatasourceImpl implements EmailDatasource {
  private transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  public async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        from: "Mi app 4z4c",
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log("✅ Email enviado correctamente a", to);
      return true;
    } catch (error) {
      console.error("❌ Error enviando email:", error);
      return false;
    }
  }
}
