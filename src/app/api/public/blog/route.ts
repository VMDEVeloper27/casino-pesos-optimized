import { NextRequest, NextResponse } from 'next/server';
import { 
  getPublishedBlogPosts, 
  getBlogPostsByCategory, 
  getBlogPostsByTag 
} from '@/lib/blog-supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    
    let posts;
    
    // Get posts based on filters
    if (category) {
      posts = await getBlogPostsByCategory(category);
    } else if (tag) {
      posts = await getBlogPostsByTag(tag);
    } else {
      posts = await getPublishedBlogPosts();
    }
    
    // Pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedPosts = posts.slice(start, end);
    
    return NextResponse.json({
      posts: paginatedPosts,
      total: posts.length,
      page,
      totalPages: Math.ceil(posts.length / limit)
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}