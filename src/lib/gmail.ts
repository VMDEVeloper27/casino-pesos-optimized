// Gmail email configuration using CommonJS require
const nodemailer = require('nodemailer');

// Create Gmail transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Export the same interface as Resend for compatibility
export async function sendEmail({
  to,
  subject,
  html,
  from,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}) {
  try {
    // Gmail will always send from the authenticated account
    const fromEmail = process.env.GMAIL_USER || 'albertokiddi1992@gmail.com';
    
    const info = await transporter.sendMail({
      from: `CasinosPesos <${fromEmail}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      replyTo: replyTo || fromEmail,
    });
    
    console.log('✅ Email sent via Gmail:', info.messageId);
    console.log('Accepted:', info.accepted);
    
    return { success: true, data: { id: info.messageId } };
  } catch (error: any) {
    console.error('❌ Error sending email via Gmail:', error);
    
    if (error.code === 'EAUTH') {
      console.error('Authentication failed! Check your Gmail credentials:');
      console.error('- GMAIL_USER:', process.env.GMAIL_USER);
      console.error('- GMAIL_APP_PASSWORD is set:', !!process.env.GMAIL_APP_PASSWORD);
      console.error('Make sure you have 2FA enabled and use an App Password');
    }
    
    return { success: false, error };
  }
}

// Keep the same exports for compatibility
export const DEFAULT_FROM_EMAIL = process.env.GMAIL_USER || 'albertokiddi1992@gmail.com';
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'albertokiddi1992@gmail.com').split(',');