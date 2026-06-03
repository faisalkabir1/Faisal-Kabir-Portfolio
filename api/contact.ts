import { IncomingMessage, ServerResponse } from 'http';

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// In-memory array for the lifetime of the serverless function execution instance
const submissionsDb: Submission[] = [
  {
    id: 'mock-1',
    name: 'Sarah Jenkins',
    email: 'sarah@prismdigital.io',
    subject: 'Technical Audit Request',
    message: 'Greetings Faisal, we love your SQA and automation test suites. We would like to contract you for a test suite audit of our main platform next month. Let us know your availability.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

// Helper to read the request body stream as JSON
const getBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = req.url || '';
  const method = req.method || 'GET';

  // Handle DELETE request: check if the URL ends with an ID (e.g. /api/contact/mock-1)
  if (method === 'DELETE') {
    const urlParts = url.split('?')[0].split('/');
    const lastPart = urlParts[urlParts.length - 1];
    
    if (lastPart && lastPart !== 'contact') {
      const index = submissionsDb.findIndex(s => s.id === lastPart);
      if (index !== -1) {
        submissionsDb.splice(index, 1);
        return res.status(200).json({ success: true });
      }
      return res.status(404).json({ error: 'Entry not found.' });
    }
    return res.status(400).json({ error: 'ID is required for deletion.' });
  }

  // Handle POST request (Form Submission)
  if (method === 'POST') {
    try {
      const body = await getBody(req);
      const { name, email, subject, message } = body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Please supply all required form fields.' });
      }

      const newSubmission: Submission = {
        id: `sub-${Math.random().toString(36).substring(2, 9)}`,
        name: String(name).trim(),
        email: String(email).trim(),
        subject: String(subject).trim(),
        message: String(message).trim(),
        timestamp: new Date().toISOString()
      };

      // Add to current execution instance memory
      submissionsDb.unshift(newSubmission);

      const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
      const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'onlyfaisalkabir@gmail.com';

      // 1. Send via Resend
      if (RESEND_API_KEY && RESEND_API_KEY !== 'MY_RESEND_API_KEY' && RESEND_API_KEY.trim() !== '') {
        try {
          const emailBody = {
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: CONTACT_EMAIL,
            subject: `Portfolio Message from ${name}: ${subject}`,
            html: `
              <div style="font-family: sans-serif; padding: 24px; color: #18181b; background-color: #fafafa; border-radius: 12px; border: 1px solid #e4e4e7; max-width: 600px; margin: 0 auto;">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 16px; border-bottom: 1px solid #e4e4e7; padding-bottom: 12px;">New Contact Submission</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 6px 0; font-size: 12px; color: #71717a; font-family: monospace; width: 120px;">SENDER NAME:</td>
                    <td style="padding: 6px 0; font-size: 13px; font-weight: bold;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 12px; color: #71717a; font-family: monospace;">SENDER EMAIL:</td>
                    <td style="padding: 6px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #181c24;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 12px; color: #71717a; font-family: monospace;">SUBJECT LINE:</td>
                    <td style="padding: 6px 0; font-size: 13px; font-weight: bold;">${subject}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 12px; color: #71717a; font-family: monospace;">TIMESTAMP:</td>
                    <td style="padding: 6px 0; font-size: 13px; color: #71717a;">${new Date().toLocaleString()}</td>
                  </tr>
                </table>
                <div style="background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px; padding: 16px; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">
${message}
                </div>
              </div>
            `
          };

          const mailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailBody)
          });

          if (mailRes.ok) {
            return res.status(200).json({ success: true, message: 'Message recorded and real email dispatched via Resend successfully!' });
          } else {
            const errText = await mailRes.text();
            console.error(`[Resend Error]`, errText);
            return res.status(200).json({ 
              success: true, 
              message: 'Recorded in memory, but Resend API refused delivery. Verify credentials.', 
              warning: 'Resend API key error.' 
            });
          }
        } catch (err) {
          console.error('[Resend Exception]', err);
          return res.status(200).json({ 
            success: true, 
            message: 'Saved in memory, but Resend endpoint was unreachable.', 
            warning: 'API unreachable.' 
          });
        }
      }

      // 2. Fallback to Web3Forms
      const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || '';
      if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.trim() !== '') {
        try {
          const wpRes = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              access_key: WEB3FORMS_ACCESS_KEY,
              from_name: 'Portfolio Contact Form',
              subject: `Portfolio Message: ${subject}`,
              name,
              email,
              message
            })
          });

          if (wpRes.ok) {
            return res.status(200).json({ success: true, message: 'Recorded inside cabinet and dispatched via Web3Forms!' });
          }
        } catch (err) {
          console.error('[Web3Forms Exception]', err);
        }
      }

      // 3. Fallback simulation
      return res.status(200).json({ 
        success: true, 
        message: 'Message captured. Setup credentials in Vercel environment to activate direct email delivery.' 
      });

    } catch (e: any) {
      return res.status(500).json({ error: 'Inability to parse payload or processing issue.' });
    }
  }

  // Handle GET request (Fetch Submissions)
  if (method === 'GET') {
    return res.status(200).json({ submissions: submissionsDb });
  }

  // Not Supported methods
  return res.status(405).json({ error: 'Method not supported.' });
}
