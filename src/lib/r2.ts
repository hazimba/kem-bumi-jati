import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

const missingEnvVars: string[] = [];

if (!process.env.R2_ACCOUNT_ID) missingEnvVars.push("R2_ACCOUNT_ID");
if (!process.env.R2_ACCESS_KEY_ID) missingEnvVars.push("R2_ACCESS_KEY_ID");
if (!process.env.R2_SECRET_ACCESS_KEY) missingEnvVars.push("R2_SECRET_ACCESS_KEY");
if (!process.env.R2_BUCKET_NAME) missingEnvVars.push("R2_BUCKET_NAME");

if (missingEnvVars.length > 0) {
  console.error("Missing R2 environment variables:", missingEnvVars.join(", "));
}

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const R2_BUCKET = process.env.R2_BUCKET_NAME! || "kem-bumi-jati-images";
export const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "") || `https://${R2_BUCKET}.r2.cloudflarestorage.com`;

export const IMAGE_FOLDER = "kem_bumi_jati";
