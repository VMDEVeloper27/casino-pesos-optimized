import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { updateBlogPostDirect } from '@/lib/supabase-direct';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Fetch from Supabase only
    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching post:', error);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
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
    const updates = await request.json();
    
    console.log('Updating blog post:', { id, updates });
    
    // Prepare update data with proper field mapping
    const updateData: any = {};
    
    // Map fields to database columns
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.titleEs !== undefined) updateData.title_es = updates.titleEs;
    if (updates.titleEn !== undefined) updateData.title_en = updates.titleEn;
    if (updates.slug !== undefined) updateData.slug = updates.slug;
    if (updates.excerpt !== undefined) updateData.excerpt = updates.excerpt;
    if (updates.excerptEs !== undefined) updateData.excerpt_es = updates.excerptEs;
    if (updates.excerptEn !== undefined) updateData.excerpt_en = updates.excerptEn;
    if (updates.content !== undefined) updateData.content = updates.content;
    if (updates.contentEs !== undefined) updateData.content_es = updates.contentEs;
    if (updates.contentEn !== undefined) updateData.content_en = updates.contentEn;
    if (updates.author !== undefined) updateData.author = updates.author;
    if (updates.authorRole !== undefined) updateData.author_role = updates.authorRole || updates.author_role;
    if (updates.authorEmail !== undefined) updateData.author_email = updates.authorEmail || updates.author_email;
    if (updates.authorAvatar !== undefined) updateData.author_avatar = updates.authorAvatar || updates.author_avatar;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.tags !== undefined) updateData.tags = updates.tags;
    if (updates.featuredImage !== undefined) updateData.featured_image = updates.featuredImage || updates.featured_image;
    if (updates.featured_image !== undefined) updateData.featured_image = updates.featured_image;
    if (updates.images !== undefined) updateData.images = updates.images;
    if (updates.metaTitle !== undefined) updateData.meta_title = updates.metaTitle || updates.meta_title;
    if (updates.metaDescription !== undefined) updateData.meta_description = updates.metaDescription || updates.meta_description;
    if (updates.metaKeywords !== undefined) updateData.meta_keywords = updates.metaKeywords || updates.meta_keywords;
    if (updates.canonicalUrl !== undefined) updateData.canonical_url = updates.canonicalUrl || updates.canonical_url;
    if (updates.views !== undefined) updateData.views = updates.views;
    if (updates.likes !== undefined) updateData.likes = updates.likes;
    if (updates.shares !== undefined) updateData.shares = updates.shares;
    if (updates.readTime !== undefined) updateData.read_time = updates.readTime || updates.read_time;
    if (updates.read_time !== undefined) updateData.read_time = updates.read_time;
    if (updates.isFeatured !== undefined) updateData.is_featured = updates.isFeatured || updates.is_featured;
    if (updates.is_featured !== undefined) updateData.is_featured = updates.is_featured;
    
    // Handle status
    if (updates.status !== undefined) {
      updateData.status = updates.status;
      if (updates.status === 'published' && !updates.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }
    
    if (updates.publishedAt !== undefined) {
      updateData.published_at = updates.publishedAt || updates.published_at;
    }
    if (updates.published_at !== undefined) {
      updateData.published_at = updates.published_at;
    }
    
    // Update timestamp
    updateData.updated_at = new Date().toISOString();
    
    // Update in Supabase using direct method to bypass RLS return issue
    console.log('Updating in Supabase with data:', updateData);
    
    try {
      const updatedPost = await updateBlogPostDirect(id, updateData);
      console.log('Supabase update successful:', updatedPost);
      return NextResponse.json(updatedPost);
    } catch (error: any) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: error.message || 'Failed to update post' }, { status: 500 });
    }
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
    
    // Delete from Supabase only
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}