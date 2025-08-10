import { Award, Shield, Target, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  const baseUrl = 'https://casinospesos.com';
  const pageUrl = `${baseUrl}/${locale}/sobre-nosotros`;
  
  const title = isSpanish 
    ? 'Sobre Nosotros - CasinosPesos | Tu Guía de Casinos en México'
    : 'About Us - CasinosPesos | Your Casino Guide in Mexico';
    
  const description = isSpanish
    ? 'Conoce a CasinosPesos, la plataforma líder de comparación de casinos online en México. Nuestra misión, valores y compromiso con el juego responsable.'
    : 'Meet CasinosPesos, the leading online casino comparison platform in Mexico. Our mission, values and commitment to responsible gambling.';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'CasinosPesos',
      locale: isSpanish ? 'es_MX' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-MX': `${baseUrl}/es/sobre-nosotros`,
        'en-US': `${baseUrl}/en/about-us`,
        'x-default': `${baseUrl}/es/sobre-nosotros`
      }
    }
  };
}

export default async function SobreNosotrosPage({ params }: PageProps) {
  const { locale } = await params;
  const isSpanish = locale === 'es';

  const stats = [
    { 
      value: '50K+', 
      label: isSpanish ? 'Usuarios Activos' : 'Active Users',
      icon: <Users className="w-6 h-6 text-primary" />
    },
    { 
      value: '38+', 
      label: isSpanish ? 'Casinos Verificados' : 'Verified Casinos',
      icon: <Shield className="w-6 h-6 text-accent" />
    },
    { 
      value: '500+', 
      label: isSpanish ? 'Bonos Actualizados' : 'Updated Bonuses',
      icon: <TrendingUp className="w-6 h-6 text-primary" />
    },
    { 
      value: '4.8/5', 
      label: isSpanish ? 'Satisfacción' : 'Satisfaction',
      icon: <Award className="w-6 h-6 text-accent" />
    }
  ];

  const values = isSpanish ? [
    {
      title: 'Transparencia',
      description: 'Proporcionamos información honesta y actualizada sobre cada casino, incluyendo ventajas y desventajas.'
    },
    {
      title: 'Independencia',
      description: 'Nuestras reseñas son imparciales y basadas en análisis exhaustivos, no en acuerdos comerciales.'
    },
    {
      title: 'Seguridad',
      description: 'Solo recomendamos casinos con licencias válidas y medidas de seguridad comprobadas.'
    },
    {
      title: 'Responsabilidad',
      description: 'Promovemos el juego responsable y proporcionamos recursos de ayuda para quienes lo necesiten.'
    }
  ] : [
    {
      title: 'Transparency',
      description: 'We provide honest and updated information about each casino, including pros and cons.'
    },
    {
      title: 'Independence',
      description: 'Our reviews are impartial and based on thorough analysis, not commercial agreements.'
    },
    {
      title: 'Security',
      description: 'We only recommend casinos with valid licenses and proven security measures.'
    },
    {
      title: 'Responsibility',
      description: 'We promote responsible gambling and provide help resources for those who need it.'
    }
  ];

  const team = [
    {
      name: 'Carlos Mendoza',
      role: isSpanish ? 'Fundador & CEO' : 'Founder & CEO',
      bio: isSpanish 
        ? 'Experto en la industria del juego con más de 10 años de experiencia.'
        : 'Gaming industry expert with over 10 years of experience.'
    },
    {
      name: 'Ana García',
      role: isSpanish ? 'Jefa de Contenido' : 'Head of Content',
      bio: isSpanish 
        ? 'Especialista en análisis de casinos y estrategias de juego.'
        : 'Specialist in casino analysis and gaming strategies.'
    },
    {
      name: 'Miguel Torres',
      role: isSpanish ? 'Analista Senior' : 'Senior Analyst',
      bio: isSpanish 
        ? 'Experto en bonos y promociones de casinos online.'
        : 'Expert in online casino bonuses and promotions.'
    },
    {
      name: 'Laura Rodríguez',
      role: isSpanish ? 'Soporte al Cliente' : 'Customer Support',
      bio: isSpanish 
        ? 'Dedicada a ayudar a los usuarios con sus consultas 24/7.'
        : 'Dedicated to helping users with their queries 24/7.'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isSpanish ? 'Sobre CasinosPesos' : 'About CasinosPesos'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? 'Somos la plataforma líder de comparación de casinos online en México, comprometidos con proporcionar información precisa y actualizada para ayudarte a tomar las mejores decisiones.'
              : 'We are the leading online casino comparison platform in Mexico, committed to providing accurate and updated information to help you make the best decisions.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-8 border border-primary/30">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">
                {isSpanish ? 'Nuestra Misión' : 'Our Mission'}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              {isSpanish 
                ? 'Nuestra misión es democratizar el acceso a información confiable sobre casinos online en México. Creemos que cada jugador merece tomar decisiones informadas basadas en datos reales y análisis objetivos.'
                : 'Our mission is to democratize access to reliable information about online casinos in Mexico. We believe every player deserves to make informed decisions based on real data and objective analysis.'}
            </p>
            <p className="text-gray-600">
              {isSpanish 
                ? 'Trabajamos incansablemente para evaluar, comparar y presentar las mejores opciones de casinos online, asegurándonos de que nuestros usuarios tengan acceso a plataformas seguras, justas y entretenidas.'
                : 'We work tirelessly to evaluate, compare and present the best online casino options, ensuring our users have access to safe, fair and entertaining platforms.'}
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {isSpanish ? 'Nuestros Valores' : 'Our Values'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {isSpanish ? 'Nuestro Equipo' : 'Our Team'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {isSpanish ? '¿Por qué elegir CasinosPesos?' : 'Why choose CasinosPesos?'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {isSpanish ? '🔍 Análisis Exhaustivo' : '🔍 Thorough Analysis'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isSpanish 
                    ? 'Evaluamos cada casino en más de 20 criterios diferentes, desde licencias hasta tiempos de retiro.'
                    : 'We evaluate each casino on over 20 different criteria, from licenses to withdrawal times.'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {isSpanish ? '🎁 Bonos Exclusivos' : '🎁 Exclusive Bonuses'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isSpanish 
                    ? 'Negociamos ofertas especiales y bonos exclusivos que no encontrarás en ningún otro lugar.'
                    : 'We negotiate special offers and exclusive bonuses you won\'t find anywhere else.'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {isSpanish ? '📱 Soporte 24/7' : '📱 24/7 Support'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isSpanish 
                    ? 'Nuestro equipo está disponible las 24 horas para ayudarte con cualquier duda o problema.'
                    : 'Our team is available 24 hours to help you with any questions or problems.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-8 border border-primary/30">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isSpanish ? '¿Tienes preguntas?' : 'Have questions?'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isSpanish 
                ? 'Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.'
                : 'We\'re here to help. Contact us and we\'ll respond as soon as possible.'}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-block bg-gradient-to-r from-primary to-accent text-black px-8 py-3 rounded-xl font-bold hover:from-primary/90 hover:to-accent/90 transition-all duration-200 transform hover:scale-105"
            >
              {isSpanish ? 'Contáctanos' : 'Contact Us'}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}