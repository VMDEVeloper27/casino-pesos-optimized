// Test Gmail through API endpoints

console.log('Waiting for server to start (10 seconds)...');

setTimeout(async () => {
  console.log('\n📧 Testing Contact Form with Gmail...');
  
  try {
    const response = await fetch('http://localhost:3013/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Alberto',
        email: 'albertokiddi1992@gmail.com',
        subject: 'Test Gmail Integration',
        message: 'This is a test message sent via Gmail SMTP. If you receive this, Gmail is working correctly!',
        type: 'general'
      })
    });

    const data = await response.json();
    console.log('API Response:', data);
    
    if (data.success) {
      console.log('\n✅ SUCCESS! Check your email for:');
      console.log('1. Admin notification (as admin)');
      console.log('2. User confirmation (as sender)');
      console.log('\n📧 Email: albertokiddi1992@gmail.com');
      console.log('📂 Also check SPAM folder if not in inbox');
    } else {
      console.log('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Failed to connect to server:', error.message);
    console.log('Make sure the server is running on port 3013');
  }
}, 10000);