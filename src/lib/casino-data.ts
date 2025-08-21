// Mock casino data for development
export function getAllCasinos() {
  return [
    {
      id: 'bet365',
      name: 'Bet365 Casino',
      slug: 'bet365',
      logo: '/images/casinos/bet365.png',
      rating: 4.9,
      established: 2001,
      website: 'https://www.bet365.com',
      affiliateLink: 'https://www.bet365.com/?affiliate=365_123456',
      features: ['Live Casino', 'Sports Betting', 'Mobile App'],
      languages: ['Spanish', 'English'],
      currencies: ['MXN', 'USD', 'EUR'],
      licenses: ['Gibraltar', 'UK Gambling Commission'],
      supportedCountries: ['Mexico', 'UK', 'Spain'],
      restrictedCountries: ['USA', 'France'],
      description: 'One of the world\'s leading online gambling companies',
      isActive: true,
      isFeatured: true,
      priority: 1,
      createdAt: new Date('2025-01-01').toISOString(),
      lastModified: new Date().toISOString()
    },
    {
      id: 'codere',
      name: 'Codere Casino',
      slug: 'codere',
      logo: '/images/casinos/codere.png',
      rating: 4.8,
      established: 1980,
      website: 'https://www.codere.mx',
      affiliateLink: 'https://www.codere.mx/?ref=casino123',
      features: ['Mexican License', 'Local Payment Methods', 'Live Betting'],
      languages: ['Spanish'],
      currencies: ['MXN'],
      licenses: ['SEGOB Mexico'],
      supportedCountries: ['Mexico'],
      restrictedCountries: [],
      description: 'Leading casino operator in Mexico',
      isActive: true,
      isFeatured: true,
      priority: 2,
      createdAt: new Date('2025-01-02').toISOString(),
      lastModified: new Date().toISOString()
    },
    {
      id: 'caliente',
      name: 'Caliente Casino',
      slug: 'caliente',
      logo: '/images/casinos/caliente.png',
      rating: 4.7,
      established: 1916,
      website: 'https://www.caliente.mx',
      affiliateLink: 'https://www.caliente.mx/?partner=cp123',
      features: ['Physical Locations', 'Sports Book', 'Casino Games'],
      languages: ['Spanish', 'English'],
      currencies: ['MXN', 'USD'],
      licenses: ['Mexico Gaming License'],
      supportedCountries: ['Mexico'],
      restrictedCountries: [],
      description: 'Mexico\'s premier sports betting and casino brand',
      isActive: true,
      isFeatured: false,
      priority: 3,
      createdAt: new Date('2025-01-03').toISOString(),
      lastModified: new Date().toISOString()
    }
  ];
}

export function getCasinoById(id: string) {
  return getAllCasinos().find(casino => casino.id === id);
}

export function getCasinoBySlug(slug: string) {
  return getAllCasinos().find(casino => casino.slug === slug);
}

export function getFeaturedCasinos() {
  return getAllCasinos().filter(casino => casino.isFeatured);
}

export function getActiveCasinos() {
  return getAllCasinos().filter(casino => casino.isActive);
}