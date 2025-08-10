import { ArrowLeft, Calendar, ChevronRight, Clock, Eye, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbStructuredData } from '@/components/StructuredData';
import SocialSharing from '@/components/blog/SocialSharing';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

// Fetch blog post data
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/blog/${slug}`, {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
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
  const baseUrl = 'https://casinospesos.com';
  const pageUrl = `${baseUrl}/${locale}/blog/${slug}`;
  
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
        url: `${baseUrl}${post.featuredImage}`,
        width: 1200,
        height: 630,
        alt: post.title
      }] : undefined
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/blog/${slug}`,
        'en-US': `${baseUrl}/en/blog/${slug}`,
        'x-default': `${baseUrl}/es/blog/${slug}`
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
    <main className="min-h-screen bg-neutral-900 pt-8 pb-16">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href={`/${locale}`} className="hover:text-white transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white truncate">{post.title}</span>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className={`px-3 py-1 ${getCategoryColor(post.category)} text-white rounded-full text-sm font-semibold`}>
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min de lectura</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()} vistas</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          
          <p className="text-lg text-neutral-300 mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">{post.author}</div>
                <div className="text-sm text-neutral-400">{post.authorRole}</div>
              </div>
              <div className="text-neutral-400">•</div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
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
          <div className="aspect-video bg-neutral-800 rounded-xl mb-8 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-6xl">📰</span>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-neutral-700">
            {post.tags.map(tag => (
              <Link
                key={tag}
                href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-sm text-neutral-300 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Author Box */}
        <div className="bg-neutral-800 rounded-xl p-6 mb-12 border border-neutral-700">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Sobre el Autor</h3>
              <div className="text-white font-medium mb-2">{post.author}</div>
              <p className="text-neutral-400">
                {post.authorRole} en CasinosPesos. Experto en casinos online y juegos de azar con más de 5 años de experiencia en la industria.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Artículos Relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {post.relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/${locale}/blog/${related.slug}`}
                  className="group"
                >
                  <article className="bg-neutral-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video bg-neutral-700 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs font-semibold text-white">
                          {related.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
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
        <div className="flex justify-between items-center pt-8 border-t border-neutral-700">
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
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