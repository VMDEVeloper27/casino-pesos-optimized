// Alternative email configuration using Gmail SMTP
// To use this, you need to:
// 1. Enable 2-factor authentication in your Gmail account
// 2. Generate an App Password: https://myaccount.google.com/apppasswords
// 3. Add these to .env.local:
//    GMAIL_USER=your-email@gmail.com
//    GMAIL_APP_PASSWORD=your-app-password

import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmailViaGmail({
  to,
  subject,
  html,
  from,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: from || process.env.GMAIL_USER,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
    });
    
    console.log('Email sent via Gmail:', info.messageId);
    return { success: true, data: info };
  } catch (error) {
    console.error('Error sending email via Gmail:', error);
    return { success: false, error };
  }
}