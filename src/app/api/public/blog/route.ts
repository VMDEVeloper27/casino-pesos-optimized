import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Try to fetch from database first
    let posts = [];
    let useDatabase = false;
    
    try {
      const { 
        getPublishedBlogPosts, 
        getBlogPostsByCategory, 
        getBlogPostsByTag 
      } = await import('@/lib/blog-supabase');
      
      // Get posts based on filters
      if (category) {
        posts = await getBlogPostsByCategory(category);
      } else if (tag) {
        posts = await getBlogPostsByTag(tag);
      } else {
        posts = await getPublishedBlogPosts();
      }
      
      if (posts && posts.length > 0) {
        useDatabase = true;
      }
    } catch (dbError) {
      console.log('Database not available, using JSON fallback');
    }
    
    // If database failed or returned no data, use JSON file
    if (!useDatabase || posts.length === 0) {
      const jsonPath = path.join(process.cwd(), 'data', 'blog-posts.json');
      try {
        const jsonData = await fs.readFile(jsonPath, 'utf-8');
        const blogData = JSON.parse(jsonData);
        posts = blogData.posts || [];
        
        // Filter by category if specified
        if (category) {
          posts = posts.filter((p: any) => p.category === category);
        }
        
        // Filter by tag if specified
        if (tag) {
          posts = posts.filter((p: any) => p.tags && p.tags.includes(tag));
        }
        
        // Only show published posts
        posts = posts.filter((p: any) => p.status === 'published');
      } catch (fileError) {
        console.error('Error reading JSON file:', fileError);
        posts = [];
      }
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