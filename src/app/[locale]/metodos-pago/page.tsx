import { ArrowRight, CheckCircle, Clock, CreditCard, Shield, Star, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const paymentMethods = [
  {
    id: 'oxxo',
    name: 'OXXO',
    logo: '🏪',
    type: 'Efectivo',
    description: 'Depósitos en efectivo en más de 19,000 tiendas',
    depositTime: '5-30 min',
    withdrawalTime: 'No disponible',
    minDeposit: 50,
    maxDeposit: 10000,
    fees: 'Sin comisiones',
    availability: '24/7',
    popularity: 95,
    casinos: 35,
    pros: ['19,000+ ubicaciones', 'Sin banco necesario', 'Anónimo y seguro'],
    cons: ['Solo depósitos', 'Límite de $10,000'],
    featured: true
  },
  {
    id: 'spei',
    name: 'SPEI',
    logo: '🏦',
    type: 'Transferencia',
    description: 'Transferencias bancarias instantáneas',
    depositTime: 'Instantáneo',
    withdrawalTime: '1-24 horas',
    minDeposit: 100,
    maxDeposit: 500000,
    fees: '$8-15 MXN',
    availability: '24/7',
    popularity: 88,
    casinos: 32,
    pros: ['Instantáneo', 'Altos límites', 'Retiros disponibles'],
    cons: ['Requiere cuenta bancaria', 'Pequeña comisión'],
    featured: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '💳',
    type: 'E-wallet',
    description: 'Monedero electrónico internacional',
    depositTime: 'Instantáneo',
    withdrawalTime: '2-24 horas',
    minDeposit: 200,
    maxDeposit: 100000,
    fees: 'Sin comisiones',
    availability: '24/7',
    popularity: 75,
    casinos: 18,
    pros: ['Seguro y confiable', 'Protección al comprador', 'Internacional'],
    cons: ['No todos los casinos', 'Verificación requerida'],
    featured: true
  },
  {
    id: 'visa-mastercard',
    name: 'Visa/Mastercard',
    logo: '💳',
    type: 'Tarjeta',
    description: 'Tarjetas de crédito y débito',
    depositTime: 'Instantáneo',
    withdrawalTime: '3-5 días',
    minDeposit: 100,
    maxDeposit: 50000,
    fees: '2-3%',
    availability: '24/7',
    popularity: 82,
    casinos: 38,
    pros: ['Ampliamente aceptado', 'Instantáneo', 'Puntos de recompensa'],
    cons: ['Comisiones', 'Retiros lentos'],
    featured: false
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    logo: '₿',
    type: 'Cripto',
    description: 'Criptomoneda líder mundial',
    depositTime: '10-30 min',
    withdrawalTime: '10 min - 1 hora',
    minDeposit: 500,
    maxDeposit: 1000000,
    fees: 'Red fees (~$1-5)',
    availability: '24/7',
    popularity: 45,
    casinos: 12,
    pros: ['Anónimo', 'Sin límites bancarios', 'Rápido'],
    cons: ['Volátil', 'Curva de aprendizaje'],
    featured: false
  },
  {
    id: 'skrill',
    name: 'Skrill',
    logo: '💰',
    type: 'E-wallet',
    description: 'Monedero electrónico popular',
    depositTime: 'Instantáneo',
    withdrawalTime: '1-24 horas',
    minDeposit: 150,
    maxDeposit: 80000,
    fees: '1-2%',
    availability: '24/7',
    popularity: 60,
    casinos: 22,
    pros: ['Rápido', 'Internacional', 'VIP program'],
    cons: ['Comisiones', 'No muy popular en México'],
    featured: false
  },
  {
    id: 'neteller',
    name: 'Neteller',
    logo: '💚',
    type: 'E-wallet',
    description: 'E-wallet para casinos online',
    depositTime: 'Instantáneo',
    withdrawalTime: '1-24 horas',
    minDeposit: 150,
    maxDeposit: 80000,
    fees: '1-2%',
    availability: '24/7',
    popularity: 55,
    casinos: 20,
    pros: ['Especializado en casinos', 'Programa VIP', 'Tarjeta prepagada'],
    cons: ['Comisiones', 'Verificación requerida'],
    featured: false
  },
  {
    id: 'todito-cash',
    name: 'Todito Cash',
    logo: '🎫',
    type: 'Prepago',
    description: 'Tarjeta prepagada mexicana',
    depositTime: '5-15 min',
    withdrawalTime: 'No disponible',
    minDeposit: 100,
    maxDeposit: 5000,
    fees: 'Sin comisiones',
    availability: 'Horario tienda',
    popularity: 40,
    casinos: 8,
    pros: ['Fácil de usar', 'Sin banco', 'Control de gastos'],
    cons: ['Solo depósitos', 'Límites bajos'],
    featured: false
  }
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  const baseUrl = 'https://casinospesos.com';
  const pageUrl = `${baseUrl}/${locale}/metodos-pago`;
  
  const title = isSpanish 
    ? 'Métodos de Pago para Casinos Online en México 2025'
    : 'Payment Methods for Online Casinos in Mexico 2025';
    
  const description = isSpanish
    ? 'Guía completa de métodos de pago: OXXO, SPEI, PayPal, Bitcoin y más. Compara tiempos, comisiones y límites para casinos online mexicanos.'
    : 'Complete payment methods guide: OXXO, SPEI, PayPal, Bitcoin and more. Compare times, fees and limits for Mexican online casinos.';
  
  if (isSpanish) {
    return {
      title: `${title} | CasinosPesos`,
      description,
      keywords: 'métodos pago casino, OXXO casino, SPEI casino, PayPal casino México, depositar casino online, retirar casino',
      openGraph: {
        title,
        description,
        url: pageUrl,
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: `${baseUrl}/images/og-metodos-pago.jpg`,
          width: 1200,
          height: 630,
          alt: 'Métodos de Pago Casinos Online'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          'es-MX': `${baseUrl}/es/metodos-pago`,
          'en-US': `${baseUrl}/en/payment-methods`,
          'x-default': `${baseUrl}/es/metodos-pago`
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
    title: `${title} | CasinosPesos`,
    description,
    keywords: 'casino payment methods, OXXO casino, SPEI casino, PayPal casino Mexico, deposit online casino',
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'CasinosPesos',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/metodos-pago`,
        'en-US': `${baseUrl}/en/payment-methods`,
        'x-default': `${baseUrl}/es/metodos-pago`
      }
    }
  };
}

export default async function MetodosPagoPage({ params }: PageProps) {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  const featuredMethods = paymentMethods.filter(m => m.featured);
  const otherMethods = paymentMethods.filter(m => !m.featured);

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CreditCard className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {isSpanish ? 'Métodos de Pago' : 'Payment Methods'}
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? 'Descubre los mejores métodos de pago para casinos online en México. Compara tiempos, comisiones y límites para elegir la opción perfecta.'
              : 'Discover the best payment methods for online casinos in Mexico. Compare times, fees and limits to choose the perfect option.'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">8+</div>
            <div className="text-sm text-gray-500">{isSpanish ? 'Métodos Disponibles' : 'Available Methods'}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-accent mb-1">$50</div>
            <div className="text-sm text-gray-500">{isSpanish ? 'Depósito Mínimo' : 'Min Deposit'}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">5min</div>
            <div className="text-sm text-gray-500">{isSpanish ? 'Depósito Más Rápido' : 'Fastest Deposit'}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-accent mb-1">24/7</div>
            <div className="text-sm text-gray-500">{isSpanish ? 'Disponibilidad' : 'Availability'}</div>
          </div>
        </div>

        {/* Featured Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-primary" />
            {isSpanish ? 'Métodos Destacados' : 'Featured Methods'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredMethods.map(method => (
              <Link
                key={method.id}
                href={`/${locale}/metodos-pago/${method.id}`}
                className="bg-gradient-to-br from-neutral-800 to-neutral-800/50 rounded-xl p-6 border border-gray-200 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{method.logo}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {method.name}
                      </h3>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {method.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{isSpanish ? 'Popularidad' : 'Popularity'}</div>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${method.popularity}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{method.popularity}%</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{method.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50/50 rounded-lg p-2">
                    <div className="text-xs text-gray-500 mb-1">
                      {isSpanish ? 'Depósito' : 'Deposit'}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      {method.depositTime}
                    </div>
                  </div>
                  <div className="bg-gray-50/50 rounded-lg p-2">
                    <div className="text-xs text-gray-500 mb-1">
                      {isSpanish ? 'Retiro' : 'Withdrawal'}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-accent" />
                      {method.withdrawalTime}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {isSpanish ? 'Límites:' : 'Limits:'} ${method.minDeposit}-${method.maxDeposit.toLocaleString()}
                  </span>
                  <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    {isSpanish ? 'Ver más' : 'Learn more'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-400">
                      {method.casinos} {isSpanish ? 'casinos' : 'casinos'}
                    </span>
                    <span className="text-gray-500">{method.fees}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Methods Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isSpanish ? '💳 Todos los Métodos de Pago' : '💳 All Payment Methods'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherMethods.map(method => (
              <Link
                key={method.id}
                href={`/${locale}/metodos-pago/${method.id}`}
                className="bg-white rounded-xl p-4 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{method.logo}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {method.name}
                    </h3>
                    <span className="text-xs text-gray-500">{method.type}</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{isSpanish ? 'Depósito:' : 'Deposit:'}</span>
                    <span className="text-gray-900">{method.depositTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{isSpanish ? 'Límites:' : 'Limits:'}</span>
                    <span className="text-gray-900">${method.minDeposit}-${method.maxDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{isSpanish ? 'Casinos:' : 'Casinos:'}</span>
                    <span className="text-green-400">{method.casinos}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isSpanish ? '📊 Comparación Rápida' : '📊 Quick Comparison'}
          </h2>
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 text-gray-500 font-semibold">
                      {isSpanish ? 'Método' : 'Method'}
                    </th>
                    <th className="text-center p-4 text-gray-500 font-semibold">
                      {isSpanish ? 'Tipo' : 'Type'}
                    </th>
                    <th className="text-center p-4 text-gray-500 font-semibold">
                      {isSpanish ? 'Depósito' : 'Deposit'}
                    </th>
                    <th className="text-center p-4 text-gray-500 font-semibold">
                      {isSpanish ? 'Retiro' : 'Withdrawal'}
                    </th>
                    <th className="text-center p-4 text-gray-500 font-semibold">
                      {isSpanish ? 'Comisiones' : 'Fees'}
                    </th>
                    <th className="text-center p-4 text-gray-500 font-semibold">
                      {isSpanish ? 'Popularidad' : 'Popularity'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((method, index) => (
                    <tr key={method.id} className={index % 2 === 0 ? 'bg-white' : 'bg-white/50'}>
                      <td className="p-4">
                        <Link 
                          href={`/${locale}/metodos-pago/${method.id}`}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <span className="text-xl">{method.logo}</span>
                          <span className="font-semibold text-gray-900">{method.name}</span>
                        </Link>
                      </td>
                      <td className="text-center p-4">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                          {method.type}
                        </span>
                      </td>
                      <td className="text-center p-4 text-sm text-gray-900">
                        {method.depositTime}
                      </td>
                      <td className="text-center p-4 text-sm">
                        {method.withdrawalTime === 'No disponible' ? (
                          <span className="text-red-400">✗</span>
                        ) : (
                          <span className="text-gray-900">{method.withdrawalTime}</span>
                        )}
                      </td>
                      <td className="text-center p-4 text-sm text-gray-900">
                        {method.fees}
                      </td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-accent"
                              style={{ width: `${method.popularity}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{method.popularity}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-8 border border-primary/30">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              {isSpanish ? 'Consejos para Elegir tu Método de Pago' : 'Tips for Choosing Your Payment Method'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  {isSpanish ? 'Para Depósitos Rápidos' : 'For Fast Deposits'}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {isSpanish 
                    ? 'SPEI y PayPal son las opciones más rápidas con depósitos instantáneos. OXXO toma 5-30 minutos pero es ideal si no tienes cuenta bancaria.'
                    : 'SPEI and PayPal are the fastest options with instant deposits. OXXO takes 5-30 minutes but is ideal if you don\'t have a bank account.'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  {isSpanish ? 'Para Mayor Seguridad' : 'For Maximum Security'}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {isSpanish 
                    ? 'PayPal ofrece protección al comprador. Las criptomonedas brindan anonimato. OXXO no requiere compartir datos bancarios.'
                    : 'PayPal offers buyer protection. Cryptocurrencies provide anonymity. OXXO doesn\'t require sharing bank details.'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {isSpanish ? 'Para Límites Altos' : 'For High Limits'}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {isSpanish 
                    ? 'SPEI permite hasta $500,000 MXN por transacción. Bitcoin no tiene límites bancarios tradicionales.'
                    : 'SPEI allows up to $500,000 MXN per transaction. Bitcoin has no traditional banking limits.'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  {isSpanish ? 'Para Principiantes' : 'For Beginners'}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {isSpanish 
                    ? 'OXXO es la opción más simple: solo necesitas efectivo y el código de pago. No requiere experiencia previa ni cuenta bancaria.'
                    : 'OXXO is the simplest option: you only need cash and the payment code. No prior experience or bank account required.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Casinos by Payment Method */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isSpanish ? '🎰 Casinos por Método de Pago' : '🎰 Casinos by Payment Method'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                🏪 {isSpanish ? 'Mejores con OXXO' : 'Best with OXXO'}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/casinos/bet365`} className="text-gray-600 hover:text-primary transition-colors">
                    Bet365
                  </Link>
                  <span className="text-xs text-green-400">{isSpanish ? 'Sin comisión' : 'No fees'}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/casinos/codere`} className="text-gray-600 hover:text-primary transition-colors">
                    Codere
                  </Link>
                  <span className="text-xs text-green-400">{isSpanish ? '5-10 min' : '5-10 min'}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/casinos/caliente`} className="text-gray-600 hover:text-primary transition-colors">
                    Caliente
                  </Link>
                  <span className="text-xs text-green-400">{isSpanish ? 'Min $200' : 'Min $200'}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                🏦 {isSpanish ? 'Mejores con SPEI' : 'Best with SPEI'}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/casinos/bet365`} className="text-gray-600 hover:text-primary transition-colors">
                    Bet365
                  </Link>
                  <span className="text-xs text-green-400">{isSpanish ? 'Instantáneo' : 'Instant'}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/casinos/betano`} className="text-gray-600 hover:text-primary transition-colors">
                    Betano
                  </Link>
                  <span className="text-xs text-green-400">{isSpanish ? 'Retiros 24h' : 'Withdrawals 24h'}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/casinos/strendus`} className="text-gray-600 hover:text-primary transition-colors">
                    Strendus
                  </Link>
                  <span className="text-xs text-green-400">{isSpanish ? 'Sin límites' : 'No limits'}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                ₿ {isSpanish ? 'Mejores con Cripto' : 'Best with Crypto'}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/casinos/bitstarz`} className="text-gray-600 hover:text-primary transition-colors">
                    BitStarz
                  </Link>
                  <span className="text-xs text-green-400">{isSpanish ? 'Retiros 10 min' : 'Withdrawals 10 min'}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/casinos/betano`} className="text-gray-600 hover:text-primary transition-colors">
                    Betano
                  </Link>
                  <span className="text-xs text-green-400">{isSpanish ? 'Multi-cripto' : 'Multi-crypto'}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <Link href={`/${locale}/casinos/mystake`} className="text-gray-600 hover:text-primary transition-colors">
                    MyStake
                  </Link>
                  <span className="text-xs text-green-400">{isSpanish ? 'BTC bonus' : 'BTC bonus'}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": isSpanish ? "¿Cuál es el método de pago más rápido?" : "What's the fastest payment method?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": isSpanish 
                    ? "SPEI y PayPal ofrecen depósitos instantáneos. Para retiros, Bitcoin es el más rápido con 10 minutos."
                    : "SPEI and PayPal offer instant deposits. For withdrawals, Bitcoin is the fastest at 10 minutes."
                }
              },
              {
                "@type": "Question",
                "name": isSpanish ? "¿Puedo depositar sin cuenta bancaria?" : "Can I deposit without a bank account?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": isSpanish 
                    ? "Sí, OXXO y Todito Cash permiten depósitos en efectivo sin necesidad de cuenta bancaria."
                    : "Yes, OXXO and Todito Cash allow cash deposits without a bank account."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}