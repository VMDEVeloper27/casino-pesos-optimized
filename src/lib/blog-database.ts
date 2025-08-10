import { promises as fs } from 'fs';
import path from 'path';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  likes: number;
  status: 'draft' | 'published' | 'archived';
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

const DB_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// Get published blog posts
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get blog post by ID
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.id === id) || null;
}

// Get posts by category
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts();
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

// Get posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts();
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get related posts
export async function getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts();
  const currentPost = posts.find(p => p.id === postId);
  
  if (!currentPost) return [];
  
  // Find posts with similar tags or category
  const relatedPosts = posts
    .filter(p => p.id !== postId)
    .map(post => {
      let score = 0;
      
      // Category match
      if (post.category === currentPost.category) score += 2;
      
      // Tag matches
      const commonTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      );
      score += commonTags.length;
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
  
  return relatedPosts;
}

// Save blog posts
export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('Error saving blog posts:', error);
    throw error;
  }
}

// Create new blog post
export async function createBlogPost(post: Omit<BlogPost, 'id' | 'slug' | 'views' | 'likes'>): Promise<BlogPost> {
  const posts = await getAllBlogPosts();
  
  const newPost: BlogPost = {
    ...post,
    id: generateId(post.title),
    slug: generateSlug(post.title),
    views: 0,
    likes: 0,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  posts.push(newPost);
  await saveBlogPosts(posts);
  
  return newPost;
}

// Update blog post
export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  const index = posts.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  await saveBlogPosts(posts);
  return posts[index];
}

// Delete blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  const posts = await getAllBlogPosts();
  const filteredPosts = posts.filter(p => p.id !== id);
  
  if (filteredPosts.length === posts.length) return false;
  
  await saveBlogPosts(filteredPosts);
  return true;
}

// Increment view count
export async function incrementBlogViews(id: string): Promise<void> {
  const posts = await getAllBlogPosts();
  const post = posts.find(p => p.id === id);
  
  if (post) {
    post.views = (post.views || 0) + 1;
    await saveBlogPosts(posts);
  }
}

// Toggle like
export async function toggleBlogLike(id: string, increment: boolean): Promise<number> {
  const posts = await getAllBlogPosts();
  const post = posts.find(p => p.id === id);
  
  if (post) {
    post.likes = (post.likes || 0) + (increment ? 1 : -1);
    post.likes = Math.max(0, post.likes); // Don't go below 0
    await saveBlogPosts(posts);
    return post.likes;
  }
  
  return 0;
}

// Helper functions
function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get blog stats
export async function getBlogStats() {
  const posts = await getAllBlogPosts();
  
  return {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
    archived: posts.filter(p => p.status === 'archived').length,
    totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
    totalLikes: posts.reduce((sum, p) => sum + (p.likes || 0), 0),
    categories: [...new Set(posts.map(p => p.category))],
    tags: [...new Set(posts.flatMap(p => p.tags))],
  };
}