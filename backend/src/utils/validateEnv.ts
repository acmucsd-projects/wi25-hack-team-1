import { z } from "zod";

const envSchema = z.object({
  MONGO_URI: z.string().url(),
  PORT: z.string().default("3000"),
});

const env = envSchema.parse(process.env);

export default env;
