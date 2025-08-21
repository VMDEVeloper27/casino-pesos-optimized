const fs = require('fs');
const path = require('path');

// Test email notification system
async function testEmailNotifications() {
  console.log('🧪 Testing Email Notification System\n');
  
  // 1. Check if subscribers exist
  console.log('1️⃣ Checking for subscribers...');
  
  let subscribers = [];
  
  // Check JSON file
  try {
    const subscribersPath = path.join(__dirname, '../data/subscribers.json');
    if (fs.existsSync(subscribersPath)) {
      const data = JSON.parse(fs.readFileSync(subscribersPath, 'utf8'));
      subscribers = data.subscribers || [];
      console.log(`   ✅ Found ${subscribers.length} subscribers in JSON file`);
    } else {
      console.log('   ℹ️ No subscribers.json file found');
    }
  } catch (err) {
    console.log('   ❌ Error reading subscribers:', err.message);
  }
  
  // 2. Check Supabase for subscribers
  console.log('\n2️⃣ Checking Supabase for subscribers...');
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabaseUrl = 'https://oojggdhhcnhvspdkjmnx.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vamdnZGhoY25odnNwZGtqbW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NDEzNzMsImV4cCI6MjA1MzAxNzM3M30._sUqZ5kqvCThmNiPiF5xb2DZa5HLcvwPr-bHdYcCXdA';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('email, first_name, status')
      .eq('status', 'active');
    
    if (error) {
      console.log('   ⚠️ Could not fetch from Supabase:', error.message);
    } else if (data && data.length > 0) {
      console.log(`   ✅ Found ${data.length} active subscribers in Supabase`);
      subscribers = data;
      
      // Show sample subscribers
      console.log('   Sample subscribers:');
      data.slice(0, 3).forEach(sub => {
        console.log(`     - ${sub.email} (${sub.first_name || 'No name'})`);
      });
    } else {
      console.log('   ℹ️ No subscribers in Supabase');
    }
  } catch (err) {
    console.log('   ❌ Error connecting to Supabase:', err.message);
  }
  
  // 3. Test email sending capability
  console.log('\n3️⃣ Testing email sending capability...');
  
  // Check if Gmail is configured
  try {
    const gmailPath = path.join(__dirname, '../src/lib/gmail-working.js');
    if (fs.existsSync(gmailPath)) {
      console.log('   ✅ Gmail configuration file exists');
      
      // Try to load and test
      const { sendEmail } = require(gmailPath);
      
      // Test with a dummy email (not actually sending)
      console.log('   📧 Gmail sender is configured');
      console.log('   ℹ️ Would send emails to subscribers when blog is published');
    } else {
      console.log('   ⚠️ Gmail configuration not found');
    }
  } catch (err) {
    console.log('   ❌ Error with Gmail configuration:', err.message);
  }
  
  // 4. Simulate blog post publication
  console.log('\n4️⃣ Simulating blog post publication...');
  
  const testPost = {
    id: 'test-123',
    title: 'Test Blog Post for Email Notifications',
    slug: 'test-blog-post',
    excerpt: 'This is a test blog post to verify email notifications work correctly.',
    author: 'Test Author',
    category: 'Test',
    status: 'published',
    published_at: new Date().toISOString()
  };
  
  console.log('   📝 Test post:', testPost.title);
  
  if (subscribers.length > 0) {
    console.log(`   📮 Would send notifications to ${subscribers.length} subscribers:`);
    subscribers.slice(0, 5).forEach(sub => {
      console.log(`      - ${sub.email}`);
    });
    
    console.log('\n   📧 Email template preview:');
    console.log('   ┌─────────────────────────────────────┐');
    console.log('   │ Subject: 📚 Nuevo artículo: ' + testPost.title.substring(0, 20) + '...');
    console.log('   │ ');
    console.log('   │ Hola [Subscriber Name],');
    console.log('   │ ');
    console.log('   │ Tenemos un nuevo artículo:');
    console.log('   │ ' + testPost.title);
    console.log('   │ ');
    console.log('   │ ' + testPost.excerpt);
    console.log('   │ ');
    console.log('   │ [Leer Artículo Completo →]');
    console.log('   │ ');
    console.log('   │ © 2025 CasinosPesos');
    console.log('   └─────────────────────────────────────┘');
  } else {
    console.log('   ⚠️ No subscribers to notify');
  }
  
  // 5. Summary
  console.log('\n📊 Summary:');
  console.log('─────────────────────────────────');
  console.log(`Total Subscribers: ${subscribers.length}`);
  console.log(`Email System: ${fs.existsSync(path.join(__dirname, '../src/lib/gmail-working.js')) ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`Database: ${subscribers.length > 0 ? '✅ Has subscribers' : '⚠️ No subscribers'}`);
  console.log('\n✨ When you publish a blog post from admin panel:');
  console.log('   1. Post status changes to "published"');
  console.log('   2. System fetches all active subscribers');
  console.log('   3. Email notifications are sent to each subscriber');
  console.log('   4. Subscribers can click to read the full article');
  console.log('\n💡 To test the full flow:');
  console.log('   1. Login as admin');
  console.log('   2. Go to /admin/blog');
  console.log('   3. Create or edit a post');
  console.log('   4. Click "Publicar" to publish and send notifications');
}

// Run the test
testEmailNotifications().catch(console.error);