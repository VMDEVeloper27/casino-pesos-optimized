'use client';

import { useState, useEffect } from 'react';
import { CasinoCard } from './CasinoCardLight';
import type { Casino } from '@/lib/casino-database';

interface LazyLoadedCasinosProps {
  casinos: Casino[];
  locale: string;
}

export default function LazyLoadedCasinos({ casinos, locale }: LazyLoadedCasinosProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load after initial render to improve FCP
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return (
      <>
        {casinos.map((_, index) => (
          <div 
            key={index}
            className="animate-pulse bg-gray-100 rounded-2xl h-[500px] sm:h-[600px]"
          />
        ))}
      </>
    );
  }

  return (
    <>
      {casinos.map((casino) => (
        <CasinoCard 
          key={casino.id} 
          casino={casino} 
          locale={locale}
        />
      ))}
    </>
  );
}