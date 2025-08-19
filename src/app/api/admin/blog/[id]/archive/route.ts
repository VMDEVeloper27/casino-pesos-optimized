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
      status: 'archived',
      updated_at: new Date().toISOString()
    };
    
    // Try database first
    let archived = false;
    
    try {
      const { updateBlogPost } = await import('@/lib/blog-supabase');
      const result = await updateBlogPost(id, updates);
      if (result) {
        archived = true;
        return NextResponse.json({ success: true });
      }
    } catch (dbError) {
      console.log('Database update failed');
    }
    
    // Fallback to JSON
    if (!archived) {
      const jsonPath = path.join(process.cwd(), 'data', 'blog-posts.json');
      const jsonData = await fs.readFile(jsonPath, 'utf-8');
      const blogData = JSON.parse(jsonData);
      
      const index = blogData.posts.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        blogData.posts[index] = { ...blogData.posts[index], ...updates };
        await fs.writeFile(jsonPath, JSON.stringify(blogData, null, 2));
        return NextResponse.json({ success: true });
      }
    }
    
    return NextResponse.json({ error: 'Failed to archive post' }, { status: 500 });
  } catch (error) {
    console.error('Error archiving post:', error);
    return NextResponse.json({ error: 'Failed to archive post' }, { status: 500 });
  }
}