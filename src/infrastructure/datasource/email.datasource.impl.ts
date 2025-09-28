import nodemailer from "nodemailer";

import { EmailDatasource } from "../../domain/datasources/email.datasource";
import { SendEmailOptions } from "../../domain/repositories/email.repository";
import { envs } from "../../config/envs";

export class EmailDatasourceImpl implements EmailDatasource {
  // private transporter = nodemailer.createTransport({
  //   service: envs.MAILER_SERVICE,
  //   auth: {
  //     user: envs.MAILER_EMAIL,
  //     pass: envs.MAILER_SECRET_KEY,
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  public async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": envs.MAILER_SECRET_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Mi app 4z4c", email: envs.MAILER_EMAIL },
          to: [{ email: to }],
          subject,
          htmlContent: htmlBody,
        }),
      });

      if (!response.ok) {
        throw new Error(`Brevo error: ${response.statusText}`);
      }

      console.log(`✅ Email enviado correctamente a ${to}`);
      return true;
    } catch (error) {
      console.error("❌ Error enviando email:", error);
      return false;
    }
  }
}
