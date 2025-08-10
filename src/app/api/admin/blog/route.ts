import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllBlogPosts, 
  createBlogPost,
  BlogPost 
} from '@/lib/blog-database';

// GET all blog posts (admin)
export async function GET(request: NextRequest) {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content || !data.author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newPost = await createBlogPost({
      title: data.title,
      excerpt: data.excerpt || '',
      content: data.content,
      author: data.author,
      authorRole: data.authorRole || 'Author',
      category: data.category || 'General',
      tags: data.tags || [],
      featuredImage: data.featuredImage || '/images/blog/default.jpg',
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: data.readTime || Math.ceil(data.content.split(' ').length / 200),
      status: data.status || 'draft',
      seo: data.seo,
    });
    
    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}