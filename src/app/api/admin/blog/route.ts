import { NextRequest, NextResponse } from 'next/server';
import { 
  getPublishedBlogPosts,
  createBlogPost,
  getBlogStats,
  BlogPost 
} from '@/lib/blog-supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

// GET all blog posts (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = await getPublishedBlogPosts();
    const stats = await getBlogStats();
    
    return NextResponse.json({ posts, stats });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST create new blog post (admin only with automatic notifications)
export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content || !data.author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, and author are required' },
        { status: 400 }
      );
    }
    
    console.log('📝 Creating new blog post:', data.title);
    console.log('📊 Status:', data.status);

    // Create blog post using Supabase (notifications are handled automatically in blog-supabase.ts)
    const newPost = await createBlogPost({
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: data.title,
      excerpt: data.excerpt || data.content.substring(0, 200) + '...',
      content: data.content,
      author: data.author,
      author_role: data.authorRole || 'Editor Senior',
      category: data.category || 'General',
      tags: data.tags || [],
      featured_image: data.featuredImage || '/images/blog/default.jpg',
      published_at: data.status === 'published' ? new Date().toISOString() : null,
      read_time: data.readTime || Math.ceil(data.content.split(' ').length / 200),
      status: data.status || 'draft',
      seo_title: data.seo?.metaTitle || data.title,
      seo_description: data.seo?.metaDescription || data.excerpt,
      seo_keywords: data.seo?.keywords || []
    });
    
    if (!newPost) {
      throw new Error('Failed to create post in database');
    }

    console.log('✅ Blog post created successfully:', newPost.id);
    
    // If post was published, notifications are sent automatically by blog-supabase.ts
    if (newPost.status === 'published') {
      console.log('📧 Email notifications will be sent to all subscribers automatically');
    }
    
    return NextResponse.json({
      success: true,
      post: newPost,
      message: newPost.status === 'published' 
        ? 'Post published and notifications sent to subscribers!' 
        : 'Post saved as draft'
    });
  } catch (error) {
    console.error('❌ Error creating blog post:', error);
    return NextResponse.json({ 
      error: 'Failed to create blog post', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}