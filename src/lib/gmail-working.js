// Working Gmail configuration for Next.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function sendEmail({ to, subject, html, from, replyTo }) {
  try {
    // Create a temporary file with email data
    const tempFile = path.join(process.cwd(), 'temp', `email-${Date.now()}.json`);
    const tempDir = path.dirname(tempFile);
    
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Write email data to temp file
    fs.writeFileSync(tempFile, JSON.stringify({
      to,
      subject,
      html,
      replyTo: replyTo || 'albertokiddi1992@gmail.com'
    }));
    
    // Execute the email script with the temp file
    const scriptPath = path.join(process.cwd(), 'scripts', 'send-email-file.js');
    const result = execSync(`node "${scriptPath}" "${tempFile}"`, {
      encoding: 'utf-8',
      shell: true,
      windowsHide: true
    });
    
    // Clean up temp file
    try {
      fs.unlinkSync(tempFile);
    } catch (e) {
      // Ignore cleanup errors
    }
    
    const response = JSON.parse(result);
    
    if (response.success) {
      console.log('✅ Email sent successfully via Gmail!');
      return { success: true, data: { id: response.messageId } };
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    console.error('❌ Gmail error:', error.message);
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