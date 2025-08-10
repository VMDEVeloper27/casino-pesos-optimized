import { NextRequest, NextResponse } from 'next/server';
import { getPublishedBlogPosts } from '@/lib/blog-database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    
    let posts = await getPublishedBlogPosts();
    
    // Filter by category if provided
    if (category) {
      posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    // Filter by tag if provided
    if (tag) {
      posts = posts.filter(p => 
        p.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
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