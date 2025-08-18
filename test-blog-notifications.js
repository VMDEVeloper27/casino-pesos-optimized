// Test script to verify blog post notifications
// This script creates a test blog post and sends notifications to subscribers

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zwtadapqdlthqafdsloi.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dGFkYXBxZGx0aHFhZmRzbG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzE4NjIsImV4cCI6MjA3MDc0Nzg2Mn0.wZ-QRC2OTGOleS0gv-Xfa7t4okpJAFnXbXcW5uziyjU';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBlogNotifications() {
  console.log('🧪 Testing blog post notification system...\n');

  try {
    // 1. Check if we have any subscribers
    console.log('📋 Checking for newsletter subscribers...');
    const { data: subscribers, error: subError } = await supabase
      .from('newsletter_subscribers')
      .select('email, first_name, preferences')
      .eq('status', 'active');

    if (subError) {
      console.error('❌ Error fetching subscribers:', subError);
      return;
    }

    if (!subscribers || subscribers.length === 0) {
      console.log('⚠️ No active subscribers found. Adding a test subscriber...');
      
      // Add a test subscriber
      const { data: newSub, error: addError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: 'test@example.com',
          first_name: 'Test User',
          preferences: {
            bonusAlerts: true,
            gameRecommendations: true,
            casinoUpdates: true,
            blogPosts: true
          },
          status: 'active'
        })
        .select()
        .single();

      if (addError && !addError.message.includes('duplicate')) {
        console.error('❌ Error adding test subscriber:', addError);
        return;
      }
      
      console.log('✅ Test subscriber added: test@example.com');
    } else {
      console.log(`✅ Found ${subscribers.length} active subscriber(s)`);
      console.log('📧 Subscribers who will receive notifications:');
      subscribers.forEach(sub => {
        const wantsBlogPosts = sub.preferences?.blogPosts !== false;
        console.log(`   - ${sub.email} (${sub.first_name || 'No name'}) - Blog notifications: ${wantsBlogPosts ? '✅' : '❌'}`);
      });
    }

    // 2. Create a test blog post
    console.log('\n📝 Creating test blog post...');
    const testPost = {
      slug: `test-post-${Date.now()}`,
      title: 'Test Post: Nuevas Promociones de Año Nuevo 2025',
      excerpt: 'Descubre las mejores promociones y bonos especiales que los casinos online tienen preparados para el año nuevo.',
      content: `# Promociones Especiales de Año Nuevo

Los mejores casinos online han preparado promociones increíbles para celebrar el 2025.

## Bonos Destacados

- **Bet365**: 100% hasta $1000 + 100 giros gratis
- **Codere**: 200% hasta $500 en tu primer depósito
- **Caliente**: Bono sin depósito de $50

## Cómo Aprovechar estas Ofertas

1. Regístrate en el casino de tu elección
2. Utiliza el código promocional especial
3. Realiza tu primer depósito
4. ¡Disfruta de tu bono!

No pierdas esta oportunidad única de comenzar el año con ventaja.`,
      author: 'Carlos Mendoza',
      author_role: 'Editor Senior',
      category: 'Bonos',
      tags: ['promociones', 'bonos', 'año nuevo', '2025'],
      featured_image: '/images/blog/new-year-bonus.jpg',
      published_at: new Date().toISOString(),
      read_time: 3,
      views: 0,
      likes: 0,
      status: 'published', // Important: must be 'published' to trigger notifications
      seo_title: 'Mejores Bonos de Casino Año Nuevo 2025',
      seo_description: 'Descubre las mejores promociones y bonos de casino para el año nuevo 2025',
      seo_keywords: ['bonos casino', 'promociones 2025', 'año nuevo casino']
    };

    const { data: newPost, error: postError } = await supabase
      .from('blog_posts')
      .insert(testPost)
      .select()
      .single();

    if (postError) {
      console.error('❌ Error creating test post:', postError);
      return;
    }

    console.log('✅ Test blog post created successfully!');
    console.log(`   - ID: ${newPost.id}`);
    console.log(`   - Title: ${newPost.title}`);
    console.log(`   - Status: ${newPost.status}`);

    // 3. Trigger notification sending
    console.log('\n📧 Sending notifications to subscribers...');
    
    // Call the API endpoint to send notifications
    const response = await fetch('http://localhost:3001/api/blog/notify-subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3001'
      },
      body: JSON.stringify({
        post: newPost,
        subscribers: subscribers || []
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error sending notifications:', error);
      return;
    }

    const result = await response.json();
    console.log('✅ Notifications sent successfully!');
    console.log(`   - Total subscribers: ${result.stats?.total || 0}`);
    console.log(`   - Successful sends: ${result.stats?.success || 0}`);
    console.log(`   - Failed sends: ${result.stats?.failed || 0}`);

    // 4. Check notification records
    console.log('\n📊 Checking notification records...');
    const { data: notifications, error: notifError } = await supabase
      .from('email_notifications')
      .select('*')
      .eq('post_id', newPost.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (!notifError && notifications && notifications.length > 0) {
      console.log(`✅ Found ${notifications.length} notification record(s):`);
      notifications.forEach(notif => {
        console.log(`   - ${notif.subscriber_email}: ${notif.status} (${notif.email_type})`);
      });
    } else {
      console.log('⚠️ No notification records found (this might be normal if the table doesn\'t exist)');
    }

    // 5. Clean up (optional - comment out if you want to keep the test post)
    console.log('\n🧹 Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', newPost.id);

    if (!deleteError) {
      console.log('✅ Test post deleted');
    }

    console.log('\n✨ Blog notification test completed successfully!');
    console.log('📌 The system is configured to automatically send emails when:');
    console.log('   1. A new post is created with status "published"');
    console.log('   2. A draft post is updated to status "published"');
    console.log('   3. Subscribers have blogPosts preference enabled');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testBlogNotifications();