// Email sender with dynamic import to fix Next.js compatibility issues

async function sendEmail({ to, subject, html, from, replyTo }) {
  try {
    // Dynamic import to avoid build-time issues
    const nodemailer = await import('nodemailer');
    
    // Create transporter with Gmail - FIXED: it's createTransport not createTransporter!
    const createTransport = nodemailer.createTransport || nodemailer.default?.createTransport;
    if (!createTransport) {
      throw new Error('Unable to load nodemailer createTransport function');
    }
    
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'albertokiddi1992@gmail.com',
        pass: 'hhzqolhuickhpqxo',
      },
    });
    
    // Send email
    const info = await transporter.sendMail({
      from: 'CasinosPesos <albertokiddi1992@gmail.com>',
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      replyTo: replyTo || 'albertokiddi1992@gmail.com',
    });
    
    console.log('✅ Email sent successfully via Gmail!');
    console.log('Message ID:', info.messageId);
    console.log('To:', to);
    console.log('Subject:', subject);
    
    return { success: true, data: { id: info.messageId } };
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    return { success: false, error: error.message };
  }
}

const DEFAULT_FROM_EMAIL = 'albertokiddi1992@gmail.com';
const ADMIN_EMAILS = ['albertokiddi1992@gmail.com'];

module.exports = {
  sendEmail,
  DEFAULT_FROM_EMAIL,
  ADMIN_EMAILS
};