// Test Gmail setup
console.log('='.repeat(60));
console.log('📧 GMAIL SETUP INSTRUCTIONS');
console.log('='.repeat(60));
console.log('\n1. Enable 2-Factor Authentication:');
console.log('   👉 Go to: https://myaccount.google.com/security');
console.log('   👉 Enable "2-Step Verification"\n');

console.log('2. Generate App Password:');
console.log('   👉 Go to: https://myaccount.google.com/apppasswords');
console.log('   👉 Select "Mail" and "Other (Custom name)"');
console.log('   👉 Enter name: "CasinosPesos"');
console.log('   👉 Copy the 16-character password (without spaces)\n');

console.log('3. Update .env.local file:');
console.log('   Replace: GMAIL_APP_PASSWORD=YOUR_16_CHAR_APP_PASSWORD_HERE');
console.log('   With:    GMAIL_APP_PASSWORD=yourpasswordwithoutspaces\n');

console.log('4. After updating .env.local, run this test again:');
console.log('   node test-gmail.js\n');

console.log('='.repeat(60));

// Check if credentials are set
require('dotenv').config({ path: '.env.local' });

if (process.env.GMAIL_APP_PASSWORD && process.env.GMAIL_APP_PASSWORD !== 'YOUR_16_CHAR_APP_PASSWORD_HERE') {
  console.log('\n✅ Gmail credentials detected! Testing email...\n');
  
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  
  async function testEmail() {
    try {
      const info = await transporter.sendMail({
        from: `CasinosPesos <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: 'Test Email - CasinosPesos Gmail Setup',
        html: `
          <h1>✅ Gmail is working!</h1>
          <p>If you receive this email, your Gmail configuration is correct.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
          <hr>
          <p>Now the contact form and newsletter will send emails properly!</p>
        `,
      });
      
      console.log('✅ SUCCESS! Email sent via Gmail');
      console.log('Message ID:', info.messageId);
      console.log('\n📧 Check your inbox at:', process.env.GMAIL_USER);
      console.log('🎉 Gmail is configured correctly!\n');
      console.log('Now restart the server to use Gmail:');
      console.log('1. Press Ctrl+C to stop the server');
      console.log('2. Run: npm run dev');
    } catch (error) {
      console.error('\n❌ Error sending test email:');
      console.error(error.message);
      
      if (error.code === 'EAUTH') {
        console.error('\n⚠️ Authentication failed!');
        console.error('Check that:');
        console.error('1. 2FA is enabled in your Gmail');
        console.error('2. App password is correct (16 chars, no spaces)');
        console.error('3. The password is not expired');
      }
    }
  }
  
  testEmail();
} else {
  console.log('\n⚠️ Gmail App Password not configured yet!');
  console.log('Follow the instructions above to set it up.');
}