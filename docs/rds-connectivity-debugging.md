# RDS Connectivity Debugging & Prisma Guide

## 1. Diagnosis: Possible Causes of Authentication Failure

When Lambda fails to authenticate to the RDS Postgres instance with the error:

```
PrismaClientInitializationError: error: FATAL: password authentication failed for user "impulse_app"
```

there are several potential root causes:

1. **Secrets / Environment Variable Misconfiguration**

   * The stored secret in AWS Secrets Manager may not match the actual database credentials (e.g., wrong username, stale password, typo in secret key).
   * If using environment variables, the Lambda may be reading the wrong secret ARN or variable name, causing it to attempt authentication with invalid credentials.

2. **Password Rotation or Stale Credentials**

   * RDS supports password rotation through Secrets Manager. If a rotation occurred but the Lambda still uses an older Prisma client environment or cached secret, authentication will fail.
   * If rotation is configured but Lambda doesn’t refresh its connection settings on cold start, credentials may be out of sync.

3. **(Additional suspects worth checking)**

   * Networking/security group restrictions: Lambda may not be in the correct VPC/subnet or allowed security group to reach RDS.
   * Case sensitivity in Postgres usernames (`impulse_app` vs `Impulse_App`).

---

## 2. Correct Way to Connect Prisma (Lambda → RDS)

When deploying Prisma with Lambda in AWS, follow these practices to ensure reliable and secure connections:

### a. Use AWS Secrets Manager for Credentials

* Store the database username, password, and connection string in **Secrets Manager**.
* Configure Lambda with permission (`secretsmanager:GetSecretValue`) to retrieve the secret at runtime.
* Example (Node.js):

```ts
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region: "us-east-1" });
const secret = await client.send(
  new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ARN })
);
const { username, password, host, port, dbname } = JSON.parse(secret.SecretString!);

process.env.DATABASE_URL = `postgresql://${username}:${password}@${host}:${port}/${dbname}?schema=public`;
```

### b. Use RDS Proxy (Recommended for Lambda)

* Lambda functions are ephemeral and may open many short-lived connections. This can quickly exhaust RDS connection limits.
* **RDS Proxy** pools and reuses connections, improving performance and stability.
* Configure RDS Proxy with Secrets Manager to manage credentials, and point your Lambda to the proxy endpoint instead of the raw RDS endpoint.

### c. (Optional but Strongly Recommended) IAM Database Authentication

* Instead of static passwords, enable **IAM authentication** on the RDS instance.
* Lambda’s execution role can be granted `rds-db:connect` permissions.
* At runtime, Lambda generates an **IAM auth token** and uses it as the password when connecting via Prisma.
* This eliminates long-lived secrets.

---

## 3. Example Setup: Prisma Schema + `.env`

### `.env`

When using RDS Proxy + Secrets Manager (with a rotated static password):

```env
# Loaded at runtime after fetching from Secrets Manager
DATABASE_URL="postgresql://impulse_app:REPLACED_BY_SECRET@<rds-proxy-endpoint>:5432/impulse_db?schema=public"
```

If using **IAM auth tokens** (short-lived, generated at runtime):

```env
DATABASE_URL="postgresql://impulse_app:AWS_IAM_TOKEN@<rds-proxy-endpoint>:5432/impulse_db?schema=public&sslmode=require"
```

Where `AWS_IAM_TOKEN` is injected programmatically in Lambda.

---

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

---

### Lambda Runtime Code Snippet

```ts
import { PrismaClient } from '@prisma/client';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

let prisma: PrismaClient | null = null;

async function getPrisma() {
  if (!prisma) {
    // Load secrets from AWS
    const client = new SecretsManagerClient({ region: "us-east-1" });
    const secret = await client.send(
      new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ARN })
    );
    const { username, password, host, port, dbname } = JSON.parse(secret.SecretString!);

    process.env.DATABASE_URL = `postgresql://${username}:${password}@${host}:${port}/${dbname}?schema=public`;

    prisma = new PrismaClient();
  }
  return prisma;
}

export const handler = async () => {
  const db = await getPrisma();
  const users = await db.user.findMany();
  return { users };
};
```

---

## 4. Bonus: Hardening Recommendation

* **Rotate Secrets / Use IAM Authentication**

  * If using Secrets Manager, enable **automatic rotation** and ensure Lambda refreshes secrets instead of relying on cached values.
  * Ideally, migrate to **IAM role–based authentication** for RDS, eliminating stored passwords entirely. This ensures short-lived, cryptographically signed tokens.

* **Additional Security**

  * Limit the RDS user (`impulse_app`) to least privileges.
  * Restrict the RDS security group to only the Lambda’s VPC subnets.
