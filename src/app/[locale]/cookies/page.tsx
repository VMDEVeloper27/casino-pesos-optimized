import { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, Settings, Shield, Eye, Trash2, Info, CheckCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Política de Cookies | CasinosPesos | Gestión Cookies 2025',
      description: 'Información completa sobre cómo usamos las cookies y tecnologías similares en CasinosPesos. Tipos, gestión, configuración y control de cookies.',
      keywords: 'politica cookies casinospesos, gestion cookies casinos, configuracion cookies, tecnologias seguimiento, cookies analiticas, cookies marketing',
      alternates: {
        canonical: 'https://www.casinospesos.com/es/cookies',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/cookies',
          'en-US': 'https://www.casinospesos.com/en/cookies',
        }
      },
      openGraph: {
        title: 'Política de Cookies | CasinosPesos México',
        description: 'Aprende sobre nuestro uso de cookies. Gestiona tus preferencias y entiende cómo mejoramos tu experiencia web.',
        url: 'https://www.casinospesos.com/es/cookies',
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Política de Cookies CasinosPesos - Gestión y Configuración'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Política de Cookies CasinosPesos',
        description: 'Gestiona tus cookies y mejora tu experiencia web.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  } else {
    return {
      title: 'Cookie Policy | CasinosPesos | Cookie Management 2025',
      description: 'Complete information about how we use cookies and similar technologies at CasinosPesos. Types, management, configuration and cookie control.',
      keywords: 'cookie policy casinospesos, casino cookie management, cookie configuration, tracking technologies, analytics cookies, marketing cookies',
      alternates: {
        canonical: 'https://www.casinospesos.com/en/cookies',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/cookies',
          'en-US': 'https://www.casinospesos.com/en/cookies',
        }
      },
      openGraph: {
        title: 'Cookie Policy | CasinosPesos Mexico',
        description: 'Learn about our cookie usage. Manage your preferences and understand how we improve your web experience.',
        url: 'https://www.casinospesos.com/en/cookies',
        siteName: 'CasinosPesos',
        locale: 'en_US',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Cookie Policy CasinosPesos - Management and Configuration'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Cookie Policy CasinosPesos',
        description: 'Manage your cookies and improve your web experience.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  }
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  return (
    <div className="min-h-screen bg-neutral-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
            <Cookie className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {isSpanish ? 'Política de Cookies' : 'Cookie Policy'}
          </h1>
          <p className="text-neutral-400 text-lg">
            {isSpanish ? 'Última actualización:' : 'Last updated:'} {new Date().toLocaleDateString(isSpanish ? 'es-MX' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-neutral-300">
          {/* Introduction */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Info className="w-6 h-6 text-primary" />
              ¿Qué son las Cookies?
            </h2>
            <p className="mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. 
              Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente y proporcionar 
              información a los propietarios del sitio.
            </p>
            <p>
              En CasinosPesos utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico 
              del sitio y personalizar el contenido y los anuncios.
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-6">Tipos de Cookies que Utilizamos</h2>
            
            {/* Essential Cookies */}
            <div className="mb-6 p-4 bg-neutral-700 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Cookies Esenciales</h3>
                  <p className="text-sm mb-3">
                    Estas cookies son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">session_id</span>
                      <span className="text-neutral-400">Mantiene la sesión del usuario</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">cookie_consent</span>
                      <span className="text-neutral-400">Recuerda sus preferencias de cookies</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">security_token</span>
                      <span className="text-neutral-400">Protección contra CSRF</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="mb-6 p-4 bg-neutral-700 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <Eye className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Cookies Analíticas</h3>
                  <p className="text-sm mb-3">
                    Nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando información de forma anónima.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">_ga, _gid</span>
                      <span className="text-neutral-400">Google Analytics - análisis de tráfico</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">_gat</span>
                      <span className="text-neutral-400">Limita la tasa de solicitudes</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">_gcl_au</span>
                      <span className="text-neutral-400">Conversiones de Google Ads</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="mb-6 p-4 bg-neutral-700 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <Settings className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Cookies de Preferencias</h3>
                  <p className="text-sm mb-3">
                    Permiten al sitio web recordar información que cambia la forma en que se comporta o se ve el sitio.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">language</span>
                      <span className="text-neutral-400">Idioma preferido</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">currency</span>
                      <span className="text-neutral-400">Moneda seleccionada</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">theme</span>
                      <span className="text-neutral-400">Tema visual (claro/oscuro)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="p-4 bg-neutral-700 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Cookies de Marketing</h3>
                  <p className="text-sm mb-3">
                    Se utilizan para rastrear visitantes en los sitios web y mostrar anuncios relevantes y atractivos.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">_fbp</span>
                      <span className="text-neutral-400">Facebook Pixel</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">ads_session</span>
                      <span className="text-neutral-400">Seguimiento de campañas</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">affiliate_id</span>
                      <span className="text-neutral-400">Tracking de afiliados</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Third Party Cookies */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">Cookies de Terceros</h2>
            <p className="mb-4">
              Además de nuestras propias cookies, podemos utilizar cookies de terceros para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Análisis del sitio web (Google Analytics)</li>
              <li>Publicidad dirigida (Google Ads, Facebook)</li>
              <li>Widgets de redes sociales</li>
              <li>Contenido embebido (videos de YouTube)</li>
              <li>Servicios de chat en vivo</li>
            </ul>
          </section>

          {/* Cookie Duration */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">Duración de las Cookies</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Cookies de Sesión</h3>
                <p className="text-sm">
                  Se eliminan automáticamente cuando cierra su navegador. Se utilizan para mantener su sesión activa 
                  mientras navega por el sitio.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Cookies Persistentes</h3>
                <p className="text-sm">
                  Permanecen en su dispositivo hasta que caducan o las elimina manualmente. Los períodos de retención varían:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li>Cookies esenciales: hasta 1 año</li>
                  <li>Cookies analíticas: hasta 2 años</li>
                  <li>Cookies de marketing: hasta 90 días</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              Cómo Gestionar las Cookies
            </h2>
            <div className="space-y-4">
              <p>Tiene varias opciones para gestionar las cookies:</p>
              
              <div className="bg-neutral-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">1. Configuración del Navegador</h3>
                <p className="text-sm mb-2">
                  Puede configurar su navegador para rechazar todas o algunas cookies, o para alertarle cuando se envían cookies.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline">Chrome</a></li>
                  <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" className="text-primary hover:underline">Firefox</a></li>
                  <li><a href="https://support.apple.com/es-mx/guide/safari/sfri11471/mac" className="text-primary hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline">Edge</a></li>
                </ul>
              </div>

              <div className="bg-neutral-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">2. Panel de Preferencias de Cookies</h3>
                <p className="text-sm mb-3">
                  Use nuestro panel de configuración de cookies para personalizar sus preferencias.
                </p>
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-black rounded-lg font-semibold transition-colors text-sm">
                  Configurar Cookies
                </button>
              </div>

              <div className="bg-neutral-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">3. Opt-out de Terceros</h3>
                <p className="text-sm">
                  También puede optar por no participar en cookies de terceros visitando:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline">Google Analytics Opt-out</a></li>
                  <li><a href="https://www.facebook.com/help/568137493302217" className="text-primary hover:underline">Facebook Ads Settings</a></li>
                  <li><a href="https://youradchoices.com/" className="text-primary hover:underline">Your Ad Choices</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Impact of Disabling */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Trash2 className="w-6 h-6 text-primary" />
              Impacto de Deshabilitar las Cookies
            </h2>
            <p className="mb-4">
              Si decide deshabilitar las cookies, tenga en cuenta que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Algunas funciones del sitio pueden no funcionar correctamente</li>
              <li>Es posible que no pueda acceder a ciertas áreas del sitio</li>
              <li>Sus preferencias no se guardarán para futuras visitas</li>
              <li>Puede ver contenido y anuncios menos relevantes</li>
              <li>Tendrá que volver a configurar sus preferencias en cada visita</li>
            </ul>
          </section>

          {/* Updates */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">Actualizaciones de esta Política</h2>
            <p>
              Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en nuestras prácticas 
              o por otras razones operativas, legales o regulatorias. Le recomendamos que revise esta política 
              periódicamente para estar informado sobre nuestro uso de cookies.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
            <p className="mb-4">
              Si tiene preguntas sobre nuestra Política de Cookies, contáctenos:
            </p>
            <div className="bg-neutral-700 rounded-lg p-4">
              <p>Email: cookies@casinospesos.com</p>
              <p>Dirección: México City, México</p>
            </div>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-neutral-400 hover:text-primary transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-neutral-400 hover:text-primary transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/responsible-gaming" className="text-neutral-400 hover:text-primary transition-colors">
              Juego Responsable
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}