import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Build query
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    
    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    
    if (tag) {
      query = query.contains('tags', [tag]);
    }
    
    // Apply pagination
    const start = (page - 1) * limit;
    query = query.range(start, start + limit - 1);
    
    // Execute query
    const { data: posts, error, count } = await query;
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return NextResponse.json({ 
        posts: [],
        total: 0,
        page,
        totalPages: 0
      });
    }
    
    // Format posts with proper field names
    const formattedPosts = (posts || []).map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      titleEs: post.title_es,
      titleEn: post.title_en,
      excerpt: post.excerpt,
      excerptEs: post.excerpt_es,
      excerptEn: post.excerpt_en,
      content: post.content,
      contentEs: post.content_es,
      contentEn: post.content_en,
      author: post.author,
      authorRole: post.author_role,
      author_role: post.author_role,
      category: post.category,
      tags: post.tags || [],
      featuredImage: post.featured_image,
      featured_image: post.featured_image,
      publishedAt: post.published_at,
      published_at: post.published_at,
      updatedAt: post.updated_at,
      readTime: post.read_time || 5,
      read_time: post.read_time || 5,
      views: post.views || 0,
      likes: post.likes || 0,
      shares: post.shares || 0,
      status: post.status,
      isFeatured: post.is_featured,
      is_featured: post.is_featured
    }));
    
    return NextResponse.json({
      posts: formattedPosts,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ 
      posts: [],
      total: 0,
      page: 1,
      totalPages: 0
    }, { status: 500 });
  }
}