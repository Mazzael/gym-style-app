import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333), //coerce muda o dado para o tipo que estiver subsequente, no caso, number
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid Environment Variables", _env.error.format());

  throw new Error("Invalid Environment Variables.");
}

export const env = _env.data;
