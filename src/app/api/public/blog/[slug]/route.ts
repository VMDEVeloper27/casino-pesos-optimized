import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const BLOG_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Read blog posts
    const data = await fs.readFile(BLOG_FILE, 'utf-8');
    const posts = JSON.parse(data);
    
    // Find the post by slug
    const post = posts.find((p: any) => p.slug === slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Increment view count
    post.views = (post.views || 0) + 1;
    
    // Save updated view count
    await fs.writeFile(BLOG_FILE, JSON.stringify(posts, null, 2), 'utf-8');
    
    // Get related posts (same category or tags)
    const relatedPosts = posts
      .filter((p: any) => 
        p.id !== post.id && 
        (p.category === post.category || 
         p.tags.some((tag: string) => post.tags.includes(tag)))
      )
      .slice(0, 3)
      .map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        publishedAt: p.publishedAt,
        featuredImage: p.featuredImage,
        readTime: p.readTime
      }));
    
    return NextResponse.json({
      ...post,
      relatedPosts
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}