import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Scale, AlertCircle, CheckCircle, Users, Shield, Ban, Mail } from 'lucide-react';
import { contactInfo } from '@/lib/contact-info';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Términos y Condiciones | CasinosPesos | Uso Sitio Web 2025',
      description: 'Términos y condiciones de uso del sitio web CasinosPesos. Normas, responsabilidades y derechos de usuarios. Lee antes de usar nuestros servicios de comparación de casinos.',
      keywords: 'terminos condiciones casinospesos, uso sitio web casinos, responsabilidades usuario, derechos casinos online, politicas uso mexico',
      alternates: {
        canonical: 'https://www.casinospesos.com/es/terms',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/terms',
          'en-US': 'https://www.casinospesos.com/en/terms',
        }
      },
      openGraph: {
        title: 'Términos y Condiciones | CasinosPesos México',
        description: 'Conoce los términos de uso de CasinosPesos. Normas para usuarios, responsabilidades y políticas de nuestra plataforma de comparación de casinos.',
        url: 'https://www.casinospesos.com/es/terms',
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Términos y Condiciones CasinosPesos México'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Términos y Condiciones CasinosPesos',
        description: 'Normas de uso y responsabilidades en nuestra plataforma de casinos.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  } else {
    return {
      title: 'Terms and Conditions | CasinosPesos | Website Usage 2025',
      description: 'Terms and conditions for using the CasinosPesos website. Rules, responsibilities and user rights. Read before using our casino comparison services.',
      keywords: 'terms conditions casinospesos, casino website usage, user responsibilities, online casino rights, usage policies mexico',
      alternates: {
        canonical: 'https://www.casinospesos.com/en/terms',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/terms',
          'en-US': 'https://www.casinospesos.com/en/terms',
        }
      },
      openGraph: {
        title: 'Terms and Conditions | CasinosPesos Mexico',
        description: 'Learn about CasinosPesos terms of use. User rules, responsibilities and policies of our casino comparison platform.',
        url: 'https://www.casinospesos.com/en/terms',
        siteName: 'CasinosPesos',
        locale: 'en_US',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Terms and Conditions CasinosPesos Mexico'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Terms and Conditions CasinosPesos',
        description: 'Usage rules and responsibilities on our casino platform.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  }
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  return (
    <div className="min-h-screen bg-neutral-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
            <Scale className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {isSpanish ? 'Términos y Condiciones' : 'Terms and Conditions'}
          </h1>
          <p className="text-neutral-400 text-lg">
            {isSpanish ? 'Última actualización:' : 'Last updated:'} {new Date().toLocaleDateString(isSpanish ? 'es-MX' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div className="text-neutral-300">
              <p className="font-semibold text-white mb-2">Aviso Importante</p>
              <p className="text-sm">
                El juego puede ser adictivo. Juega responsablemente. Debes ser mayor de 18 años para usar este sitio.
                CasinosPesos es un sitio de comparación y no opera casinos en línea.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 text-neutral-300">
          {/* Acceptance */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary" />
              1. Aceptación de los Términos
            </h2>
            <p className="mb-4">
              Al acceder y utilizar CasinosPesos ("el Sitio"), usted acepta estar sujeto a estos Términos y Condiciones. 
              Si no está de acuerdo con alguna parte de estos términos, no debe usar nuestro sitio.
            </p>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor 
              inmediatamente después de su publicación en el Sitio.
            </p>
          </section>

          {/* Service Description */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              2. Descripción del Servicio
            </h2>
            <div className="space-y-4">
              <p>CasinosPesos proporciona:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Información comparativa sobre casinos en línea disponibles en México</li>
                <li>Reseñas y calificaciones de casinos</li>
                <li>Información sobre bonos y promociones</li>
                <li>Guías y estrategias de juego</li>
                <li>Enlaces de afiliados a sitios de casino de terceros</li>
              </ul>
              <div className="bg-neutral-700 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  <strong>Nota:</strong> No operamos casinos ni procesamos apuestas. Somos un servicio informativo y de comparación.
                </p>
              </div>
            </div>
          </section>

          {/* Eligibility */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              3. Elegibilidad
            </h2>
            <p className="mb-4">Para usar este Sitio, usted debe:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Tener al menos 18 años de edad</li>
              <li>Tener capacidad legal para celebrar contratos vinculantes</li>
              <li>No estar ubicado en una jurisdicción donde el juego en línea sea ilegal</li>
              <li>No haber sido excluido o autoexcluido de actividades de juego</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              4. Responsabilidades del Usuario
            </h2>
            <p className="mb-4">Al usar nuestro Sitio, usted se compromete a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Proporcionar información precisa y verdadera</li>
              <li>Mantener la confidencialidad de su cuenta (si aplica)</li>
              <li>No usar el Sitio para actividades ilegales o fraudulentas</li>
              <li>No intentar dañar, desactivar o sobrecargar el Sitio</li>
              <li>No recopilar información de otros usuarios sin consentimiento</li>
              <li>Cumplir con todas las leyes locales aplicables sobre juego en línea</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">5. Propiedad Intelectual</h2>
            <p className="mb-4">
              Todo el contenido del Sitio, incluyendo texto, gráficos, logos, imágenes y software, es propiedad de 
              CasinosPesos o sus licenciantes y está protegido por leyes de derechos de autor.
            </p>
            <p>
              Usted puede ver, descargar e imprimir contenido del Sitio solo para uso personal y no comercial, 
              siempre que mantenga intactos todos los avisos de derechos de autor.
            </p>
          </section>

          {/* Affiliate Links */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">6. Enlaces de Afiliados y Divulgación</h2>
            <p className="mb-4">
              CasinosPesos participa en programas de afiliados con los casinos listados. Esto significa que podemos 
              recibir una comisión si hace clic en un enlace y se registra o realiza un depósito en un casino.
            </p>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <p className="text-sm">
                Esta compensación no afecta nuestras reseñas o calificaciones, que se basan en criterios objetivos 
                y están diseñadas para ayudarle a tomar decisiones informadas.
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary" />
              7. Descargo de Responsabilidad
            </h2>
            <div className="space-y-4">
              <p>CasinosPesos:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>No garantiza ganancias o resultados específicos del juego</li>
                <li>No es responsable de pérdidas incurridas en casinos de terceros</li>
                <li>No garantiza la disponibilidad continua de bonos o promociones</li>
                <li>No es responsable del contenido o prácticas de sitios enlazados</li>
                <li>Proporciona información "tal cual" sin garantías de ningún tipo</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitación de Responsabilidad</h2>
            <p>
              En ningún caso CasinosPesos, sus directores, empleados o afiliados serán responsables de daños directos, 
              indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar el Sitio.
            </p>
          </section>

          {/* Prohibited Activities */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Ban className="w-6 h-6 text-primary" />
              9. Actividades Prohibidas
            </h2>
            <p className="mb-4">Está estrictamente prohibido:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Usar bots, scrapers o herramientas automatizadas</li>
              <li>Crear múltiples cuentas para abusar de bonos</li>
              <li>Publicar contenido falso o difamatorio</li>
              <li>Intentar hackear o comprometer la seguridad del Sitio</li>
              <li>Usar el Sitio para actividades de lavado de dinero</li>
              <li>Violar cualquier ley local, estatal o federal</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">10. Terminación</h2>
            <p>
              Nos reservamos el derecho de suspender o terminar su acceso al Sitio en cualquier momento, 
              sin previo aviso, por violación de estos términos o por cualquier otra razón a nuestra discreción.
            </p>
          </section>

          {/* Governing Law */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4">11. Ley Aplicable</h2>
            <p>
              Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de México, 
              sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary" />
              12. Contacto
            </h2>
            <p className="mb-4">
              Si tiene preguntas sobre estos Términos y Condiciones, contáctenos:
            </p>
            <div className="bg-neutral-700 rounded-lg p-4">
              <p>Email: {contactInfo.email}</p>
              <p>Teléfono: {contactInfo.phoneDisplay}</p>
              <p>Dirección: {contactInfo.address.fullAddress}</p>
              <p className="mt-2 text-sm">{contactInfo.businessHours.es}</p>
            </div>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-neutral-400 hover:text-primary transition-colors">
              Política de Privacidad
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