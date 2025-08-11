import 'dotenv/config';
import z from 'zod';

const envsSchema = z.object({
  PORT: z.string().transform(Number),
  JWT_SEED: z.string('JWT_SEED is required'),
})

export const envs = envsSchema.parse(process.env);
