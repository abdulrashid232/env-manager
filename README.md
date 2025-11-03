# env-manager

A lightweight, type-safe **environment variable manager** for Node.js and JavaScript projects. Provides **runtime validation** and **TypeScript type inference** powered by [Zod](https://github.com/colinhacks/zod).

---

## 🚀 Features

✅ **Type-safe** - Full TypeScript support with automatic type inference  
✅ **Runtime validation** - Validates environment variables against a Zod schema  
✅ **Automatic `.env` loading** - Automatically loads environment variables via `dotenv`  
✅ **Error reporting** - Detailed error messages for invalid configurations  
✅ **Zero complications** - Simple, focused API  

---

## 📦 Installation

```bash
npm install @tek-env
```

---

## ⚙️ Quick Start

### 1️⃣ Define your environment schema

Create an `env.ts` file:

```typescript
import { createEnvManager } from "@tek-env";
import { z } from "zod";

export const env = createEnvManager(
  z.object({
    API_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.string().regex(/^\d+$/).default("3000"),
    DEBUG: z.string().optional(),
  })
);
```

### 2️⃣ Use in your application

```typescript
import { env } from "./env";

// Get a single variable (type-safe)
const apiUrl = env.get("API_URL");
const port = env.get("PORT");

// Get all validated variables
const config = env.getAll();
console.log(config);
```

---

## 📘 API Reference

### `createEnvManager(schema: ZodSchema)`

Creates a type-safe environment manager instance.

**Parameters:**
- `schema` - A Zod schema object defining your environment variables

**Returns:** An object with the following methods:

#### `get<K extends keyof T>(key: K): T[K]`

Retrieves a single environment variable with full type safety.

```typescript
const apiUrl = env.get("API_URL"); // TypeScript knows this is a string
const port = env.get("PORT");      // TypeScript knows this is a string
```

#### `getAll(): T`

Returns all validated environment variables as a typed object.

```typescript
const allEnv = env.getAll();
// allEnv has proper typing based on your schema
```

---

## 🔐 Error Handling

If your `.env` file is missing required variables or they don't match the schema, an error is thrown with details:

```
Error: Environment validation failed
```

Before the error, you'll see detailed validation output:

```
Invalid environment configuration:
{
  API_URL: { _errors: [ 'Invalid url' ] },
  PORT: { _errors: [ 'String must match /^\d+$/' ] }
}
```

---

## 📝 Example `.env` file

```env
API_URL=https://api.example.com
NODE_ENV=production
PORT=8080
DEBUG=true
```

---


## 🎯 Use Cases

- **Express.js** - Validate server config on startup
- **NestJS** - Type-safe configuration modules
- **CLI Tools** - Environment-based configuration
- **Lambda/Serverless** - Runtime environment validation
- **Any Node.js app** - Reliable configuration management

---

## 💡 Why use this?

**Traditional approach:**
```typescript
const apiUrl = process.env.API_URL;           // string | undefined
const port = parseInt(process.env.PORT || ""); // Could be NaN
```

**With env-manager:**
```typescript
const apiUrl = env.get("API_URL");  // string (type-safe, validated)
const port = env.get("PORT");       // string (validated format)
```

---

## 📄 License

MIT

---

## 👨‍💻 Author

Built by [Abdul-Rashid](https://github.com/abdulrashid232)
