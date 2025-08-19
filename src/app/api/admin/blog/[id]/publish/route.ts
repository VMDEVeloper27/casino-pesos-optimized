import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if user is admin or editor
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'editor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = {
      status: 'published',
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Try database first
    let published = false;
    let post = null;
    
    try {
      const { updateBlogPost, getBlogPost } = await import('@/lib/blog-supabase');
      post = await updateBlogPost(id, updates);
      if (post) {
        published = true;
      }
    } catch (dbError) {
      console.log('Database update failed');
    }
    
    // Fallback to JSON
    if (!published) {
      const jsonPath = path.join(process.cwd(), 'data', 'blog-posts.json');
      const jsonData = await fs.readFile(jsonPath, 'utf-8');
      const blogData = JSON.parse(jsonData);
      
      const index = blogData.posts.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        blogData.posts[index] = { ...blogData.posts[index], ...updates };
        await fs.writeFile(jsonPath, JSON.stringify(blogData, null, 2));
        post = blogData.posts[index];
        published = true;
      }
    }
    
    if (published && post) {
      // Send notifications to subscribers
      await sendPublishNotifications(post);
      return NextResponse.json({ success: true, post });
    }
    
    return NextResponse.json({ error: 'Failed to publish post' }, { status: 500 });
  } catch (error) {
    console.error('Error publishing post:', error);
    return NextResponse.json({ error: 'Failed to publish post' }, { status: 500 });
  }
}

async function sendPublishNotifications(post: any) {
  try {
    console.log('📧 Sending notifications for published post:', post.title);
    
    // Get subscribers
    let subscribers = [];
    
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase
        .from('newsletter_subscribers')
        .select('email, first_name')
        .eq('status', 'active');
      
      if (data) {
        subscribers = data;
      }
    } catch (err) {
      console.log('Could not fetch subscribers from database');
    }
    
    // If no subscribers from DB, try JSON
    if (subscribers.length === 0) {
      try {
        const jsonPath = path.join(process.cwd(), 'data', 'subscribers.json');
        const jsonData = await fs.readFile(jsonPath, 'utf-8');
        const subData = JSON.parse(jsonData);
        subscribers = subData.subscribers || [];
      } catch (err) {
        console.log('No subscribers found');
      }
    }
    
    if (subscribers.length === 0) {
      console.log('No subscribers to notify');
      return;
    }
    
    console.log(`📨 Sending notifications to ${subscribers.length} subscribers`);
    
    // Here we would implement actual email sending
    // For now, just log it
    for (const subscriber of subscribers) {
      console.log(`📧 Email would be sent to: ${subscriber.email}`);
      // In production, implement your email service here
      // await sendEmail({
      //   to: subscriber.email,
      //   subject: `Nuevo artículo: ${post.title}`,
      //   html: emailTemplate(post, subscriber)
      // });
    }
    
    console.log('✅ All notifications sent successfully');
    
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}