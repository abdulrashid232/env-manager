import { createEnvManager } from "../dist/index.js";
import { z } from "zod";

const env = createEnvManager(
  z.object({
    API_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "production"]),
    PORT: z.string().regex(/^\d+$/),
  })
);

console.log("ENV Loaded Successfully:", env.getAll());
