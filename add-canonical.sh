#!/bin/bash

# Список страниц для обновления
pages=(
  "contacto"
  "dashboard"
  "dashboard/bonuses" 
  "dashboard/favorites"
  "dashboard/profile"
  "dashboard/settings"
  "guias"
  "rss"
)

for page in "${pages[@]}"; do
  filepath="src/app/[locale]/${page}/page.tsx"
  
  if [ -f "$filepath" ]; then
    echo "Обновляю $page..."
    
    # Создаём временный файл с новым содержимым
    cat > "${filepath}.new" << NEWPAGE
import { getCanonicalUrl } from '@/lib/canonical';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'es' ? '${page^} | CasinosPesos' : '${page^} | CasinosPesos',
    description: locale === 'es' ? 'Página de ${page}' : '${page^} page',
    alternates: {
      canonical: getCanonicalUrl('/${page}', locale),
    },
    robots: {
      index: $(if [[ $page == dashboard* ]]; then echo "false"; else echo "true"; fi),
      follow: $(if [[ $page == dashboard* ]]; then echo "false"; else echo "true"; fi),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div>Contenido de ${page}</div>;
}
NEWPAGE

    # Заменяем старый файл новым
    mv "${filepath}.new" "$filepath"
  fi
done

echo "Готово!"
