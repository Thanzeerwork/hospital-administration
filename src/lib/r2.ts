import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

// Cloudflare R2 Credentials & Endpoint
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID || 'd6e0e618a594c39ee7bf96cd59297564';
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '3715c98506877f6f59b49886488c1240';
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '6bf1ddd84720b5923ba041865536533593c08196d9ff137d872df2e8a4a8c8e1';
export const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET || 'hospitaladministration';
export const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export function getR2PublicUrl(key: string): string {
  const cleanKey = key.startsWith('/') ? key.slice(1) : key;
  return `${R2_PUBLIC_URL}/${cleanKey}`;
}

export async function uploadToR2({
  buffer,
  key,
  contentType,
}: {
  buffer: Buffer;
  key: string;
  contentType: string;
}): Promise<string> {
  const cleanKey = key.startsWith('/') ? key.slice(1) : key;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: cleanKey,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return getR2PublicUrl(cleanKey);
}

export async function deleteFromR2(key: string): Promise<boolean> {
  const cleanKey = key.startsWith('/') ? key.slice(1) : key;
  try {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET,
        Key: cleanKey,
      })
    );
    return true;
  } catch (err) {
    console.error('Failed to delete object from R2:', err);
    return false;
  }
}

