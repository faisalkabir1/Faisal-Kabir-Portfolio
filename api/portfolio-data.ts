import { kv } from '@vercel/kv';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET — fetch saved data (called on page load)
  if (req.method === 'GET') {
    try {
      const data = await kv.get('portfolio_data');
      return res.status(200).json({ success: true, data: data || null });
    } catch (e: any) {
      return res.status(500).json({ error: `KV read failed: ${e.message}` });
    }
  }

  // POST — save data from admin panel
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (!body || typeof body !== 'object') {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(Buffer.from(chunk));
        body = JSON.parse(Buffer.concat(chunks).toString());
      }

      const { passkey, personalInfo, projects, skills, experiences,
              education, trainings, references, testimonials } = body;

      const expectedPasskey = process.env.ADMIN_PASSKEY;
      if (!expectedPasskey || passkey !== expectedPasskey) {
        return res.status(401).json({ error: 'Unauthorized.' });
      }

      const portfolioData = {
        personalInfo, projects, skills, experiences,
        education, trainings, references, testimonials,
        lastUpdated: new Date().toISOString()
      };

      await kv.set('portfolio_data', portfolioData);

      return res.status(200).json({
        success: true,
        message: 'Portfolio data saved to KV store. Changes are live immediately!'
      });
    } catch (e: any) {
      return res.status(500).json({ error: `KV write failed: ${e.message}` });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}