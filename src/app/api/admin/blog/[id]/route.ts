import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if user is admin or editor (temporarily disabled for development)
    // const session = await getServerSession(authOptions);
    // if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'editor')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Try database first
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        return NextResponse.json(data);
      }
    } catch (dbError) {
      console.log('Database not available, trying JSON fallback');
    }
    
    // Fallback to JSON file
    const { getBlogPostById } = await import('@/lib/blog-database');
    const post = await getBlogPostById(id);
    
    if (post) {
      return NextResponse.json(post);
    }
    
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if user is admin or editor (temporarily disabled for development)
    // const session = await getServerSession(authOptions);
    // if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'editor')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const updates = await request.json();
    updates.updated_at = new Date().toISOString();
    
    // If publishing, set published_at
    if (updates.status === 'published' && !updates.published_at) {
      updates.published_at = new Date().toISOString();
    }
    
    // Try database first
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (!error && data) {
        // Send notifications if newly published
        if (updates.status === 'published') {
          await sendUpdateNotifications(data);
        }
        return NextResponse.json(data);
      }
    } catch (dbError) {
      console.log('Database update failed, trying JSON fallback');
    }
    
    // Fallback to JSON file
    const { updateBlogPost } = await import('@/lib/blog-database');
    const result = await updateBlogPost(id, updates);
    
    if (result) {
      // Send notifications if newly published
      if (updates.status === 'published') {
        await sendUpdateNotifications(result);
      }
      
      return NextResponse.json(result);
    }
    
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if user is admin or editor (temporarily disabled for development)
    // const session = await getServerSession(authOptions);
    // if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'editor')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Try database first
    try {
      const { supabase } = await import('@/lib/supabase');
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (!error) {
        return NextResponse.json({ success: true });
      }
    } catch (dbError) {
      console.log('Database delete failed, trying JSON fallback');
    }
    
    // Fallback to JSON file
    const { deleteBlogPost } = await import('@/lib/blog-database');
    const deleted = await deleteBlogPost(id);
    
    if (deleted) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

async function sendUpdateNotifications(post: any) {
  // Similar to sendNewPostNotifications but for updates
  console.log('📧 Post updated:', post.title);
  // Implement email sending logic here if needed
}