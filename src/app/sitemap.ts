import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://casinospesos.com'
  
  // Static pages
  const staticPages = [
    '',
    '/es',
    '/en',
    '/es/casinos',
    '/en/casinos',
    '/es/bonos',
    '/en/bonuses',
    '/es/guias',
    '/en/guides',
    '/es/comparar',
    '/en/compare',
    '/es/blog',
    '/en/blog'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' || route === '/es' ? 1 : 0.8,
  }))

  // Dynamic casino pages
  const casinos = [
    'bet365', 'codere', 'caliente', 'strendus', 'betfair', 'spin-casino', 
    '888-casino', 'mystake', 'leovegas', 'playuzu', 'jackpot-city', 
    'royal-panda', 'casumo', 'betway', 'mr-green', 'rizk', 'dunder',
    'cherry-casino', 'genesis', 'n1-casino', 'wildz', 'energy',
    'wazamba', 'bitstarz', 'nomini', 'casino-euro', 'vera-john',
    'intercasino', 'lucky-days', 'temple-nile', 'slotsmillion',
    'yako', 'winz', 'spinamba', 'lucky-luke', 'spinia', 'booi', 'turbico'
  ];
  
  const casinoPages = casinos.flatMap(casino => [
    {
      url: `${baseUrl}/es/casinos/${casino}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/casinos/${casino}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  ])

  // Bonus category pages
  const bonusCategories = ['sin-deposito', 'bienvenida', 'giros-gratis', 'cashback', 'recarga', 'vip'];
  const bonusPages = bonusCategories.flatMap(category => [
    {
      url: `${baseUrl}/es/bonos/${category}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/bonuses/${category}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }
  ])

  // Blog post pages
  const blogSlugs = [
    'nuevos-casinos-mexico-enero-2024',
    'estrategias-blackjack-mexico',
    'depositar-oxxo-casinos-online',
    'bonos-sin-deposito-febrero-2024',
    'slots-mas-populares-mexico-2024',
    'regulacion-casinos-online-mexico-2024'
  ];
  const blogPages = blogSlugs.flatMap(slug => [
    {
      url: `${baseUrl}/es/blog/${slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/blog/${slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  ])

  return [...staticPages, ...casinoPages, ...bonusPages, ...blogPages]
}