import type { MetadataRoute } from 'next'

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

  // Dynamic casino pages - загружаем из API
  let casinoUrls: MetadataRoute.Sitemap = []
  try {
    // Используем относительный путь для API при сборке
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? `${baseUrl}/api/casinos`
      : 'http://localhost:3002/api/casinos'
    
    const response = await fetch(apiUrl, {
      cache: 'no-store' // Всегда получаем свежие данные
    })
    
    if (response.ok) {
      const casinos = await response.json()
      casinoUrls = locales.flatMap(locale =>
        casinos.map((casino: any) => ({
          url: `${baseUrl}/${locale}/casinos/${casino.id || casino.slug}`,
          lastModified: new Date(casino.updatedAt || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      )
    }
  } catch (error) {
    console.error('Error fetching casinos for sitemap:', error)
    // Fallback на статический список если API недоступен
    const fallbackCasinos = ['bet365', 'codere', 'caliente', 'strendus', 'betfair']
    casinoUrls = locales.flatMap(locale =>
      fallbackCasinos.map(casino => ({
        url: `${baseUrl}/${locale}/casinos/${casino}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    )
  }

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

  // Dynamic blog posts - загружаем из API
  let blogUrls: MetadataRoute.Sitemap = []
  try {
    const apiUrl = process.env.NODE_ENV === 'production'
      ? `${baseUrl}/api/public/blog`
      : 'http://localhost:3002/api/public/blog'
    
    const response = await fetch(apiUrl, {
      cache: 'no-store'
    })
    
    if (response.ok) {
      const data = await response.json()
      blogUrls = locales.flatMap(locale =>
        data.posts.map((post: any) => ({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.publishedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
      )
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    // Fallback
    const fallbackPosts = ['nuevos-casinos-mexico-enero-2024']
    blogUrls = locales.flatMap(locale =>
      fallbackPosts.map(slug => ({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    )
  }

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