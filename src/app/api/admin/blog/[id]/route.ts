import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
      const post = await prisma.blogPost.findUnique({
        where: { id }
      });
      
      if (post) {
        return NextResponse.json({
          ...post,
          publishedAt: post.publishedAt?.toISOString(),
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString()
        });
      }
    } catch (dbError) {
      console.log('Database error:', dbError);
      
      // Fallback to JSON file
      try {
        const { getBlogPostById } = await import('@/lib/blog-database');
        const post = await getBlogPostById(id);
        
        if (post) {
          return NextResponse.json(post);
        }
      } catch (fileError) {
        console.log('JSON fallback also failed');
      }
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
    
    // Prepare update data
    const updateData: any = {};
    
    // Map fields that exist in the update request
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.titleEs !== undefined) updateData.titleEs = updates.titleEs;
    if (updates.titleEn !== undefined) updateData.titleEn = updates.titleEn;
    if (updates.slug !== undefined) updateData.slug = updates.slug;
    if (updates.excerpt !== undefined) updateData.excerpt = updates.excerpt;
    if (updates.excerptEs !== undefined) updateData.excerptEs = updates.excerptEs;
    if (updates.excerptEn !== undefined) updateData.excerptEn = updates.excerptEn;
    if (updates.content !== undefined) updateData.content = updates.content;
    if (updates.contentEs !== undefined) updateData.contentEs = updates.contentEs;
    if (updates.contentEn !== undefined) updateData.contentEn = updates.contentEn;
    if (updates.author !== undefined) updateData.author = updates.author;
    if (updates.authorRole !== undefined) updateData.authorRole = updates.authorRole;
    if (updates.authorEmail !== undefined) updateData.authorEmail = updates.authorEmail;
    if (updates.authorAvatar !== undefined) updateData.authorAvatar = updates.authorAvatar;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.tags !== undefined) updateData.tags = updates.tags;
    if (updates.featuredImage !== undefined) updateData.featuredImage = updates.featuredImage;
    if (updates.images !== undefined) updateData.images = updates.images;
    if (updates.metaTitle !== undefined) updateData.metaTitle = updates.metaTitle;
    if (updates.metaDescription !== undefined) updateData.metaDescription = updates.metaDescription;
    if (updates.metaKeywords !== undefined) updateData.metaKeywords = updates.metaKeywords;
    if (updates.canonicalUrl !== undefined) updateData.canonicalUrl = updates.canonicalUrl;
    if (updates.views !== undefined) updateData.views = updates.views;
    if (updates.likes !== undefined) updateData.likes = updates.likes;
    if (updates.shares !== undefined) updateData.shares = updates.shares;
    if (updates.readTime !== undefined) updateData.readTime = updates.readTime;
    if (updates.isFeatured !== undefined) updateData.isFeatured = updates.isFeatured;
    
    // Handle status and publishedAt
    if (updates.status !== undefined) {
      updateData.status = updates.status === 'published' ? 'PUBLISHED' : updates.status === 'draft' ? 'DRAFT' : 'ARCHIVED';
      if (updateData.status === 'PUBLISHED' && !updates.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    
    if (updates.publishedAt !== undefined) {
      updateData.publishedAt = updates.publishedAt ? new Date(updates.publishedAt) : null;
    }
    
    // Try database first
    try {
      const updatedPost = await prisma.blogPost.update({
        where: { id },
        data: updateData
      });
      
      // Send notifications if newly published
      if (updatedPost.status === 'PUBLISHED') {
        await sendUpdateNotifications(updatedPost);
      }
      
      return NextResponse.json({
        ...updatedPost,
        status: updatedPost.status === 'PUBLISHED' ? 'published' : updatedPost.status === 'DRAFT' ? 'draft' : 'archived',
        publishedAt: updatedPost.publishedAt?.toISOString(),
        createdAt: updatedPost.createdAt.toISOString(),
        updatedAt: updatedPost.updatedAt.toISOString()
      });
    } catch (dbError) {
      console.log('Database update failed:', dbError);
      
      // Fallback to JSON file
      try {
        const { updateBlogPost } = await import('@/lib/blog-database');
        const result = await updateBlogPost(id, updates);
        
        if (result) {
          // Send notifications if newly published
          if (updates.status === 'published') {
            await sendUpdateNotifications(result);
          }
          
          return NextResponse.json(result);
        }
      } catch (fileError) {
        console.log('JSON fallback also failed');
      }
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
      await prisma.blogPost.delete({
        where: { id }
      });
      
      return NextResponse.json({ success: true });
    } catch (dbError) {
      console.log('Database delete failed:', dbError);
      
      // Fallback to JSON file
      try {
        const { deleteBlogPost } = await import('@/lib/blog-database');
        const deleted = await deleteBlogPost(id);
        
        if (deleted) {
          return NextResponse.json({ success: true });
        }
      } catch (fileError) {
        console.log('JSON fallback also failed');
      }
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