import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { getCanonicalUrl } from '@/lib/canonical';
import { supabase } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const isSpanish = locale === 'es';
  const pageUrl = getCanonicalUrl('/blog', locale);
  
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
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Blog CasinosPesos'
        }]
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          'es-MX': getCanonicalUrl('/blog', 'es'),
          'en-US': getCanonicalUrl('/blog', 'en'),
          'x-default': getCanonicalUrl('/blog', 'es')
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
      images: [{
        url: 'https://www.casinospesos.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'CasinosPesos Blog'
      }]
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': getCanonicalUrl('/blog', 'es'),
        'en-US': getCanonicalUrl('/blog', 'en'),
        'x-default': getCanonicalUrl('/blog', 'es')
      }
    }
  };
}

// Fetch blog posts from database
async function getBlogPosts() {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(20);
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
    
    // Format posts to match the expected structure
    return (posts || []).map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title_es || post.title,
      excerpt: post.excerpt_es || post.excerpt,
      author: post.author,
      authorRole: post.author_role,
      category: post.category,
      tags: post.tags || [],
      publishedAt: post.published_at,
      readTime: post.read_time || 5,
      views: post.views || 0,
      likes: post.likes || 0,
      featured_image: post.featured_image // This is the key field for images
    }));
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
}

// Mock blog posts as fallback
const mockBlogPosts = [
  {
    id: '1',
    slug: 'regulacion-casinos-online-mexico-2025',
    title: 'Nueva Regulación de Casinos Online en México: Lo Que Necesitas Saber en 2025',
    excerpt: 'Análisis completo de los cambios en la legislación mexicana sobre juegos de azar online. Descubre cómo afectará a jugadores y operadores.',
    author: 'Carlos Mendoza',
    authorRole: 'Editor Principal',
    category: 'Noticias',
    tags: ['regulación', 'legal', 'méxico', '2025'],
    publishedAt: '2025-01-15',
    readTime: 5,
    views: 1250,
    likes: 89,
    featured_image: '/images/blog/regulacion-mexico.jpg'
  },
  {
    id: '2',
    slug: 'estrategias-blackjack-mexico',
    title: 'Estrategias de Blackjack para Jugadores Mexicanos: Guía Completa 2025',
    excerpt: 'Aprende las mejores estrategias básicas de blackjack adaptadas al mercado mexicano. Incluye tablas de probabilidades y consejos para maximizar tus ganancias.',
    author: 'Ana Rodríguez',
    authorRole: 'Experta en Juegos',
    category: 'Guías',
    tags: ['blackjack', 'estrategias', 'guía', 'méxico'],
    publishedAt: '2025-01-12',
    readTime: 8,
    views: 890,
    likes: 67
  },
  {
    id: '3',
    slug: 'depositar-oxxo-casinos-online',
    title: 'Cómo Depositar en Casinos Online usando OXXO: Guía Paso a Paso',
    excerpt: 'Tutorial completo para depositar dinero en casinos online mexicanos usando OXXO. Ventajas, límites, tiempos de procesamiento y casinos recomendados.',
    author: 'Miguel Torres',
    authorRole: 'Analista de Pagos',
    category: 'Guías',
    tags: ['OXXO', 'depósitos', 'métodos pago', 'tutorial'],
    publishedAt: '2025-01-10',
    readTime: 6,
    views: 2100,
    likes: 145,
    featured_image: '/images/blog/depositar-oxxo.jpg'
  },
  {
    id: '4',
    slug: 'bonos-sin-deposito-febrero-2025',
    title: 'Mejores Bonos Sin Depósito de Febrero 2025 en México',
    excerpt: 'Recopilación actualizada de los mejores bonos sin depósito disponibles para jugadores mexicanos. Códigos promocionales exclusivos y términos claros.',
    author: 'Laura García',
    authorRole: 'Especialista en Bonos',
    category: 'Bonos',
    tags: ['bonos sin depósito', 'febrero 2025', 'códigos promocionales'],
    publishedAt: '2025-01-08',
    readTime: 4,
    views: 3450,
    likes: 234
  },
  {
    id: '5',
    slug: 'slots-mas-populares-mexico-2025',
    title: 'Top 10: Las Tragamonedas Más Populares en México Durante 2025',
    excerpt: 'Ranking de las slots online más jugadas por mexicanos. Incluye RTP, volatilidad, temática y dónde encontrarlas con los mejores bonos.',
    author: 'Diego Ramírez',
    authorRole: 'Revisor de Juegos',
    category: 'Juegos',
    tags: ['slots', 'tragamonedas', 'populares', 'ranking'],
    publishedAt: '2025-01-05',
    readTime: 7,
    views: 1890,
    likes: 156
  },
  {
    id: '6',
    slug: 'responsable-gambling-mexico',
    title: 'Juego Responsable: Herramientas y Recursos para Jugadores Mexicanos',
    excerpt: 'Guía completa sobre juego responsable, límites de depósito, autoexclusión y recursos de ayuda disponibles en México.',
    author: 'Patricia Hernández',
    authorRole: 'Psicóloga Especializada',
    category: 'Legal',
    tags: ['juego responsable', 'autoexclusión', 'límites', 'ayuda'],
    publishedAt: '2025-01-03',
    readTime: 10,
    views: 670,
    likes: 89
  }
];

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  
  // Fetch real blog posts from database
  const dbPosts = await getBlogPosts();
  
  // If no posts from database, use mock data as fallback
  const blogPosts = dbPosts.length > 0 ? dbPosts : mockBlogPosts;
  
  return <BlogClient locale={locale} initialPosts={blogPosts} />;
}