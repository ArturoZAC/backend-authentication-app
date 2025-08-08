import 'dotenv/config';
import z from 'zod';

const envsSchema = z.object({
  PORT: z.string().transform(Number),
})

export const envs = envsSchema.parse(process.env);
