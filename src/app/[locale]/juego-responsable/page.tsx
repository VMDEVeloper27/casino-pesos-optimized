import { AlertTriangle, Ban, Calculator, CheckCircle, Clock, ExternalLink, Heart, HelpCircle, Mail, Phone, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  const baseUrl = 'https://www.casinospesos.com';
  const pageUrl = `${baseUrl}/${locale}/juego-responsable`;
  
  const title = isSpanish 
    ? 'Juego Responsable en México 2025 | Guía y Recursos de Ayuda | CasinosPesos'
    : 'Responsible Gambling Mexico 2025 | Guide and Help Resources | CasinosPesos';
    
  const description = isSpanish
    ? 'Guía completa sobre juego responsable en México. Herramientas de autoexclusión, límites de depósito, señales de ludopatía y recursos de ayuda profesional gratuita.'
    : 'Complete guide on responsible gambling. Self-exclusion tools, deposit limits, addiction signs and professional help resources in Mexico.';
  
  if (isSpanish) {
    return {
      title: `${title} | CasinosPesos`,
      description,
      keywords: 'juego responsable, ludopatía, adicción al juego, autoexclusión, límites depósito, ayuda juego México',
      openGraph: {
        title,
        description,
        url: pageUrl,
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'article',
        images: [{
          url: `${baseUrl}/images/og-juego-responsable.jpg`,
          width: 1200,
          height: 630,
          alt: 'Juego Responsable'
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
          'es-MX': `${baseUrl}/es/juego-responsable`,
          'en-US': `${baseUrl}/en/responsible-gambling`,
          'x-default': `${baseUrl}/es/juego-responsable`
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
    keywords: 'responsible gambling, gambling addiction, self-exclusion, deposit limits, gambling help Mexico',
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
        'es-MX': `${baseUrl}/es/juego-responsable`,
        'en-US': `${baseUrl}/en/responsible-gambling`,
        'x-default': `${baseUrl}/es/juego-responsable`
      }
    }
  };
}

export default async function JuegoResponsablePage({ params }: PageProps) {
  const { locale } = await params;
  const isSpanish = locale === 'es';

  const warningSignals = isSpanish ? [
    'Gastas más dinero del que puedes permitirte perder',
    'Mientes sobre tu actividad de juego a familiares y amigos',
    'Sientes la necesidad de jugar con cantidades cada vez mayores',
    'Te sientes irritable o ansioso cuando no puedes jugar',
    'Intentas recuperar pérdidas con más apuestas',
    'Descuidas responsabilidades laborales o familiares por jugar',
    'Pides dinero prestado para jugar',
    'El juego afecta tu salud mental o física'
  ] : [
    'Spending more money than you can afford to lose',
    'Lying about your gambling activity to family and friends',
    'Feeling the need to gamble with increasing amounts',
    'Feeling irritable or anxious when unable to gamble',
    'Trying to recover losses with more bets',
    'Neglecting work or family responsibilities to gamble',
    'Borrowing money to gamble',
    'Gambling affects your mental or physical health'
  ];

  const tools = isSpanish ? [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Límites de Tiempo',
      description: 'Establece límites diarios o semanales para tu tiempo de juego.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Límites de Depósito',
      description: 'Controla cuánto dinero puedes depositar en un período determinado.'
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: 'Autoexclusión',
      description: 'Bloquea tu acceso a los sitios de juego por un período específico.'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Verificación de Realidad',
      description: 'Recibe recordatorios sobre tu tiempo y dinero gastado.'
    }
  ] : [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Time Limits',
      description: 'Set daily or weekly limits for your playing time.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Deposit Limits',
      description: 'Control how much money you can deposit in a given period.'
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: 'Self-Exclusion',
      description: 'Block your access to gambling sites for a specific period.'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Reality Check',
      description: 'Receive reminders about your time and money spent.'
    }
  ];

  const helpOrganizations = [
    {
      name: 'Jugadores Anónimos México',
      phone: '+52 55 1234 5678',
      email: 'ayuda@jugadoresanonimos.mx',
      website: 'https://jugadoresanonimos.mx',
      description: isSpanish 
        ? 'Grupo de apoyo con reuniones presenciales y virtuales en todo México.'
        : 'Support group with in-person and virtual meetings throughout Mexico.'
    },
    {
      name: 'Centro de Atención Ciudadana',
      phone: '911',
      email: 'atencion@salud.gob.mx',
      website: 'https://www.gob.mx/salud',
      description: isSpanish 
        ? 'Línea de emergencia y apoyo psicológico 24/7.'
        : '24/7 emergency and psychological support line.'
    },
    {
      name: 'CONADIC',
      phone: '01 800 911 2000',
      email: 'conadic@salud.gob.mx',
      website: 'https://www.gob.mx/salud/conadic',
      description: isSpanish 
        ? 'Comisión Nacional contra las Adicciones con programas especializados.'
        : 'National Commission Against Addictions with specialized programs.'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {isSpanish ? 'Juego Responsable' : 'Responsible Gambling'}
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? 'Tu bienestar es nuestra prioridad. El juego debe ser una forma de entretenimiento, no una fuente de problemas. Aquí encontrarás herramientas y recursos para mantener el control.'
              : 'Your wellbeing is our priority. Gambling should be a form of entertainment, not a source of problems. Here you\'ll find tools and resources to stay in control.'}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 mb-12 border border-red-500/30">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {isSpanish ? 'Aviso Importante' : 'Important Notice'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish 
                  ? 'El juego puede ser adictivo. Si sientes que estás perdiendo el control, busca ayuda inmediatamente. Todos los casinos recomendados ofrecen herramientas de juego responsable.'
                  : 'Gambling can be addictive. If you feel you\'re losing control, seek help immediately. All recommended casinos offer responsible gambling tools.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg font-semibold">
                  {isSpanish ? '🔞 Solo +18 años' : '🔞 18+ Only'}
                </span>
                <span className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-lg font-semibold">
                  {isSpanish ? '⚠️ Juega con moderación' : '⚠️ Play in moderation'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Warning Signals */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              {isSpanish ? 'Señales de Advertencia' : 'Warning Signs'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isSpanish 
                ? 'Si identificas alguna de estas señales, es momento de buscar ayuda:'
                : 'If you identify any of these signs, it\'s time to seek help:'}
            </p>
            <ul className="space-y-3">
              {warningSignals.map((signal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Self-Assessment Test */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              {isSpanish ? 'Test de Autoevaluación' : 'Self-Assessment Test'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isSpanish 
                ? 'Responde estas preguntas honestamente para evaluar tu relación con el juego:'
                : 'Answer these questions honestly to assess your relationship with gambling:'}
            </p>
            <div className="space-y-4">
              {[
                isSpanish ? '¿Has perdido tiempo de trabajo o escuela por jugar?' : 'Have you lost time from work or school due to gambling?',
                isSpanish ? '¿El juego ha hecho tu vida familiar infeliz?' : 'Has gambling made your home life unhappy?',
                isSpanish ? '¿Has sentido remordimiento después de jugar?' : 'Have you felt remorse after gambling?',
                isSpanish ? '¿Has jugado para obtener dinero para pagar deudas?' : 'Have you gambled to get money to pay debts?'
              ].map((question, index) => (
                <div key={index} className="bg-gray-100/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-3">{question}</p>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                      {isSpanish ? 'No' : 'No'}
                    </button>
                    <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                      {isSpanish ? 'Sí' : 'Yes'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/20 rounded-lg">
              <p className="text-sm text-gray-600">
                {isSpanish 
                  ? 'Si respondiste "Sí" a 2 o más preguntas, considera buscar ayuda profesional.'
                  : 'If you answered "Yes" to 2 or more questions, consider seeking professional help.'}
              </p>
            </div>
          </div>
        </div>

        {/* Tools and Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isSpanish ? '🛠️ Herramientas de Control' : '🛠️ Control Tools'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="text-primary mb-4">{tool.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Help Organizations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isSpanish ? '🤝 Organizaciones de Ayuda' : '🤝 Help Organizations'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {helpOrganizations.map((org, index) => (
              <div key={index} className="bg-gradient-to-br from-neutral-800 to-neutral-800/50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{org.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{org.description}</p>
                <div className="space-y-2">
                  <a 
                    href={`tel:${org.phone}`}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{org.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${org.email}`}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{org.email}</span>
                  </a>
                  <a 
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">{isSpanish ? 'Sitio web' : 'Website'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips for Healthy Gaming */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-8 border border-green-500/30">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-green-400" />
              {isSpanish ? 'Consejos para un Juego Saludable' : 'Tips for Healthy Gaming'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Establece un presupuesto antes de jugar y respétalo'
                      : 'Set a budget before playing and stick to it'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Nunca juegues bajo los efectos del alcohol o drogas'
                      : 'Never gamble under the influence of alcohol or drugs'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Toma descansos regulares durante las sesiones de juego'
                      : 'Take regular breaks during gaming sessions'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'No persigas las pérdidas intentando recuperarlas'
                      : 'Don\'t chase losses trying to recover them'}
                  </span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Mantén el juego como entretenimiento, no como ingreso'
                      : 'Keep gambling as entertainment, not as income'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Equilibra el juego con otras actividades recreativas'
                      : 'Balance gambling with other recreational activities'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Habla abiertamente sobre tus hábitos de juego'
                      : 'Talk openly about your gambling habits'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Busca ayuda si sientes que pierdes el control'
                      : 'Seek help if you feel you\'re losing control'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Family Support */}
        <section className="mb-12">
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              {isSpanish ? 'Apoyo para Familiares' : 'Support for Family Members'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isSpanish 
                ? 'Si un ser querido tiene problemas con el juego, también puedes obtener ayuda y apoyo. No estás solo en esta situación.'
                : 'If a loved one has gambling problems, you can also get help and support. You\'re not alone in this situation.'}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-100/50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isSpanish ? 'Educación' : 'Education'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isSpanish 
                    ? 'Aprende sobre la adicción al juego y cómo afecta a las personas.'
                    : 'Learn about gambling addiction and how it affects people.'}
                </p>
              </div>
              <div className="bg-gray-100/50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isSpanish ? 'Comunicación' : 'Communication'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isSpanish 
                    ? 'Habla con tu ser querido sin juzgar y ofrece tu apoyo incondicional.'
                    : 'Talk to your loved one without judgment and offer unconditional support.'}
                </p>
              </div>
              <div className="bg-gray-100/50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isSpanish ? 'Límites' : 'Boundaries'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isSpanish 
                    ? 'Establece límites saludables y no habilites el comportamiento problemático.'
                    : 'Set healthy boundaries and don\'t enable problematic behavior.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-8 border border-primary/30">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isSpanish ? '¿Necesitas Ayuda Ahora?' : 'Need Help Now?'}
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isSpanish 
                ? 'No esperes más. La ayuda está disponible 24/7. Llama ahora y da el primer paso hacia la recuperación.'
                : 'Don\'t wait any longer. Help is available 24/7. Call now and take the first step towards recovery.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="tel:018009112000"
                className="bg-gradient-to-r from-primary to-accent text-black px-8 py-4 rounded-xl font-bold hover:from-primary/90 hover:to-accent/90 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {isSpanish ? 'Llamar Ahora: 01 800 911 2000' : 'Call Now: 01 800 911 2000'}
              </a>
              <Link 
                href={`/${locale}`}
                className="bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                {isSpanish ? 'Volver al Inicio' : 'Back to Home'}
              </Link>
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
            "@type": "Article",
            "headline": isSpanish ? "Guía de Juego Responsable" : "Responsible Gambling Guide",
            "description": isSpanish 
              ? "Guía completa sobre juego responsable con herramientas y recursos de ayuda"
              : "Complete guide on responsible gambling with tools and help resources",
            "author": {
              "@type": "Organization",
              "name": "CasinosPesos"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CasinosPesos",
              "logo": {
                "@type": "ImageObject",
                "url": "https://casinospesos.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://casinospesos.com/${locale}/juego-responsable`
            }
          })
        }}
      />
    </main>
  );
}