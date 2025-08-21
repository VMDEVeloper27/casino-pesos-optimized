'use client';

import { useState, useEffect, use } from 'react';
import { ArrowRight, Calendar, ChevronRight, Clock, User, Eye, Heart, Tag, Search, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbStructuredData } from '@/components/StructuredData';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  author_role?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  featured_image?: string;
  publishedAt?: string;
  published_at?: string;
  readTime?: number;
  read_time?: number;
  views: number;
  likes: number;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

/* export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const isSpanish = locale === 'es';
  const baseUrl = 'https://casinospesos.com';
  const pageUrl = `${baseUrl}/${locale}/blog`;
  
  if (isSpanish) {
    return {
      title: 'Blog Casino México 2025 - Noticias y Guías | CasinosPesos',
      description: 'Últimas noticias de casinos online en México 📰 Guías de juego ✅ Estrategias ganadoras ✅ Bonos exclusivos ✅ Tips para jugadores mexicanos.',
      keywords: 'blog casino méxico, noticias casino online, guías juego, estrategias casino, bonos casino méxico, tips gambling',
      openGraph: {
        title: 'Blog Casino México 2025 - Noticias y Guías',
        description: 'Las últimas noticias y guías del mundo de los casinos online en México.',
        url: pageUrl,
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: `${baseUrl}/images/blog-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Blog CasinosPesos'
        }]
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          'es-MX': `${baseUrl}/es/blog`,
          'en-US': `${baseUrl}/en/blog`,
          'x-default': `${baseUrl}/es/blog`
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
  
  return {
    title: 'Casino Mexico Blog 2025 - News & Guides | CasinosPesos',
    description: 'Latest online casino news in Mexico 📰 Gaming guides ✅ Winning strategies ✅ Exclusive bonuses ✅ Tips for Mexican players.',
    keywords: 'casino blog mexico, online casino news, gaming guides, casino strategies, mexican casino bonuses',
    openGraph: {
      title: 'Casino Mexico Blog 2025 - News & Guides',
      description: 'The latest news and guides from the online casino world in Mexico.',
      url: pageUrl,
      siteName: 'CasinosPesos',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/blog`,
        'en-US': `${baseUrl}/en/blog`,
        'x-default': `${baseUrl}/es/blog`
      }
    }
  };
} */

const blogPosts = [
  {
    slug: 'nuevos-casinos-mexico-enero-2025',
    title: 'Los 5 Nuevos Casinos Online que Llegan a México en Enero 2025',
    excerpt: 'Descubre las últimas plataformas de casino que han llegado al mercado mexicano con licencias internacionales, bonos exclusivos y métodos de pago locales como OXXO y SPEI.',
    content: 'El mercado de casinos online en México continúa expandiéndose...',
    author: 'Carlos Mendoza',
    publishDate: '2025-01-15',
    readTime: '5 min',
    category: 'Noticias',
    tags: ['nuevos casinos', 'méxico', '2025', 'licencias'],
    featured: true,
    image: '/images/blog/nuevos-casinos-2025.jpg'
  },
  {
    slug: 'estrategias-blackjack-mexico',
    title: 'Estrategias de Blackjack para Jugadores Mexicanos: Guía Completa 2025',
    excerpt: 'Aprende las mejores estrategias básicas de blackjack adaptadas al mercado mexicano. Incluye tablas de probabilidades y consejos para maximizar tus ganancias.',
    content: 'El blackjack es uno de los juegos más populares...',
    author: 'Ana Rodríguez',
    publishDate: '2025-01-12',
    readTime: '8 min',
    category: 'Guías',
    tags: ['blackjack', 'estrategias', 'guía', 'méxico'],
    featured: false,
    image: '/images/blog/blackjack-estrategias.jpg'
  },
  {
    slug: 'depositar-oxxo-casinos-online',
    title: 'Cómo Depositar en Casinos Online usando OXXO: Guía Paso a Paso',
    excerpt: 'Tutorial completo para depositar dinero en casinos online mexicanos usando OXXO. Ventajas, límites, tiempos de procesamiento y casinos recomendados.',
    content: 'OXXO se ha convertido en el método de pago favorito...',
    author: 'Miguel Torres',
    publishDate: '2025-01-10',
    readTime: '6 min',
    category: 'Guías',
    tags: ['OXXO', 'depósitos', 'métodos pago', 'tutorial'],
    featured: true,
    image: '/images/blog/depositar-oxxo.jpg'
  },
  {
    slug: 'bonos-sin-deposito-febrero-2025',
    title: 'Mejores Bonos Sin Depósito de Febrero 2025 en México',
    excerpt: 'Recopilación actualizada de los mejores bonos sin depósito disponibles para jugadores mexicanos. Códigos promocionales exclusivos y términos claros.',
    content: 'Los bonos sin depósito son perfectos para probar casinos...',
    author: 'Laura García',
    publishDate: '2025-01-08',
    readTime: '4 min',
    category: 'Bonos',
    tags: ['bonos sin depósito', 'febrero 2025', 'códigos promocionales'],
    featured: false,
    image: '/images/blog/bonos-sin-deposito.jpg'
  },
  {
    slug: 'slots-mas-populares-mexico-2025',
    title: 'Top 10: Las Tragamonedas Más Populares en México Durante 2025',
    excerpt: 'Ranking de las slots online más jugadas por mexicanos. Incluye RTP, volatilidad, temática y dónde encontrarlas con los mejores bonos.',
    content: 'Las tragamonedas siguen siendo el juego favorito...',
    author: 'Diego Ramírez',
    publishDate: '2025-01-05',
    readTime: '7 min',
    category: 'Juegos',
    tags: ['slots', 'tragamonedas', 'populares', 'ranking'],
    featured: false,
    image: '/images/blog/slots-populares.jpg'
  },
  {
    slug: 'regulacion-casinos-online-mexico-2025',
    title: 'Estado de la Regulación de Casinos Online en México: Actualización 2025',
    excerpt: 'Análisis completo del marco legal de los casinos online en México. SEGOB, licencias internacionales y qué esperar en 2025.',
    content: 'La regulación de casinos online en México...',
    author: 'Carla Vázquez',
    publishDate: '2025-01-03',
    readTime: '10 min',
    category: 'Legal',
    tags: ['regulación', 'SEGOB', 'legal', 'licencias'],
    featured: true,
    image: '/images/blog/regulacion-mexico.jpg'
  }
];

