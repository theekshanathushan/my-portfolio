// api/contact.js - Vercel Serverless Function
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { name, email, subject, message, botField } = req.body || {};

  // Spam protection: if honeypot botField is filled out, silently discard
  if (botField) {
    return res.status(200).json({ success: true, message: 'Message received.' });
  }

  // Input validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter a valid name (at least 2 characters).' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Please write a message of at least 10 characters.' });
  }

  const sanitizedSubject = (subject && typeof subject === 'string') 
    ? subject.trim() 
    : 'New Portfolio Inquiry';

  // 1. Resend API integration (Recommended for Vercel)
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'theekshanathushan89@gmail.com';

  if (resendApiKey) {
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `Portfolio Contact <${fromEmail}>`,
          to: [toEmail],
          reply_to: email.trim(),
          subject: `[Recruiter / Opportunity] ${sanitizedSubject} - ${name.trim()}`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${sanitizedSubject}\n\nMessage:\n${message.trim()}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #00f2fe; padding-bottom: 8px;">
                New Recruiter / Collaboration Message
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 13px; width: 80px;"><strong>Name:</strong></td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a;">${name.trim()}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 13px;"><strong>Email:</strong></td>
                  <td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${email.trim()}" style="color: #0284c7; text-decoration: none;">${email.trim()}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 13px;"><strong>Subject:</strong></td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a;">${sanitizedSubject}</td>
                </tr>
              </table>
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Message:</h4>
                <p style="margin: 0; font-size: 14px; white-space: pre-wrap; color: #1e293b;">${message.trim()}</p>
              </div>
              <p style="font-size: 11px; color: #94a3b8; margin-top: 20px; text-align: center;">Sent directly via theekshanathushan.dev contact form</p>
            </div>
          `
        })
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.json().catch(() => ({}));
        console.error('Resend API error:', errorData);
        return res.status(resendRes.status).json({ 
          error: errorData.message || 'Failed to deliver message via email provider.' 
        });
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Your message was delivered successfully.' 
      });
    } catch (err) {
      console.error('Server exception during email dispatch:', err);
      return res.status(500).json({ error: 'Internal server error processing message.' });
    }
  }

  // 2. Formspree fallback if FORMSPREE_ENDPOINT is configured on Vercel
  const formspreeUrl = process.env.FORMSPREE_ENDPOINT;
  if (formspreeUrl) {
    try {
      const fRes = await fetch(formspreeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, subject: sanitizedSubject, message })
      });
      if (fRes.ok) {
        return res.status(200).json({ success: true, message: 'Delivered via Formspree.' });
      }
    } catch (err) {
      console.error('Formspree dispatch error:', err);
    }
  }

  // 3. Fallback when running without external mail API key bound
  return res.status(200).json({ 
    success: true, 
    message: 'Message received! (Configure RESEND_API_KEY in Vercel to activate live email delivery).' 
  });
}
