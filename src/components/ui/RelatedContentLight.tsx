import Link from 'next/link';
import { ChevronRight, TrendingUp, Star, Gift, BookOpen } from 'lucide-react';

interface RelatedItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
  locale?: string;
  className?: string;
}

export function RelatedContentLight({ 
  title = "Contenido Relacionado", 
  items, 
  locale = 'es',
  className = '' 
}: RelatedContentProps) {
  
  const defaultIcons: Record<string, React.ReactNode> = {
    casino: <Star className="w-5 h-5" />,
    bonus: <Gift className="w-5 h-5" />,
    guide: <BookOpen className="w-5 h-5" />,
    trending: <TrendingUp className="w-5 h-5" />
  };
  
  const getIcon = (href: string): React.ReactNode => {
    if (href.includes('bonos') || href.includes('bonus')) return defaultIcons.bonus;
    if (href.includes('guias') || href.includes('guide')) return defaultIcons.guide;
    if (href.includes('casinos')) return defaultIcons.casino;
    return defaultIcons.trending;
  };
  
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary-600" />
        {title}
      </h3>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-primary-200 transition-all"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
              {item.icon || getIcon(item.href)}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h4>
                {item.badge && (
                  <span className="text-xs bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold border border-orange-200">
                    {item.badge}
                  </span>
                )}
              </div>
              
              {item.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {item.description}
                </p>
              )}
            </div>
            
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors mt-0.5" />
          </Link>
        ))}
      </div>
      
      {/* SEO Rich Internal Links */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">
          {locale === 'es' ? 'Explorar Más' : 'Explore More'}
        </h4>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/${locale}/casinos/nuevos`}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-full transition-all border border-gray-200 hover:border-gray-300"
          >
            Nuevos Casinos 2025
          </Link>
          <Link
            href={`/${locale}/bonos/sin-deposito`}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-full transition-all border border-gray-200 hover:border-gray-300"
          >
            Bonos Sin Depósito
          </Link>
          <Link
            href={`/${locale}/metodos-pago/oxxo`}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-full transition-all border border-gray-200 hover:border-gray-300"
          >
            Casinos OXXO
          </Link>
          <Link
            href={`/${locale}/casinos/movil`}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-full transition-all border border-gray-200 hover:border-gray-300"
          >
            Casinos Móviles
          </Link>
        </div>
      </div>
    </div>
  );
}

// Pre-configured related content for different page types
export const casinoRelatedContent = (locale: string = 'es'): RelatedItem[] => [
  {
    title: locale === 'es' ? 'Mejores Bonos de Bienvenida' : 'Best Welcome Bonuses',
    href: `/${locale}/bonos/bienvenida`,
    description: locale === 'es' 
      ? 'Hasta $50,000 MXN + giros gratis' 
      : 'Up to $50,000 MXN + free spins',
    badge: 'HOT'
  },
  {
    title: locale === 'es' ? 'Casinos con PayPal' : 'PayPal Casinos',
    href: `/${locale}/metodos-pago/paypal`,
    description: locale === 'es'
      ? 'Depósitos y retiros instantáneos'
      : 'Instant deposits and withdrawals'
  },
  {
    title: locale === 'es' ? 'Comparador de Casinos' : 'Casino Comparison',
    href: `/${locale}/comparar`,
    description: locale === 'es'
      ? 'Compara bonos, juegos y más'
      : 'Compare bonuses, games and more'
  }
];

export const bonusRelatedContent = (locale: string = 'es'): RelatedItem[] => [
  {
    title: locale === 'es' ? 'Giros Gratis Sin Depósito' : 'No Deposit Free Spins',
    href: `/${locale}/bonos/giros-gratis`,
    description: locale === 'es'
      ? 'Hasta 100 giros sin depositar'
      : 'Up to 100 spins without deposit',
    badge: 'NEW'
  },
  {
    title: locale === 'es' ? 'Códigos de Bono Exclusivos' : 'Exclusive Bonus Codes',
    href: `/${locale}/bonos/codigos`,
    description: locale === 'es'
      ? 'Códigos actualizados diariamente'
      : 'Daily updated codes'
  },
  {
    title: locale === 'es' ? 'Guía de Requisitos de Apuesta' : 'Wagering Requirements Guide',
    href: `/${locale}/guias/requisitos-apuesta`,
    description: locale === 'es'
      ? 'Todo sobre rollover y términos'
      : 'Everything about rollover and terms'
  }
];