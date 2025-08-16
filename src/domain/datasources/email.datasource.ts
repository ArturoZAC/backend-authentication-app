import { SendEmailOptions } from "../repositories/email.repository";

export abstract class EmailDatasource {
  abstract sendEmail(options: SendEmailOptions): Promise<boolean>;
}