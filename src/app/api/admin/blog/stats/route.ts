import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
  try {
    // Get total count
    const { count: totalPosts, error: countError } = await supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });

    // Get published count
    const { count: publishedPosts, error: publishedError } = await supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    // Get draft count
    const { count: draftPosts, error: draftError } = await supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft');

    // Get featured count
    const { count: featuredPosts, error: featuredError } = await supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('is_featured', true);

    const stats = {
      totalPosts: totalPosts || 0,
      publishedPosts: publishedPosts || 0,
      draftPosts: draftPosts || 0,
      featuredPosts: featuredPosts || 0
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return NextResponse.json({ error: 'Failed to fetch blog stats' }, { status: 500 });
  }
}