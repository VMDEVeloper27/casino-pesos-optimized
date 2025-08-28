import { ArrowLeft, Calendar, ChevronRight, Clock, Eye, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbStructuredData } from '@/components/StructuredData';
import SocialSharing from '@/components/blog/SocialSharing';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCanonicalUrl } from '@/lib/canonical';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface BlogPost {
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
  relatedPosts: RelatedPost[];
}

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  featuredImage: string;
  readTime: number;
}

// Import Supabase directly
import { supabase } from '@/lib/supabase';

// Fetch blog post data directly from Supabase
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Fetch post from Supabase directly
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    
    if (error || !post) {
      // Fallback to JSON if not in DB
      try {
        const fs = require('fs').promises;
        const path = require('path');
        const jsonPath = path.join(process.cwd(), 'data', 'blog-posts.json');
        const jsonData = await fs.readFile(jsonPath, 'utf-8');
        const blogData = JSON.parse(jsonData);
        const jsonPost = blogData.posts?.find((p: any) => p.slug === slug);
        
        if (jsonPost) {
          return {
            id: jsonPost.id,
            slug: jsonPost.slug,
            title: jsonPost.title,
            excerpt: jsonPost.excerpt,
            content: jsonPost.content || 'Content coming soon...',
            author: jsonPost.author || 'Admin',
            authorRole: jsonPost.authorRole || jsonPost.author_role || 'Editor',
            category: jsonPost.category || 'General',
            tags: jsonPost.tags || [],
            featuredImage: jsonPost.featuredImage || jsonPost.featured_image || '',
            publishedAt: jsonPost.publishedAt || jsonPost.published_at || new Date().toISOString(),
            updatedAt: jsonPost.updatedAt || jsonPost.updated_at || new Date().toISOString(),
            readTime: jsonPost.readTime || jsonPost.read_time || 5,
            views: jsonPost.views || 0,
            likes: jsonPost.likes || 0,
            relatedPosts: []
          };
        }
      } catch (fileError) {
        console.log('JSON fallback failed:', fileError);
      }
      return null;
    }
    
    // Increment view count
    try {
      await supabase
        .from('blog_posts')
        .update({ views: (post.views || 0) + 1 })
        .eq('id', post.id);
    } catch (err) {
      // Ignore view increment errors
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
    
    // Format response
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || 'Content coming soon...',
      author: post.author,
      authorRole: post.author_role || 'Editor',
      category: post.category,
      tags: post.tags || [],
      featuredImage: post.featured_image,
      publishedAt: post.published_at,
      updatedAt: post.updated_at,
      readTime: post.read_time || 5,
      views: (post.views || 0) + 1,
      likes: post.likes || 0,
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
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }
  
  const isSpanish = locale === 'es';
  const pageUrl = getCanonicalUrl(`/blog/${slug}`, locale);
  
  return {
    title: `${post.title} | CasinosPesos Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      siteName: 'CasinosPesos',
      locale: isSpanish ? 'es_MX' : 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.featuredImage ? [{
        url: `https://casinospesos.com${post.featuredImage}`,
        width: 1200,
        height: 630,
        alt: post.title
      }] : undefined
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': getCanonicalUrl(`/blog/${slug}`, 'es'),
        'en-US': getCanonicalUrl(`/blog/${slug}`, 'en'),
        'x-default': getCanonicalUrl(`/blog/${slug}`, 'es')
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Guías': 'bg-blue-500',
      'Noticias': 'bg-purple-500',
      'Estrategia': 'bg-green-500',
      'Bonos': 'bg-yellow-500',
      'Juegos': 'bg-red-500',
      'Legal': 'bg-gray-500',
      'Tecnología': 'bg-cyan-500',
      'Pagos': 'bg-orange-500'
    };
    return colors[category] || 'bg-primary';
  };
  
  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-gray-900 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${locale}/blog`} className="hover:text-gray-900 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 truncate">{post.title}</span>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className={`px-3 py-1 ${getCategoryColor(post.category)} text-gray-900 rounded-full text-sm font-semibold`}>
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min de lectura</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()} vistas</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <div className="text-gray-900 font-medium">{post.author}</div>
                <div className="text-sm text-gray-500">{post.authorRole}</div>
              </div>
              <div className="text-gray-500">•</div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
            
            <SocialSharing 
              url={`https://casinospesos.com/${locale}/blog/${slug}`}
              title={post.title}
            />
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="aspect-video bg-white rounded-xl mb-8 overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
            {post.tags.map(tag => (
              <Link
                key={tag}
                href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-gray-100 rounded-full text-sm text-gray-600 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Author Box */}
        <div className="bg-white rounded-xl p-6 mb-12 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-gray-900" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Sobre el Autor</h3>
              <div className="text-gray-900 font-medium mb-2">{post.author}</div>
              <p className="text-gray-500">
                {post.authorRole} en CasinosPesos. Experto en casinos online y juegos de azar con más de 5 años de experiencia en la industria.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos Relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {post.relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/${locale}/blog/${related.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs font-semibold text-gray-900">
                          {related.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{related.readTime} min</span>
                        <span>{new Date(related.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>
        </div>
      </article>
      
      {/* Structured Data */}
      <BreadcrumbStructuredData items={[
        { name: 'Inicio', url: `https://casinospesos.com/${locale}` },
        { name: 'Blog', url: `https://casinospesos.com/${locale}/blog` },
        { name: post.title, url: `https://casinospesos.com/${locale}/blog/${slug}` }
      ]} />
    </main>
  );
}