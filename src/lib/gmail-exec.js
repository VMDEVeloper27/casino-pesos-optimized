// Gmail sender using external script execution
const { execSync } = require('child_process');
const path = require('path');

async function sendEmail({ to, subject, html, from, replyTo }) {
  try {
    const emailData = {
      to,
      subject,
      html,
      replyTo: replyTo || 'albertokiddi1992@gmail.com'
    };
    
    const scriptPath = path.join(process.cwd(), 'scripts', 'send-email.js');
    const result = execSync(`node "${scriptPath}" '${JSON.stringify(emailData)}'`, {
      encoding: 'utf-8'
    });
    
    const response = JSON.parse(result);
    
    if (response.success) {
      console.log('✅ Email sent via Gmail script!');
      return { success: true, data: { id: response.messageId } };
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    console.error('❌ Gmail exec error:', error.message);
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