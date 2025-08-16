import 'dotenv/config';
import z from 'zod';

const envsSchema = z.object({
  PORT: z.string().transform(Number),
  JWT_SEED: z.string().min(1, 'JWT_SEED is required'),
  MAILER_SERVICE: z.string().min(1, 'MAILER_SERVICE is required'),
  MAILER_EMAIL: z.string().email('MAILER_EMAIL must be a valid email'),
  MAILER_SECRET_KEY: z.string().min(1, 'MAILER_SECRET_KEY is required'),
});

export const envs = envsSchema.parse(process.env);
