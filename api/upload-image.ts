export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    let body = req.body;
    if (!body || typeof body !== 'object') {
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(Buffer.from(chunk));
      body = JSON.parse(Buffer.concat(chunks).toString());
    }

    const { passkey, fileContent, fileName } = body;

    const expectedPasskey = process.env.ADMIN_PASSKEY;
    if (!expectedPasskey || passkey !== expectedPasskey) {
      return res.status(401).json({ error: 'Unauthorized: Invalid passkey.' });
    }

    if (!fileContent || !fileName) {
      return res.status(400).json({ error: 'Missing file content or filename.' });
    }

    // NOTE: Vercel serverless functions run in a read-only filesystem.
    // Image uploads cannot be saved to disk on Vercel.
    // For persistent image hosting, integrate with Cloudinary, Vercel Blob, or similar.
    console.log(`[API /api/upload-image] Upload attempted for ${fileName} (read-only filesystem on Vercel).`);

    return res.status(200).json({
      success: false,
      error: 'Image uploads are not supported on Vercel\'s read-only filesystem. Please use Cloudinary or Vercel Blob Storage for image hosting, or commit images directly to your /public/images folder in your GitHub repository.'
    });
  } catch (e: any) {
    return res.status(500).json({ error: `Request failed: ${e.message || e}` });
  }
}
