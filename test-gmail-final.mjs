// Test Gmail setup - ESM version
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('Testing Gmail configuration...');
console.log('User:', process.env.GMAIL_USER);
console.log('Password set:', !!process.env.GMAIL_APP_PASSWORD);

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

try {
  const info = await transporter.sendMail({
    from: `CasinosPesos <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: '✅ Test Email - CasinosPesos Gmail Working!',
    html: `
      <h1 style="color: #059669;">✅ Gmail is working!</h1>
      <p>Great! Your Gmail configuration is correct.</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <h2>What this means:</h2>
      <ul>
        <li>✅ Contact form will send confirmations to users</li>
        <li>✅ Newsletter will send welcome emails</li>
        <li>✅ Admin will receive notifications</li>
      </ul>
      <p style="color: #059669; font-weight: bold;">Everything is configured correctly!</p>
    `,
  });
  
  console.log('\n✅ SUCCESS! Email sent via Gmail');
  console.log('Message ID:', info.messageId);
  console.log('Accepted:', info.accepted);
  console.log('\n📧 CHECK YOUR INBOX:', process.env.GMAIL_USER);
  console.log('🎉 Gmail is working correctly!\n');
  
  console.log('Next steps:');
  console.log('1. Check your email inbox');
  console.log('2. Restart the server: Ctrl+C then npm run dev');
  console.log('3. Test the contact form and newsletter');
} catch (error) {
  console.error('\n❌ Error sending test email:');
  console.error('Error:', error.message);
  
  if (error.code === 'EAUTH') {
    console.error('\n⚠️ Authentication failed!');
    console.error('Possible issues:');
    console.error('1. App password is incorrect');
    console.error('2. 2FA is not enabled');
    console.error('3. Less secure app access is blocked');
    console.error('\nTry generating a new app password');
  }
}