// Test script to verify user confirmation emails

async function testContactForm() {
  console.log('Testing contact form with user confirmation...');
  
  const response = await fetch('http://localhost:3013/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Alberto Test',
      email: 'albertokiddi1992@gmail.com', // Your real email to test
      subject: 'Prueba de confirmación',
      message: 'Este es un mensaje de prueba para verificar que llegan los emails de confirmación al usuario',
      type: 'general'
    })
  });

  const data = await response.json();
  console.log('Contact form response:', data);
  console.log('Check your email for:');
  console.log('1. Admin notification about new contact');
  console.log('2. User confirmation that message was received');
}

async function testNewsletter() {
  console.log('\nTesting newsletter with welcome email...');
  
  // Use a unique email to avoid "already subscribed" error
  const uniqueEmail = `test${Date.now()}@example.com`;
  
  const response = await fetch('http://localhost:3013/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'albertokiddi1992@gmail.com', // Your real email to test
      firstName: 'Alberto'
    })
  });

  const data = await response.json();
  console.log('Newsletter response:', data);
  if (data.success) {
    console.log('Check your email for welcome message with unsubscribe link');
  }
}

// Run tests
(async () => {
  try {
    await testContactForm();
    console.log('\n' + '='.repeat(50) + '\n');
    await testNewsletter();
    
    console.log('\n' + '='.repeat(50));
    console.log('IMPORTANT: Check your email inbox AND spam folder!');
    console.log('You should receive:');
    console.log('- 2 emails for contact form (admin notification + user confirmation)');
    console.log('- 1 welcome email for newsletter subscription');
    console.log('='.repeat(50));
  } catch (error) {
    console.error('Error:', error);
  }
})();