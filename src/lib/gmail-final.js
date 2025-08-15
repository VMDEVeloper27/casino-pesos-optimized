// Final working Gmail configuration
const nodemailer = require('nodemailer');

// Create transporter once
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'albertokiddi1992@gmail.com',
    pass: 'hhzqolhuickhpqxo',
  },
});

async function sendEmail({ to, subject, html, from, replyTo }) {
  try {
    const info = await transporter.sendMail({
      from: 'CasinosPesos <albertokiddi1992@gmail.com>',
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      replyTo: replyTo || 'albertokiddi1992@gmail.com',
    });
    
    console.log('✅ Email sent successfully via Gmail!');
    console.log('Message ID:', info.messageId);
    console.log('Accepted:', info.accepted);
    
    return { success: true, data: { id: info.messageId } };
  } catch (error) {
    console.error('❌ Gmail Error:', error.message);
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