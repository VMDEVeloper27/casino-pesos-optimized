import { AlertCircle, ArrowRight, CheckCircle, ChevronDown, ChevronRight, DollarSign, HelpCircle, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCasinos } from '@/lib/casino-database';

interface PageProps {
  params: Promise<{ locale: string; method: string }>;
}

interface PaymentMethodData {
  name: string;
  logo: string;
  type: string;
  tagline: string;
  description: string;
  stats: Record<string, string>;
  limits: {
    minDeposit: number;
    maxDeposit: number;
    dailyLimit: number | string;
    monthlyLimit: number | string;
    minWithdrawal: number | string;
    maxWithdrawal: number | string;
  };
  fees: {
    deposit: string;
    withdrawal: string;
    oxxoFee?: string;
    bankFee?: string;
  };
  howToDeposit?: string[];
  pros: string[];
  cons: string[];
  topCasinos: Array<{
    id: string;
    name: string;
    bonus: string;
    minDeposit: number;
    processingTime: string;
    rating: number;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  alternatives?: string[];
}

const methodsData: Record<string, PaymentMethodData> = {
  'oxxo': {
    name: 'OXXO',
    logo: '🏪',
    type: 'Efectivo',
    tagline: 'El método de pago más popular en México',
    description: 'OXXO es la cadena de tiendas de conveniencia más grande de México con más de 19,000 ubicaciones. Permite realizar depósitos en efectivo a casinos online de manera rápida y segura sin necesidad de cuenta bancaria o tarjeta de crédito.',
    stats: {
      stores: '19,000+',
      availability: '24/7',
      processingTime: '5-30 min',
      userBase: '15M+'
    },
    limits: {
      minDeposit: 50,
      maxDeposit: 10000,
      dailyLimit: 15000,
      monthlyLimit: 100000,
      minWithdrawal: 'No disponible',
      maxWithdrawal: 'No disponible'
    },
    fees: {
      deposit: 'Sin comisiones en la mayoría de casinos',
      withdrawal: 'No aplica',
      oxxoFee: 'Sin cargo adicional'
    },
    howToDeposit: [
      'Selecciona OXXO como método de pago en tu casino',
      'Ingresa el monto que deseas depositar (mínimo $50 MXN)',
      'Recibe un código de barras o referencia única',
      'Ve a cualquier tienda OXXO con el código y efectivo',
      'Muestra el código al cajero y realiza el pago',
      'Guarda tu ticket como comprobante',
      'El dinero aparece en tu cuenta en 5-30 minutos'
    ],
    pros: [
      'Más de 19,000 ubicaciones en todo México',
      'No requiere cuenta bancaria ni tarjeta',
      'Depósitos anónimos y seguros',
      'Disponible 24/7 en la mayoría de tiendas',
      'Sin comisiones en la mayoría de casinos',
      'Proceso simple y rápido',
      'Ideal para control de gastos'
    ],
    cons: [
      'Solo permite depósitos, no retiros',
      'Límite máximo de $10,000 MXN por transacción',
      'El código puede expirar en 24-48 horas',
      'Necesitas desplazarte a una tienda física',
      'No disponible para transacciones internacionales'
    ],
    topCasinos: [], // Will be populated from database
    faqs: [
      {
        question: '¿Cuánto tarda en reflejarse mi depósito?',
        answer: 'Normalmente entre 5 y 30 minutos. En casos excepcionales puede tardar hasta 1 hora.'
      },
      {
        question: '¿Puedo hacer retiros a OXXO?',
        answer: 'No, OXXO solo permite depósitos. Para retirar necesitarás usar otro método como SPEI o transferencia bancaria.'
      },
      {
        question: '¿Hay alguna comisión por depositar con OXXO?',
        answer: 'La mayoría de casinos no cobran comisión. OXXO tampoco cobra cargo adicional por el servicio.'
      },
      {
        question: '¿Qué hago si mi depósito no aparece?',
        answer: 'Guarda tu ticket de OXXO y contacta al soporte del casino con el número de referencia. Ellos pueden rastrear tu pago.'
      },
      {
        question: '¿Puedo depositar en dólares?',
        answer: 'No directamente. OXXO solo acepta pesos mexicanos, pero el casino hará la conversión automática si tu cuenta está en dólares.'
      }
    ],
    alternatives: ['spei', 'paypal', 'visa-mastercard']
  },
  'spei': {
    name: 'SPEI',
    logo: '🏦',
    type: 'Transferencia Bancaria',
    tagline: 'Sistema de pagos electrónicos interbancarios',
    description: 'SPEI (Sistema de Pagos Electrónicos Interbancarios) es el sistema oficial de transferencias electrónicas de México operado por Banxico. Permite transferencias instantáneas entre cuentas bancarias las 24 horas del día.',
    stats: {
      banks: '90+',
      availability: '24/7',
      processingTime: 'Instantáneo',
      userBase: '25M+'
    },
    limits: {
      minDeposit: 100,
      maxDeposit: 500000,
      dailyLimit: 'Según tu banco',
      monthlyLimit: 'Sin límite',
      minWithdrawal: 500,
      maxWithdrawal: 100000
    },
    fees: {
      deposit: '$8-15 MXN por transacción',
      withdrawal: 'Generalmente gratis',
      bankFee: 'Varía según banco'
    },
    topCasinos: [], // Will be populated from database
    pros: [
      'Transferencias instantáneas 24/7',
      'Seguridad garantizada por Banxico',
      'Disponible en todos los bancos mexicanos',
      'Sin límites mensuales de transacciones',
      'Ideal para depósitos y retiros grandes',
      'Confirmación inmediata de pago'
    ],
    cons: [
      'Requiere cuenta bancaria',
      'Comisión por transacción ($8-15 MXN)',
      'Necesitas acceso a banca en línea',
      'No es anónimo como el efectivo'
    ]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, method } = await params;
  const methodData = methodsData[method];
  
  if (!methodData) {
    return {
      title: 'Método de pago no encontrado | CasinosPesos',
      description: 'El método de pago que buscas no está disponible.'
    };
  }
  
  const isSpanish = locale === 'es';
  const baseUrl = 'https://casinospesos.com';
  const pageUrl = `${baseUrl}/${locale}/metodos-pago/${method}`;
  
  const title = isSpanish 
    ? `${methodData.name}: Guía Completa para Casinos Online 2024`
    : `${methodData.name}: Complete Guide for Online Casinos 2024`;
    
  const description = isSpanish
    ? `Todo sobre ${methodData.name} en casinos online: cómo depositar, límites, comisiones, tiempos y los mejores casinos que lo aceptan.`
    : `Everything about ${methodData.name} in online casinos: how to deposit, limits, fees, times and the best casinos that accept it.`;
  
  if (isSpanish) {
    return {
      title: `${title} | CasinosPesos`,
      description,
      keywords: `${methodData.name} casino, depositar ${methodData.name}, casinos ${methodData.name} México, ${methodData.name} casino online`,
      openGraph: {
        title,
        description,
        url: pageUrl,
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'article',
        images: [{
          url: `${baseUrl}/images/og-${method}.jpg`,
          width: 1200,
          height: 630,
          alt: `${methodData.name} Casinos Online`
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
          'es-MX': `${baseUrl}/es/metodos-pago/${method}`,
          'en-US': `${baseUrl}/en/payment-methods/${method}`,
          'x-default': `${baseUrl}/es/metodos-pago/${method}`
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
    keywords: `${methodData.name} casino, deposit ${methodData.name}, ${methodData.name} casinos Mexico`,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'CasinosPesos',
      locale: 'en_US',
      type: 'article',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/metodos-pago/${method}`,
        'en-US': `${baseUrl}/en/payment-methods/${method}`,
        'x-default': `${baseUrl}/es/metodos-pago/${method}`
      }
    }
  };
}

export default async function PaymentMethodPage({ params }: PageProps) {
  const { locale, method } = await params;
  const methodData = methodsData[method];
  
  // Fetch casinos from database
  const allCasinos = await getAllCasinos();
  
  // Filter casinos that support this payment method
  if (methodData) {
    const casinosWithMethod = allCasinos
      .filter(casino => {
        const methodName = methodData.name;
        return casino.paymentMethods.some(pm => 
          pm.toLowerCase() === methodName.toLowerCase() || 
          (methodName === 'OXXO' && pm === 'OXXO') ||
          (methodName === 'PayPal' && pm === 'PayPal') ||
          (methodName === 'SPEI' && pm === 'SPEI')
        );
      })
      .slice(0, 5)
      .map(casino => ({
        id: casino.id,
        name: casino.name,
        bonus: `${casino.bonus.percentage}% hasta $${casino.bonus.amount.toLocaleString()}`,
        minDeposit: casino.bonus.minDeposit,
        processingTime: '10-30 min',
        rating: casino.rating
      }));
    
    methodData.topCasinos = casinosWithMethod;
  }
  
  if (!methodData) {
    return (
      <main className="min-h-screen bg-neutral-900 pt-8 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Método no encontrado</h1>
          <p className="text-neutral-400 mb-8">El método de pago que buscas no está disponible.</p>
          <Link 
            href={`/${locale}/metodos-pago`}
            className="bg-primary text-black px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            Ver todos los métodos
          </Link>
        </div>
      </main>
    );
  }
  
  const isSpanish = locale === 'es';

  return (
    <main className="min-h-screen bg-neutral-900 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href={`/${locale}`} className="hover:text-white transition-colors">
            {isSpanish ? 'Inicio' : 'Home'}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${locale}/metodos-pago`} className="hover:text-white transition-colors">
            {isSpanish ? 'Métodos de Pago' : 'Payment Methods'}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{methodData.name}</span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-800/50 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="text-6xl">{methodData.logo}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{methodData.name}</h1>
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  {methodData.type}
                </span>
              </div>
              <p className="text-lg text-neutral-300 mb-4">{methodData.tagline}</p>
              <p className="text-neutral-400">{methodData.description}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {Object.entries(methodData.stats).map(([key, value]) => (
              <div key={key} className="bg-neutral-900/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-primary">{value as string}</div>
                <div className="text-xs text-neutral-400 capitalize">
                  {key === 'stores' && (isSpanish ? 'Tiendas' : 'Stores')}
                  {key === 'banks' && (isSpanish ? 'Bancos' : 'Banks')}
                  {key === 'availability' && (isSpanish ? 'Disponibilidad' : 'Availability')}
                  {key === 'processingTime' && (isSpanish ? 'Tiempo' : 'Time')}
                  {key === 'userBase' && (isSpanish ? 'Usuarios' : 'Users')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* How to Deposit */}
            {methodData.howToDeposit && (
              <section className="bg-neutral-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  {isSpanish ? `Cómo Depositar con ${methodData.name}` : `How to Deposit with ${methodData.name}`}
                </h2>
                <ol className="space-y-4">
                  {methodData.howToDeposit.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-neutral-300 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Pros and Cons */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {isSpanish ? 'Ventajas' : 'Advantages'}
                </h3>
                <ul className="space-y-2">
                  {methodData.pros.map((pro: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-neutral-300">
                      <span className="text-green-400 mt-1">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  {isSpanish ? 'Desventajas' : 'Disadvantages'}
                </h3>
                <ul className="space-y-2">
                  {methodData.cons.map((con: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-neutral-300">
                      <span className="text-red-400 mt-1">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Top Casinos */}
            <section className="bg-neutral-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                {isSpanish ? `Mejores Casinos con ${methodData.name}` : `Best Casinos with ${methodData.name}`}
              </h2>
              <div className="space-y-4">
                {methodData.topCasinos.map((casino) => (
                  <div key={casino.id} className="bg-neutral-700/50 rounded-lg p-4 hover:bg-neutral-700 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{casino.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(casino.rating) ? 'fill-primary text-primary' : 'text-neutral-600'}`} 
                            />
                          ))}
                          <span className="text-sm text-neutral-400 ml-1">{casino.rating}</span>
                        </div>
                      </div>
                      <Link
                        href={`/${locale}/casinos/${casino.id}`}
                        className="bg-gradient-to-r from-primary to-accent text-black px-4 py-2 rounded-lg font-bold hover:from-primary/90 hover:to-accent/90 transition-colors"
                      >
                        {isSpanish ? 'Visitar' : 'Visit'}
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-neutral-400">{isSpanish ? 'Bono:' : 'Bonus:'}</span>
                        <p className="text-white font-semibold">{casino.bonus}</p>
                      </div>
                      <div>
                        <span className="text-neutral-400">{isSpanish ? 'Dep. mín:' : 'Min dep:'}</span>
                        <p className="text-white font-semibold">${casino.minDeposit}</p>
                      </div>
                      <div>
                        <span className="text-neutral-400">{isSpanish ? 'Tiempo:' : 'Time:'}</span>
                        <p className="text-white font-semibold">{casino.processingTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            {methodData.faqs && (
              <section className="bg-neutral-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  {isSpanish ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-4">
                  {methodData.faqs.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between cursor-pointer bg-neutral-700/50 rounded-lg p-4 hover:bg-neutral-700 transition-colors">
                        <span className="font-semibold text-white pr-4">{faq.question}</span>
                        <ChevronDown className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="mt-2 px-4 pb-4">
                        <p className="text-neutral-300 text-sm">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Limits & Fees */}
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                {isSpanish ? 'Límites y Comisiones' : 'Limits & Fees'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-400 mb-2">
                    {isSpanish ? 'Límites de Depósito' : 'Deposit Limits'}
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{isSpanish ? 'Mínimo:' : 'Minimum:'}</span>
                      <span className="text-white font-semibold">${methodData.limits.minDeposit} MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{isSpanish ? 'Máximo:' : 'Maximum:'}</span>
                      <span className="text-white font-semibold">${methodData.limits.maxDeposit.toLocaleString()} MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{isSpanish ? 'Diario:' : 'Daily:'}</span>
                      <span className="text-white font-semibold">
                        {typeof methodData.limits.dailyLimit === 'number' 
                          ? `$${methodData.limits.dailyLimit.toLocaleString()} MXN`
                          : methodData.limits.dailyLimit}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-400 mb-2">
                    {isSpanish ? 'Límites de Retiro' : 'Withdrawal Limits'}
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{isSpanish ? 'Mínimo:' : 'Minimum:'}</span>
                      <span className="text-white font-semibold">
                        {typeof methodData.limits.minWithdrawal === 'number' 
                          ? `$${methodData.limits.minWithdrawal} MXN`
                          : methodData.limits.minWithdrawal}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{isSpanish ? 'Máximo:' : 'Maximum:'}</span>
                      <span className="text-white font-semibold">
                        {typeof methodData.limits.maxWithdrawal === 'number' 
                          ? `$${methodData.limits.maxWithdrawal.toLocaleString()} MXN`
                          : methodData.limits.maxWithdrawal}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-400 mb-2">
                    {isSpanish ? 'Comisiones' : 'Fees'}
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{isSpanish ? 'Depósito:' : 'Deposit:'}</span>
                      <span className="text-white font-semibold">{methodData.fees.deposit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{isSpanish ? 'Retiro:' : 'Withdrawal:'}</span>
                      <span className="text-white font-semibold">{methodData.fees.withdrawal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/30">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {isSpanish ? 'Consejos Rápidos' : 'Quick Tips'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-neutral-300">
                  <span className="text-primary mt-1">•</span>
                  {method === 'oxxo' && (isSpanish 
                    ? 'Guarda siempre tu ticket de pago'
                    : 'Always keep your payment receipt')}
                  {method === 'spei' && (isSpanish 
                    ? 'Verifica los límites de tu banco'
                    : 'Check your bank limits')}
                </li>
                <li className="flex items-start gap-2 text-neutral-300">
                  <span className="text-primary mt-1">•</span>
                  {method === 'oxxo' && (isSpanish 
                    ? 'El código expira en 24-48 horas'
                    : 'Code expires in 24-48 hours')}
                  {method === 'spei' && (isSpanish 
                    ? 'Usa la referencia correcta'
                    : 'Use the correct reference')}
                </li>
                <li className="flex items-start gap-2 text-neutral-300">
                  <span className="text-primary mt-1">•</span>
                  {isSpanish 
                    ? 'Verifica bonos especiales para este método'
                    : 'Check for special bonuses for this method'}
                </li>
              </ul>
            </div>

            {/* Alternative Methods */}
            {methodData.alternatives && (
              <div className="bg-neutral-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  {isSpanish ? 'Métodos Alternativos' : 'Alternative Methods'}
                </h3>
                <div className="space-y-3">
                  {methodData.alternatives.map((altMethod: string) => {
                    const altData = methodsData[altMethod];
                    if (!altData) { return null; }
                    return (
                      <Link
                        key={altMethod}
                        href={`/${locale}/metodos-pago/${altMethod}`}
                        className="flex items-center gap-3 bg-neutral-700/50 rounded-lg p-3 hover:bg-neutral-700 transition-colors group"
                      >
                        <span className="text-2xl">{altData.logo}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                            {altData.name}
                          </h4>
                          <p className="text-xs text-neutral-400">{altData.type}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-primary transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-neutral-800 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-white mb-3">
                {isSpanish ? '¿Listo para jugar?' : 'Ready to play?'}
              </h3>
              <p className="text-sm text-neutral-300 mb-4">
                {isSpanish 
                  ? `Elige un casino que acepte ${methodData.name} y empieza a jugar hoy`
                  : `Choose a casino that accepts ${methodData.name} and start playing today`}
              </p>
              <Link
                href={`/${locale}/casinos`}
                className="block w-full bg-gradient-to-r from-primary to-accent text-black px-4 py-3 rounded-lg font-bold hover:from-primary/90 hover:to-accent/90 transition-colors"
              >
                {isSpanish ? 'Ver Casinos' : 'View Casinos'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": isSpanish 
              ? `Cómo depositar con ${methodData.name} en casinos online`
              : `How to deposit with ${methodData.name} in online casinos`,
            "description": methodData.description,
            "step": methodData.howToDeposit?.map((step: string, index: number) => ({
              "@type": "HowToStep",
              "name": `Paso ${index + 1}`,
              "text": step
            })) || []
          })
        }}
      />
    </main>
  );
}