import { Resend } from 'resend';

// Initialize Resend with API key
// You need to get an API key from https://resend.com
export const resend = new Resend(process.env.RESEND_API_KEY);

// Default from email
export const DEFAULT_FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL || 'noreply@casinospesos.com';

// Admin emails for notifications
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'admin@casinospesos.com').split(',');

// Email sending function with error handling
export async function sendEmail({
  to,
  subject,
  html,
  from = DEFAULT_FROM_EMAIL,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}) {
  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
      reply_to: replyTo,
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}