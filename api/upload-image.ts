import { put } from '@vercel/blob';
import path from 'path';

export const config = {
  api: { bodyParser: { sizeLimit: '50mb' } }
};

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  try {
    let body = req.body;
    if (!body || typeof body !== 'object') {
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(Buffer.from(chunk));
      body = JSON.parse(Buffer.concat(chunks).toString());
    }

    const { passkey, fileContent, fileName } = body;

    // Auth check
    const expectedPasskey = process.env.ADMIN_PASSKEY;
    if (!expectedPasskey || passkey !== expectedPasskey) {
      return res.status(401).json({ error: 'Unauthorized: Invalid passkey.' });
    }

    if (!fileContent || !fileName) {
      return res.status(400).json({ error: 'Missing file content or filename.' });
    }

    // Convert base64 to Buffer
    const base64Data = fileContent.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate a clean unique filename
    const ext = path.extname(fileName) || '.png';
    const base = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const cleanFileName = `portfolio-images/${base}_${Date.now()}${ext}`;

    // Upload to Vercel Blob
    const blob = await put(cleanFileName, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log(`[Blob Upload] Uploaded: ${blob.url}`);

    return res.status(200).json({
      success: true,
      imagePath: blob.url   // This is a full public URL like https://xxxx.public.blob.vercel-storage.com/...
    });

  } catch (e: any) {
    console.error('[Blob Upload Error]', e);
    return res.status(500).json({ error: `Upload failed: ${e.message || e}` });
  }
}