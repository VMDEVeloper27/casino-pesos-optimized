import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, Users, Mail } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Política de Privacidad | CasinosPesos | Protección Datos 2025',
      description: 'Conoce cómo protegemos tu información personal y respetamos tu privacidad en CasinosPesos. GDPR, cookies, derechos usuario y seguridad de datos.',
      keywords: 'politica privacidad casinospesos, proteccion datos personales, privacidad usuario casinos, gdpr mexico, seguridad informacion, derechos usuario',
      alternates: {
        canonical: 'https://www.casinospesos.com/es/privacy',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/privacy',
          'en-US': 'https://www.casinospesos.com/en/privacy',
        }
      },
      openGraph: {
        title: 'Política de Privacidad | CasinosPesos México',
        description: 'Descubre cómo protegemos tus datos personales. Cumplimos con GDPR y leyes mexicanas de protección de datos.',
        url: 'https://www.casinospesos.com/es/privacy',
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Política de Privacidad CasinosPesos - Protección de Datos'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Política de Privacidad CasinosPesos',
        description: 'Protegemos tu información personal. GDPR compliant.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  } else {
    return {
      title: 'Privacy Policy | CasinosPesos | Data Protection 2025',
      description: 'Learn how we protect your personal information and respect your privacy at CasinosPesos. GDPR, cookies, user rights and data security.',
      keywords: 'privacy policy casinospesos, personal data protection, casino user privacy, gdpr mexico, information security, user rights',
      alternates: {
        canonical: 'https://www.casinospesos.com/en/privacy',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/privacy',
          'en-US': 'https://www.casinospesos.com/en/privacy',
        }
      },
      openGraph: {
        title: 'Privacy Policy | CasinosPesos Mexico',
        description: 'Discover how we protect your personal data. We comply with GDPR and Mexican data protection laws.',
        url: 'https://www.casinospesos.com/en/privacy',
        siteName: 'CasinosPesos',
        locale: 'en_US',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Privacy Policy CasinosPesos - Data Protection'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy CasinosPesos',
        description: 'We protect your personal information. GDPR compliant.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  }
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  return (
    <div className="min-h-screen bg-neutral-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
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
              <FileText className="w-6 h-6 text-primary" />
              Introducción
            </h2>
            <p className="leading-relaxed">
              En CasinosPesos, nos comprometemos a proteger su privacidad y garantizar la seguridad de su información personal. 
              Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información cuando utiliza nuestro sitio web.
            </p>
          </section>

          {/* Information Collection */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-primary" />
              Información que Recopilamos
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Información Proporcionada Directamente</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nombre y dirección de correo electrónico (al suscribirse a nuestro boletín)</li>
                  <li>Comentarios y opiniones (al dejar reseñas)</li>
                  <li>Preferencias de juego y casino</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Información Recopilada Automáticamente</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Dirección IP y ubicación geográfica</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de permanencia</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Use of Information */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              Uso de la Información
            </h2>
            <p className="mb-4">Utilizamos su información para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Proporcionar y mejorar nuestros servicios de comparación de casinos</li>
              <li>Personalizar su experiencia en el sitio</li>
              <li>Enviar actualizaciones sobre nuevos casinos y bonos (con su consentimiento)</li>
              <li>Analizar el uso del sitio para mejorar nuestro contenido</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
              <li>Prevenir fraudes y garantizar la seguridad del sitio</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-primary" />
              Protección de Datos
            </h2>
            <p className="mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encriptación SSL/TLS para todas las transmisiones de datos</li>
              <li>Acceso restringido a información personal</li>
              <li>Auditorías de seguridad regulares</li>
              <li>Cumplimiento con GDPR y leyes locales de protección de datos</li>
              <li>Almacenamiento seguro en servidores protegidos</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">Cookies y Tecnologías Similares</h2>
            <p className="mb-4">
              Utilizamos cookies para mejorar su experiencia. Puede consultar nuestra{' '}
              <Link href="/cookies" className="text-primary hover:underline">
                Política de Cookies
              </Link>{' '}
              para más información.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-white">Tipos de cookies que utilizamos:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Cookies esenciales (funcionamiento del sitio)</li>
                  <li>Cookies analíticas (Google Analytics)</li>
                  <li>Cookies de preferencias (idioma, configuración)</li>
                  <li>Cookies de marketing (con su consentimiento)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third Parties */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">Compartir Información con Terceros</h2>
            <p className="mb-4">
              No vendemos su información personal. Podemos compartir información con:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Proveedores de servicios (hosting, análisis)</li>
              <li>Casinos afiliados (solo información anónima)</li>
              <li>Autoridades legales (cuando sea requerido por ley)</li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">Sus Derechos</h2>
            <p className="mb-4">Usted tiene derecho a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acceder a su información personal</li>
              <li>Rectificar información incorrecta</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Portabilidad de datos</li>
              <li>Retirar el consentimiento en cualquier momento</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary" />
              Contacto
            </h2>
            <p className="mb-4">
              Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, contáctenos:
            </p>
            <div className="bg-neutral-700 rounded-lg p-4">
              <p>Email: privacy@casinospesos.com</p>
              <p>Dirección: México City, México</p>
            </div>
          </section>

          {/* Updates */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">Actualizaciones de la Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos 
              publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/terms" className="text-neutral-400 hover:text-primary transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/cookies" className="text-neutral-400 hover:text-primary transition-colors">
              Política de Cookies
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