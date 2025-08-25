import { getAllCasinos } from '@/lib/casino-database';

export async function GET() {
  const baseUrl = 'https://www.casinospesos.com';
  const casinos = await getAllCasinos();
  
  // Define all static pages
  const staticPages = [
    { path: '/es', priority: 1.0, changeFreq: 'daily' },
    { path: '/en', priority: 0.9, changeFreq: 'daily' },
    { path: '/es/casinos', priority: 0.9, changeFreq: 'daily' },
    { path: '/en/casinos', priority: 0.8, changeFreq: 'daily' },
    { path: '/es/comparar', priority: 0.8, changeFreq: 'weekly' },
    { path: '/en/compare', priority: 0.7, changeFreq: 'weekly' },
    { path: '/es/juegos', priority: 0.8, changeFreq: 'weekly' },
    { path: '/en/games', priority: 0.7, changeFreq: 'weekly' },
    { path: '/es/calculadora', priority: 0.7, changeFreq: 'monthly' },
    { path: '/en/calculator', priority: 0.6, changeFreq: 'monthly' },
    { path: '/es/juego-responsable', priority: 0.6, changeFreq: 'monthly' },
    { path: '/en/responsible-gaming', priority: 0.5, changeFreq: 'monthly' },
    { path: '/es/sobre-nosotros', priority: 0.5, changeFreq: 'monthly' },
    { path: '/en/about', priority: 0.4, changeFreq: 'monthly' },
    { path: '/es/terms', priority: 0.3, changeFreq: 'yearly' },
    { path: '/en/terms', priority: 0.3, changeFreq: 'yearly' },
    { path: '/es/privacy', priority: 0.3, changeFreq: 'yearly' },
    { path: '/en/privacy', priority: 0.3, changeFreq: 'yearly' },
    { path: '/es/cookies', priority: 0.3, changeFreq: 'yearly' },
    { path: '/en/cookies', priority: 0.3, changeFreq: 'yearly' },
  ];

  // Generate casino detail pages
  const casinoPages = casinos.flatMap(casino => [
    { path: `/es/casinos/${casino.slug}`, priority: 0.8, changeFreq: 'weekly' },
    { path: `/en/casinos/${casino.slug}`, priority: 0.7, changeFreq: 'weekly' },
  ]);

  const allPages = [...staticPages, ...casinoPages];
  const lastModified = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.path.includes('/es/') ? `<xhtml:link rel="alternate" hreflang="es-MX" href="${baseUrl}${page.path}"/>
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}${page.path.replace('/es/', '/en/')}"/>` : 
    `<xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}${page.path}"/>
    <xhtml:link rel="alternate" hreflang="es-MX" href="${baseUrl}${page.path.replace('/en/', '/es/')}"/>`}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}