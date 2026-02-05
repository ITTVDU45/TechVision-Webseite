import { Client } from 'minio';

let minioClient: Client | null = null;

export function getMinioClient(): Client {
  if (minioClient) {
    return minioClient;
  }

  const endPoint = process.env.MINIO_ENDPOINT || 'localhost';
  const port = parseInt(process.env.MINIO_PORT || '9000', 10);
  const useSSL = process.env.MINIO_USE_SSL === 'true';
  const accessKey = process.env.MINIO_ACCESS_KEY || '';
  const secretKey = process.env.MINIO_SECRET_KEY || '';

  if (!accessKey || !secretKey) {
    throw new Error('MinIO credentials are not configured. Please set MINIO_ACCESS_KEY and MINIO_SECRET_KEY in your environment variables.');
  }

  minioClient = new Client({
    endPoint,
    port,
    useSSL,
    accessKey,
    secretKey,
  });

  return minioClient;
}

export async function ensureBucketExists(bucketName: string): Promise<void> {
  const client = getMinioClient();
  const exists = await client.bucketExists(bucketName);
  
  if (!exists) {
    await client.makeBucket(bucketName, 'us-east-1');
    // Set bucket policy to allow public read access
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucketName}/*`],
        },
      ],
    };
    await client.setBucketPolicy(bucketName, JSON.stringify(policy));
  }
}

export function getPublicUrl(bucketName: string, objectName: string): string {
  const endPoint = process.env.MINIO_ENDPOINT || 'localhost';
  const port = process.env.MINIO_PORT || '9000';
  const useSSL = process.env.MINIO_USE_SSL === 'true';
  const protocol = useSSL ? 'https' : 'http';
  
  // Wenn ein Public URL konfiguriert ist (z.B. für Production mit CDN/Proxy)
  if (process.env.MINIO_PUBLIC_URL) {
    return `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${objectName}`;
  }
  
  return `${protocol}://${endPoint}:${port}/${bucketName}/${objectName}`;
}
