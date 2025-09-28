export interface SendEmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  attachments?: Array<{
    filename: string;
    path: string;
  }>;
}

export abstract class EmailRepository {
  abstract sendEmail(options: SendEmailOptions): Promise<boolean>;
}
