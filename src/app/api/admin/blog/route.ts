import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Fetch from Supabase only
    const { data: posts, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return NextResponse.json({ posts: [] });
    }

    return NextResponse.json({ posts: posts || [] });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json();
    
    // Generate slug if not provided
    if (!postData.slug) {
      postData.slug = postData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
    }
    
    // Set defaults
    postData.views = postData.views || 0;
    postData.likes = postData.likes || 0;
    postData.shares = postData.shares || 0;
    postData.readTime = postData.readTime || 5;
    
    // Set published date if status is published
    if (postData.status === 'published' && !postData.published_at) {
      postData.published_at = new Date().toISOString();
    }
    
    // Save to Supabase
    const { data: newPost, error } = await supabaseAdmin
      .from('blog_posts')
      .insert({
        slug: postData.slug,
        title: postData.title,
        title_es: postData.titleEs || postData.title,
        title_en: postData.titleEn || postData.title,
        excerpt: postData.excerpt,
        excerpt_es: postData.excerptEs || postData.excerpt,
        excerpt_en: postData.excerptEn || postData.excerpt,
        content: postData.content,
        content_es: postData.contentEs || postData.content,
        content_en: postData.contentEn || postData.content,
        author: postData.author || 'Admin',
        author_role: postData.authorRole || postData.author_role || 'Editor',
        author_email: postData.authorEmail || postData.author_email,
        author_avatar: postData.authorAvatar || postData.author_avatar,
        category: postData.category,
        tags: postData.tags || [],
        featured_image: postData.featuredImage || postData.featured_image,
        images: postData.images || [],
        meta_title: postData.metaTitle || postData.meta_title,
        meta_description: postData.metaDescription || postData.meta_description,
        meta_keywords: postData.metaKeywords || postData.meta_keywords || [],
        canonical_url: postData.canonicalUrl || postData.canonical_url,
        views: postData.views || 0,
        likes: postData.likes || 0,
        shares: postData.shares || 0,
        read_time: postData.readTime || postData.read_time || 5,
        status: postData.status || 'draft',
        is_featured: postData.isFeatured || postData.is_featured || false,
        published_at: postData.published_at || postData.publishedAt
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error);
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
    
    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}