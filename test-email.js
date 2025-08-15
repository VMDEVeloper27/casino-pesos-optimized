// Test script to verify email sending

async function testContactForm() {
  console.log('Testing contact form...');
  
  const response = await fetch('http://localhost:3013/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message',
      message: 'This is a test message from the test script',
      type: 'general'
    })
  });

  const data = await response.json();
  console.log('Contact form response:', data);
}

async function testNewsletter() {
  console.log('\nTesting newsletter subscription...');
  
  const response = await fetch('http://localhost:3013/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@example.com',
      firstName: 'Test'
    })
  });

  const data = await response.json();
  console.log('Newsletter response:', data);
}

// Wait for server to start
setTimeout(async () => {
  try {
    await testContactForm();
    await testNewsletter();
  } catch (error) {
    console.error('Error:', error);
  }
}, 5000);

console.log('Waiting 5 seconds for server to start...');