'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BreadcrumbStructuredData } from '@/components/StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs from URL if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const paths = pathname.split('/').filter(Boolean);
    const locale = paths[0];
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Inicio', url: `/${locale}` }
    ];
    
    let currentPath = `/${locale}`;
    
    for (let i = 1; i < paths.length; i++) {
      currentPath += `/${paths[i]}`;
      
      // Format the name
      let name = paths[i]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Custom naming for known routes
      const customNames: Record<string, string> = {
        'casinos': 'Casinos',
        'bonos': 'Bonos',
        'guias': 'Guías',
        'comparar': 'Comparar',
        'blog': 'Blog',
        'sobre-nosotros': 'Sobre Nosotros',
        'juego-responsable': 'Juego Responsable',
        'metodos-pago': 'Métodos de Pago',
        'sin-deposito': 'Sin Depósito',
        'bienvenida': 'Bienvenida',
        'giros-gratis': 'Giros Gratis',
        'cashback': 'Cashback',
        'nuevos': 'Nuevos',
        'movil': 'Móvil',
        'en-vivo': 'En Vivo'
      };
      
      if (customNames[paths[i]]) {
        name = customNames[paths[i]];
      }
      
      breadcrumbs.push({ name, url: currentPath });
    }
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = generateBreadcrumbs();
  
  // Don't show breadcrumbs on homepage
  if (breadcrumbItems.length <= 1) return null;
  
  const structuredDataItems = breadcrumbItems.map(item => ({
    name: item.name,
    url: `https://casinospesos.com${item.url}`
  }));
  
  return (
    <>
      <nav 
        aria-label="Breadcrumb" 
        className={`bg-gray-50 border-b border-gray-200 ${className}`}
      >
        <div className="container mx-auto px-4 py-3">
          <ol 
            className="flex items-center space-x-2 text-sm overflow-x-auto whitespace-nowrap"
            itemScope 
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              
              return (
                <li 
                  key={item.url}
                  className="flex items-center"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {index === 0 ? (
                    <Link
                      href={item.url}
                      className="flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors"
                      itemProp="item"
                    >
                      <Home className="w-4 h-4" />
                      <span itemProp="name" className="sr-only sm:inline">
                        {item.name}
                      </span>
                    </Link>
                  ) : isLast ? (
                    <span 
                      className="text-gray-900 font-medium"
                      itemProp="name"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.url}
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.name}</span>
                    </Link>
                  )}
                  
                  <meta itemProp="position" content={String(index + 1)} />
                  
                  {!isLast && (
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      
      {/* Structured Data */}
      <BreadcrumbStructuredData items={structuredDataItems} />
    </>
  );
}