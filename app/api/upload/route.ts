import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validierung: Nur Bilder erlauben
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Maximal 10MB
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Prüfe ob MinIO konfiguriert ist
    const useMinIO = process.env.MINIO_ENDPOINT && process.env.MINIO_ACCESS_KEY && process.env.MINIO_SECRET_KEY;

    if (useMinIO) {
      // MinIO-Modus
      try {
        const { getMinioClient, ensureBucketExists, getPublicUrl } = await import('@/lib/minio');
        const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'techvision-uploads';

        // Generiere eindeutigen Dateinamen
        const fileExtension = extname(file.name);
        const fileName = `${uuidv4()}${fileExtension}`;
        const objectName = `uploads/${fileName}`;

        // Stelle sicher, dass der Bucket existiert
        await ensureBucketExists(BUCKET_NAME);

        // Upload zu MinIO
        const client = getMinioClient();
        await client.putObject(BUCKET_NAME, objectName, buffer, buffer.length, {
          'Content-Type': file.type,
        });

        // Generiere öffentliche URL
        const url = getPublicUrl(BUCKET_NAME, objectName);

        return NextResponse.json({ url, filename: fileName });
      } catch (error) {
        console.error('MinIO upload error:', error);
        // Fallback auf lokales Dateisystem
      }
    }

    // Fallback: Lokales Dateisystem
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Ordner existiert bereits
    }

    // Generiere eindeutigen Dateinamen
    const fileExtension = extname(file.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filepath = join(uploadsDir, fileName);

    await writeFile(filepath, buffer);

    const url = `/uploads/${fileName}`;

    return NextResponse.json({ url, filename: fileName });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
