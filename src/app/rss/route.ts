import { NextResponse } from 'next/server';

// Sample data for RSS feed
const siteUrl = process.env.SITE_URL || 'http://localhost:3002';
const siteName = 'CasinosPesos';
const siteDescription = 'Los mejores casinos online en México - Guías, bonos y estrategias';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  author: string;
  category: string;
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cómo Elegir el Mejor Casino Online en 2024',
    description: 'Guía completa para principiantes sobre cómo evaluar y elegir un casino online seguro y confiable en México.',
    link: `${siteUrl}/guias/1`,
    pubDate: new Date('2024-01-15'),
    author: 'Carlos Mendoza',
    category: 'Principiantes'
  },
  {
    id: '2',
    title: 'Estrategias Avanzadas de Blackjack',
    description: 'Domina el blackjack con estrategias matemáticas probadas y aumenta tus probabilidades de ganar.',
    link: `${siteUrl}/guias/2`,
    pubDate: new Date('2024-01-14'),
    author: 'Ana García',
    category: 'Estrategia'
  },
  {
    id: '3',
    title: 'Gestión de Bankroll: La Clave del Éxito',
    description: 'Aprende a gestionar tu presupuesto de juego de forma responsable y maximiza tu tiempo de entretenimiento.',
    link: `${siteUrl}/guias/3`,
    pubDate: new Date('2024-01-13'),
    author: 'Roberto Silva',
    category: 'Finanzas'
  },
  {
    id: '4',
    title: 'Los Mejores Slots con RTP Alto',
    description: 'Descubre qué son los RTPs y cuáles son las tragamonedas con mejores porcentajes de retorno al jugador.',
    link: `${siteUrl}/guias/4`,
    pubDate: new Date('2024-01-12'),
    author: 'María López',
    category: 'Juegos'
  },
  {
    id: '5',
    title: 'Bonos de Casino: Términos y Condiciones Explicados',
    description: 'Todo lo que necesitas saber sobre rollover, requisitos de apuesta y cómo aprovechar los bonos.',
    link: `${siteUrl}/guias/5`,
    pubDate: new Date('2024-01-11'),
    author: 'Diego Ramírez',
    category: 'Bonos'
  },
  {
    id: '6',
    title: 'Juego Responsable: Señales y Recursos',
    description: 'Identifica las señales de problemas con el juego y conoce los recursos de ayuda disponibles.',
    link: `${siteUrl}/guias/6`,
    pubDate: new Date('2024-01-10'),
    author: 'Laura Fernández',
    category: 'Responsabilidad'
  },
  {
    id: '7',
    title: 'Métodos de Pago Seguros para Casinos Online',
    description: 'Conoce los métodos de pago más seguros y cómo proteger tu información financiera en casinos online.',
    link: `${siteUrl}/guias/7`,
    pubDate: new Date('2024-01-09'),
    author: 'Carlos Mendoza',
    category: 'Finanzas'
  },
  {
    id: '8',
    title: 'Torneos de Poker Online: Estrategias para Principiantes',
    description: 'Aprende las estrategias básicas para participar en torneos de poker online y mejorar tu juego.',
    link: `${siteUrl}/guias/8`,
    pubDate: new Date('2024-01-08'),
    author: 'Ana García',
    category: 'Estrategia'
  },
  {
    id: '9',
    title: 'Casinos con Criptomonedas: Ventajas y Desventajas',
    description: 'Todo lo que necesitas saber sobre jugar en casinos que aceptan Bitcoin y otras criptomonedas.',
    link: `${siteUrl}/guias/9`,
    pubDate: new Date('2024-01-07'),
    author: 'Roberto Silva',
    category: 'Finanzas'
  },
  {
    id: '10',
    title: 'Análisis de Volatilidad en Slots Online',
    description: 'Entiende qué es la volatilidad en las tragamonedas y cómo afecta tu estrategia de juego.',
    link: `${siteUrl}/guias/10`,
    pubDate: new Date('2024-01-06'),
    author: 'María López',
    category: 'Juegos'
  }
];

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function generateRSSItem(post: BlogPost): string {
  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${post.link}</link>
      <guid isPermaLink="true">${post.link}</guid>
      <pubDate>${post.pubDate.toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
      <category>${escapeXml(post.category)}</category>
    </item>`;
}

function generateRSSFeed(posts: BlogPost[]): string {
  const items = posts.map(post => generateRSSItem(post)).join('');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <description>${escapeXml(siteDescription)}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml" />
    <language>es-MX</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    ${items}
  </channel>
</rss>`;
}

export async function GET() {
  try {
    // Sort posts by date (newest first)
    const sortedPosts = blogPosts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
    
    // Generate RSS feed
    const rssFeed = generateRSSFeed(sortedPosts);
    
    // Return RSS feed with proper headers
    return new Response(rssFeed, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to generate RSS feed' },
      { status: 500 }
    );
  }
}