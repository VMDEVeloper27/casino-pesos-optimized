import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://casinospesos.com'
  const locales = ['es', 'en']
  
  // Static pages with proper priorities
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/casinos', priority: 0.9, changeFrequency: 'daily' },
    { path: '/bonos', priority: 0.8, changeFrequency: 'daily' },
    { path: '/juegos', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
    { path: '/guias', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/comparar', priority: 0.8, changeFrequency: 'daily' },
    { path: '/calculadora', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/metodos-pago', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/juego-responsable', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/sobre-nosotros', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/contacto', priority: 0.4, changeFrequency: 'monthly' },
  ]
  
  const staticUrls = locales.flatMap(locale => 
    staticPages.map(page => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency as 'daily' | 'weekly' | 'monthly',
      priority: page.priority,
    }))
  )

  // Static casino pages - используем статический список
  const casinoList = ['bet365', 'codere', 'caliente', 'strendus', 'betfair', 
                       'leovegas', 'pinnacle', '1xbet', 'melbet', 'betcris',
                       'betano', 'bodog', 'novibet', 'parimatch', 'william-hill']
  const casinoUrls = locales.flatMap(locale =>
    casinoList.map(casino => ({
      url: `${baseUrl}/${locale}/casinos/${casino}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

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

  // Static blog posts list
  const blogPosts = [
    'nuevos-casinos-mexico-enero-2024',
    'como-ganar-tragamonedas',
    'mejores-bonos-sin-deposito',
    'casinos-con-pagos-rapidos',
    'estrategias-blackjack'
  ]
  const blogUrls = locales.flatMap(locale =>
    blogPosts.map(slug => ({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  // Payment method pages
  const paymentMethods = ['oxxo', 'spei', 'paypal', 'tarjeta-credito', 'tarjeta-debito', 'criptomonedas']
  const paymentUrls = locales.flatMap(locale =>
    paymentMethods.map(method => ({
      url: `${baseUrl}/${locale}/metodos-pago/${method}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  )

  return [
    ...staticUrls,
    ...casinoUrls,
    ...bonusPages,
    ...blogUrls,
    ...paymentUrls,
  ]
}