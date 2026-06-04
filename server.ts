import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
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

  // JSON decoder middleware with higher file payload support (50MB)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Serve static files from the public folder
  app.use(express.static(path.join(process.cwd(), 'public')));

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

  // 4. Verify administrator passkey
  app.post('/api/admin/verify', (req, res) => {
    const { passkey } = req.body;
    const expectedPasskey = process.env.ADMIN_PASSKEY;
    
    if (expectedPasskey && passkey === expectedPasskey) {
      return res.json({ success: true, token: 'faisal-admin-auth-token-1337' });
    }
    return res.status(401).json({ error: 'Unauthorized: Invalid administrative passkey.' });
  });

  // 5. Upload image to public/images (secured with passkey check)
  app.post('/api/upload-image', (req, res) => {
    const { passkey, fileContent, fileName } = req.body;

    const expectedPasskey = process.env.ADMIN_PASSKEY;
    if (!expectedPasskey || passkey !== expectedPasskey) {
      return res.status(401).json({ error: 'Unauthorized: Invalid passkey.' });
    }

    if (!fileContent || !fileName) {
      return res.status(400).json({ error: 'Missing file content or filename.' });
    }

    try {
      // Create public/images directory if it doesn't exist
      const imagesDir = path.join(process.cwd(), 'public', 'images');
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      // Safe file generation
      const ext = path.extname(fileName) || '.png';
      const timestamp = Date.now();
      const sanitizedBaseName = fileName.replace(ext, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      const cleanFileName = `${sanitizedBaseName}_${timestamp}${ext}`;
      const targetPath = path.join(imagesDir, cleanFileName);

      // Extract Base64 data block
      const base64Data = fileContent.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFileSync(targetPath, base64Data, 'base64');

      // Also proactively save to dist/images/ and dist/public/images/ to guarantee immediate visibility across all environment states
      try {
        const distImagesDir = path.join(process.cwd(), 'dist', 'images');
        if (!fs.existsSync(distImagesDir)) {
          fs.mkdirSync(distImagesDir, { recursive: true });
        }
        fs.writeFileSync(path.join(distImagesDir, cleanFileName), base64Data, 'base64');
      } catch (e) {
        // Safe to ignore if dist directory doesn't exist yet before standard production builds
      }

      try {
        const distPublicImagesDir = path.join(process.cwd(), 'dist', 'public', 'images');
        if (!fs.existsSync(distPublicImagesDir)) {
          fs.mkdirSync(distPublicImagesDir, { recursive: true });
        }
        fs.writeFileSync(path.join(distPublicImagesDir, cleanFileName), base64Data, 'base64');
      } catch (e) {
        // Safe to ignore
      }

      const relativeUrlPath = `/images/${cleanFileName}`;
      console.log(`[API /api/upload-image] Saved image ${cleanFileName} successfully.`);
      return res.json({ success: true, imagePath: relativeUrlPath });
    } catch (err: any) {
      console.error('[API /api/upload-image] Error saving uploaded image:', err);
      return res.status(500).json({ error: `Failed to save file: ${err.message || err}` });
    }
  });

  // 6. Rewrite the portfolio database src/data.ts safely (secured with passkey check)
  app.post('/api/portfolio-data', (req, res) => {
    const { passkey, personalInfo, projects, skills, experiences, education, trainings, references, testimonials } = req.body;
    
    const expectedPasskey = process.env.ADMIN_PASSKEY || 'admin123';
    if (passkey !== expectedPasskey) {
      return res.status(401).json({ error: 'Unauthorized: Invalid administrative passkey.' });
    }

    if (!personalInfo || !projects || !skills || !experiences || !education || !trainings) {
      return res.status(400).json({ error: 'Missing required portfolio sections.' });
    }

    try {
      const dataPath = path.join(process.cwd(), 'src', 'data.ts');
      
      const formattedData = `import { Project, Skill, Experience, Testimonial } from './types';

export const personalInfo = ${JSON.stringify(personalInfo, null, 2)};

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

export const skills: Skill[] = ${JSON.stringify(skills, null, 2)};

export const experiences: Experience[] = ${JSON.stringify(experiences, null, 2)};

export const education = ${JSON.stringify(education, null, 2)};

export const trainings = ${JSON.stringify(trainings, null, 2)};

export const references = ${JSON.stringify(references, null, 2)};

export const testimonials: Testimonial[] = ${JSON.stringify(testimonials, null, 2)};
`;

      fs.writeFileSync(dataPath, formattedData, 'utf-8');
      console.log('[API /api/portfolio-data] Successfully updated src/data.ts from Admin Panel.');
      return res.json({ success: true, message: 'All portfolio sections saved, compiled, and written directly inside the codebase!' });
    } catch (err: any) {
      console.error('[API /api/portfolio-data] Error saving src/data.ts content:', err);
      return res.status(500).json({ error: `Failed to write code file: ${err.message || err}` });
    }
  });


  // Ensure uploaded images are served statically and instantly bypass Vite's router caching
  app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

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
