import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Fetch post from Supabase
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    
    if (error || !post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Increment view count (ignore errors if function doesn't exist)
    try {
      await supabase.rpc('increment_blog_views', {
        post_uuid: post.id
      });
    } catch (err) {
      // If function doesn't exist, update directly
      await supabase
        .from('blog_posts')
        .update({ views: (post.views || 0) + 1 })
        .eq('id', post.id);
    }
    
    // Get related posts (same category)
    const { data: relatedPosts } = await supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, category, published_at, featured_image, read_time')
      .eq('status', 'published')
      .eq('category', post.category)
      .neq('id', post.id)
      .order('published_at', { ascending: false })
      .limit(3);
    
    // Format response with proper field names
    const formattedPost = {
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
      authorEmail: post.author_email,
      authorAvatar: post.author_avatar,
      category: post.category,
      tags: post.tags || [],
      featuredImage: post.featured_image,
      images: post.images || [],
      publishedAt: post.published_at,
      updatedAt: post.updated_at,
      readTime: post.read_time || 5,
      views: (post.views || 0) + 1,
      likes: post.likes || 0,
      shares: post.shares || 0,
      relatedPosts: (relatedPosts || []).map(rp => ({
        id: rp.id,
        slug: rp.slug,
        title: rp.title,
        excerpt: rp.excerpt,
        category: rp.category,
        publishedAt: rp.published_at,
        featuredImage: rp.featured_image,
        readTime: rp.read_time || 5
      }))
    };
    
    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}