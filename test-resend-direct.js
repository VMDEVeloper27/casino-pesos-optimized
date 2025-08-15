// Direct test of Resend API
const { Resend } = require('resend');

const resend = new Resend('re_TPxHWcrj_McQLpV2NKNo8sPb546MMsvKs');

async function testResendDirectly() {
  console.log('Testing Resend API directly...');
  console.log('API Key:', 're_TPxHWcrj_McQLpV2NKNo8sPb546MMsvKs');
  console.log('Sending to: albertokiddi1992@gmail.com');
  console.log('From: onboarding@resend.dev');
  
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'albertokiddi1992@gmail.com',
      subject: 'Test Email from CasinosPesos',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify Resend is working.</p>
        <p>If you receive this, the email system is working!</p>
        <p>Time: ${new Date().toISOString()}</p>
      `
    });
    
    console.log('\n✅ SUCCESS! Email sent:');
    console.log('Response:', data);
    console.log('\n📧 Check your email at: albertokiddi1992@gmail.com');
    console.log('📂 Also check SPAM folder!');
    
    if (data.id) {
      console.log('\n🔗 View email status at:');
      console.log(`https://resend.com/emails/${data.id}`);
    }
  } catch (error) {
    console.error('\n❌ ERROR sending email:');
    console.error('Error details:', error);
    
    if (error.message?.includes('401')) {
      console.error('\n⚠️ API Key is invalid or expired!');
      console.error('Get a new key at: https://resend.com/api-keys');
    } else if (error.message?.includes('429')) {
      console.error('\n⚠️ Rate limit exceeded!');
      console.error('Free plan allows 100 emails/month, 2 emails/second');
    } else if (error.message?.includes('403')) {
      console.error('\n⚠️ Permission denied!');
      console.error('Make sure your API key has permission to send emails');
    }
  }
}

testResendDirectly();