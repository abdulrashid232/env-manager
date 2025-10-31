import * as z from "zod";
import dotenv from "dotenv";

export function createEnvManager<T extends z.ZodSchema>(schema: T) {
  dotenv.config();

  const result = schema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment configuration:");
    console.error(result.error.format());
    throw new Error("Environment validation failed");
  }

  const config = result.data;

  return {
    get<K extends keyof z.infer<T>>(key: K): z.infer<T>[K] {
      return config[key];
    },
    getAll(): z.infer<T> {
      return config;
    },
  };
}
