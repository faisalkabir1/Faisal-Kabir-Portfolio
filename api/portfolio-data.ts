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

    const { passkey, personalInfo, projects, skills, experiences, education, trainings, references, testimonials } = body;

    const expectedPasskey = process.env.ADMIN_PASSKEY;
    if (!expectedPasskey || passkey !== expectedPasskey) {
      return res.status(401).json({ error: 'Unauthorized: Invalid administrative passkey.' });
    }

    if (!personalInfo || !projects || !skills || !experiences || !education || !trainings) {
      return res.status(400).json({ error: 'Missing required portfolio sections.' });
    }

    // NOTE: Vercel serverless functions run in a read-only filesystem.
    // Writing to src/data.ts is not possible at runtime on Vercel.
    // Portfolio data edits made here are acknowledged but will not persist across deployments.
    // To persist changes, update src/data.ts in your GitHub repo and redeploy.
    console.log('[API /api/portfolio-data] Admin submitted data update (read-only filesystem on Vercel — changes are ephemeral).');

    return res.status(200).json({
      success: true,
      message: 'Portfolio data received. Note: On Vercel, filesystem writes are not persistent. To permanently save changes, commit your updated src/data.ts to GitHub and redeploy.'
    });
  } catch (e: any) {
    return res.status(500).json({ error: `Request failed: ${e.message || e}` });
  }
}
