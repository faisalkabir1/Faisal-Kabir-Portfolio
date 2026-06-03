import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load variables from environment
dotenv.config();

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// In-memory submissions database
const submissionsDb: Submission[] = [
  {
    id: 'mock-1',
    name: 'Sarah Jenkins',
    email: 'sarah@prismdigital.io',
    subject: 'Technical Audit Request',
    message: 'Greetings Faisal, we love your SQA and automation test suites. We would like to contract you for a test suite audit of our main platform next month. Let us know your availability.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON decoder middleware
  app.use(express.json());

  // API endpoints
  // 1. Submit message from Contact form
  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

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

    // Store in-memory
    submissionsDb.unshift(newSubmission);

    const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'onlyfaisalkabir@gmail.com'; // Fallback configured in metadata

    console.log(`[API /api/contact] Received new message from ${name} (${email})`);

    // Implement real Resend emailing proxy
    if (RESEND_API_KEY && RESEND_API_KEY !== 'MY_RESEND_API_KEY' && RESEND_API_KEY.trim() !== '') {
      try {
        console.log(`[Email Dispatch] Attempting to route message to ${CONTACT_EMAIL} via Resend...`);
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
          console.log(`[Email Dispatch] Email successfully routed to Resend client.`);
          return res.json({ success: true, message: 'Message recorded and real email dispatched via Resend successfully!' });
        } else {
          const errText = await mailRes.text();
          console.error(`[Email Dispatch Error] Resend refused post request:`, errText);
          return res.json({ 
            success: true, 
            message: 'Recorded in Local Space, but Resend API refused delivery. Verify credentials.', 
            warning: 'Resend API key error.' 
          });
        }
      } catch (err) {
        console.error('[Email Dispatch Exception] Inability to establish connection to Resend API:', err);
        return res.json({ 
          success: true, 
          message: 'Saved in Local Memory Cabin, but Resend endpoint was unreachable.', 
          warning: 'API unreachable.' 
        });
      }
    }

    // Attempting Web3Forms fallback if client configured it in `.env`
    const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || '';
    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.trim() !== '') {
      try {
        console.log(`[Email Dispatch] Routing to Web3Forms using Access Key...`);
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
          console.log(`[Email Dispatch] Web3Forms successfully accepted message.`);
          return res.json({ success: true, message: 'Recorded in cabinet and dispatched via Web3Forms!' });
        }
      } catch (err) {
        console.error('[Email Dispatch Exception] Error routing to Web3Forms:', err);
      }
    }

    // Default simulated response when no key is configured
    console.log(`[Email Simulation] Message saved in server-side cabinet. To get real emails, configure RESEND_API_KEY or WEB3FORMS_ACCESS_KEY.`);
    return res.json({ 
      success: true, 
      message: 'Message captured. Setup credentials to activate direct email delivery.' 
    });
  });

  // 2. Fetch submissions for the developer cabinet
  app.get('/api/contact', (req, res) => {
    res.json({ submissions: submissionsDb });
  });

  // 3. Delete submission entry
  app.delete('/api/contact/:id', (req, res) => {
    const { id } = req.params;
    const index = submissionsDb.findIndex(s => s.id === id);
    if (index !== -1) {
      submissionsDb.splice(index, 1);
      return res.json({ success: true });
    }
    res.status(404).json({ error: 'Entry not found.' });
  });

  // Serve static assets or mount Vite server depending on Environment
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Fallback everything to SPA index.html in production
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Portfolio running on http://localhost:${PORT}`);
    console.log(`[Server] Submissions proxy ready at /api/contact`);
  });
}

startServer();
