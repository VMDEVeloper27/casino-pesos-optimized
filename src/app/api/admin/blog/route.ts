import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin or editor (temporarily disabled for development)
    // const session = await getServerSession(authOptions);
    // if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'editor')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Try to fetch from database first
    let posts = [];
    
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        posts = data;
      } else {
        // If no posts in DB, try JSON fallback
        const jsonPath = path.join(process.cwd(), 'data', 'blog-posts.json');
        try {
          const jsonData = await fs.readFile(jsonPath, 'utf-8');
          const blogData = JSON.parse(jsonData);
          posts = blogData.posts || [];
        } catch (fileError) {
          console.error('Error reading JSON file:', fileError);
        }
      }
    } catch (dbError) {
      console.log('Database not available, using JSON fallback');
      // Fallback to JSON file
      const jsonPath = path.join(process.cwd(), 'data', 'blog-posts.json');
      try {
        const jsonData = await fs.readFile(jsonPath, 'utf-8');
        const blogData = JSON.parse(jsonData);
        posts = blogData.posts || [];
      } catch (fileError) {
        console.error('Error reading JSON file:', fileError);
      }
    }
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin or editor (temporarily disabled for development)
    // const session = await getServerSession(authOptions);
    // if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'editor')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const postData = await request.json();
    
    // Generate slug if not provided
    if (!postData.slug) {
      postData.slug = postData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
    }
    
    // Add timestamps
    postData.created_at = new Date().toISOString();
    postData.updated_at = new Date().toISOString();
    postData.published_at = postData.status === 'published' 
      ? new Date().toISOString() 
      : postData.published_at || null;
    
    // Set defaults
    postData.views = 0;
    postData.likes = 0;
    postData.id = postData.id || `post-${Date.now()}`;
    
    // Try to save to database first
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();
      
      if (!error && data) {
        // If published, send notifications
        if (postData.status === 'published') {
          await sendNewPostNotifications(data);
        }
        
        return NextResponse.json(data);
      }
    } catch (dbError) {
      console.log('Database save failed, using JSON fallback');
    }
    
    // Fallback to JSON file
    const jsonPath = path.join(process.cwd(), 'data', 'blog-posts.json');
    let blogData = { posts: [] };
    
    try {
      const jsonContent = await fs.readFile(jsonPath, 'utf-8');
      blogData = JSON.parse(jsonContent);
    } catch (err) {
      // File doesn't exist, will create it
    }
    
    blogData.posts.unshift(postData);
    await fs.writeFile(jsonPath, JSON.stringify(blogData, null, 2));
    
    // Send notifications if published
    if (postData.status === 'published') {
      await sendNewPostNotifications(postData);
    }
    
    return NextResponse.json(postData);
    
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

async function sendNewPostNotifications(post: any) {
  try {
    console.log('📧 Sending notifications for new post:', post.title);
    
    // Get subscribers from database or JSON
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
    
    console.log(`📨 Would send notifications to ${subscribers.length} subscribers`);
    
    // Here you would implement actual email sending
    // For now, just log it
    for (const subscriber of subscribers) {
      console.log(`Email would be sent to: ${subscriber.email}`);
      // In production, use your email service here
    }
    
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}