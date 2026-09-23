import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export type StoredDocument = {
  storageKey: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  directory: string;
};

export async function storePrivateDocument(
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<StoredDocument> {
  const safeFileName = fileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const extension = path.extname(safeFileName) || '.bin';
  const storageKey = `${Date.now()}-${randomUUID()}${extension}`;
  const directory = path.join(process.cwd(), '.private-storage', 'documents');

  await mkdir(directory, { recursive: true });
  const destination = path.join(directory, storageKey);
  await writeFile(destination, buffer);

  return {
    storageKey,
    fileName: safeFileName,
    mimeType,
    sizeBytes: buffer.byteLength,
    directory: destination,
  };
}

export function validateDocumentInput(file: File | Blob, maxSizeBytes = 10 * 1024 * 1024) {
  const mimeType = file.type || 'application/octet-stream';
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

  if (!allowedTypes.includes(mimeType)) {
    throw new Error('Unsupported file type. Use PDF, JPG, JPEG, or PNG.');
  }

  if (file.size > maxSizeBytes) {
    throw new Error('File exceeds the 10MB limit.');
  }
}