const categories = [
  { name: 'Todos', value: '', icon: '📚' },
  { name: 'Noticias', value: 'Noticias', icon: '📰' },
  { name: 'Guías', value: 'Guías', icon: '📖' },
  { name: 'Bonos', value: 'Bonos', icon: '🎁' },
  { name: 'Juegos', value: 'Juegos', icon: '🎮' },
  { name: 'Legal', value: 'Legal', icon: '⚖️' }
];

export default function BlogPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const locale = resolvedParams.locale;
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (mounted) {
      fetchPosts();
    }
  }, [selectedCategory, page, mounted]);
  
  useEffect(() => {
    if (mounted) {
      filterPosts();
    }
  }, [posts, searchQuery, mounted]);
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6'
      });
      
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      
      const response = await fetch(`/api/public/blog?${params}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const filterPosts = () => {
    if (!searchQuery) {
      setFilteredPosts(posts);
      return;
    }
    
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setFilteredPosts(filtered);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setSearchQuery('');
  };

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);
  
  // Prevent hydration errors by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <main className="min-h-screen bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-900">Loading...</div>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-gray-900 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Blog</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📰 Blog de Casino
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guías, estrategias y las últimas noticias del mundo de los casinos en línea
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artículos..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-neutral-400 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-primary text-black scale-105'
                    : 'bg-white hover:bg-gray-100 text-gray-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-semibold">{category.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-900">Cargando artículos...</div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && !searchQuery && page === 1 && (
              <div className="mb-12">
                <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                  <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 border border-primary/30 hover:border-primary/50 transition-all duration-300 group">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{(featuredPost.publishedAt || featuredPost.published_at || '').split('T')[0]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime || featuredPost.read_time || 5} min de lectura</span>
                      </div>
                      {featuredPost && featuredPost.views !== undefined && (
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>{(featuredPost.views || 0).toLocaleString()} vistas</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )}
            
            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-900/50" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-900">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{(post.publishedAt || post.published_at || '').split('T')[0]}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime || post.read_time || 5} min</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.views || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{post.likes || 0}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Anterior
                </button>
                <div className="flex items-center gap-2">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          page === pageNum
                            ? 'bg-primary text-gray-900'
                            : 'bg-white text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}

        {/* No results */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron artículos</p>
          </div>
        )}

      </div>
      
      {/* Structured Data */}
      <BreadcrumbStructuredData items={[
        { name: 'Inicio', url: `https://casinospesos.com/${locale}` },
        { name: 'Blog', url: `https://casinospesos.com/${locale}/blog` }
      ]} />
    </main>
  );
}