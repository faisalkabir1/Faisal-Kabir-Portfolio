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

    const { passkey } = body;
    const expectedPasskey = process.env.ADMIN_PASSKEY;

    if (!expectedPasskey) {
      return res.status(500).json({ error: 'Server misconfiguration: ADMIN_PASSKEY environment variable is not set in Vercel.' });
    }

    if (passkey === expectedPasskey) {
      return res.status(200).json({ success: true, token: 'faisal-admin-auth-token-1337' });
    }

    return res.status(401).json({ error: 'Unauthorized: Invalid administrative passkey.' });
  } catch (e: any) {
    return res.status(500).json({ error: 'Failed to parse request body.' });
  }
}
