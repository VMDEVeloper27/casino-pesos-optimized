'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Country configuration
export interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
  locale: string;
}

export const countries: Country[] = [
  { code: 'MX', name: 'México', currency: 'MXN', flag: '🇲🇽', locale: 'es' },
  { code: 'AR', name: 'Argentina', currency: 'ARS', flag: '🇦🇷', locale: 'es' },
  { code: 'CO', name: 'Colombia', currency: 'COP', flag: '🇨🇴', locale: 'es' },
  { code: 'CL', name: 'Chile', currency: 'CLP', flag: '🇨🇱', locale: 'es' },
  { code: 'PE', name: 'Perú', currency: 'PEN', flag: '🇵🇪', locale: 'es' },
];

interface CountryContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  isCountrySelectorOpen: boolean;
  setIsCountrySelectorOpen: (open: boolean) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

interface CountryProviderProps {
  children: ReactNode;
  initialLocale?: string;
}

export function CountryProvider({ children, initialLocale = 'es' }: CountryProviderProps) {
  // Find default country based on locale
  const defaultCountry = countries.find(c => c.locale === initialLocale) || countries[0];
  
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);

  // Update country based on locale changes
  useEffect(() => {
    const countryForLocale = countries.find(c => c.locale === initialLocale);
    if (countryForLocale && countryForLocale.code !== selectedCountry.code) {
      setSelectedCountry(countryForLocale);
    }
  }, [initialLocale, selectedCountry.code]);

  // Save to localStorage when country changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
    }
  }, [selectedCountry]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedCountry');
      if (saved) {
        try {
          const savedCountry = JSON.parse(saved);
          const validCountry = countries.find(c => c.code === savedCountry.code);
          if (validCountry) {
            setSelectedCountry(validCountry);
          }
        } catch {
          // Invalid data, keep default
        }
      }
    }
  }, []);

  return (
    <CountryContext.Provider 
      value={{
        selectedCountry,
        setSelectedCountry,
        isCountrySelectorOpen,
        setIsCountrySelectorOpen,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}

// Utility functions
export function getCountryByCurrency(currency: string): Country | undefined {
  return countries.find(country => country.currency === currency);
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find(country => country.code === code);
}

export function formatCurrencyByCountry(amount: number, country: Country): string {
  try {
    return new Intl.NumberFormat(country.locale === 'es' ? 'es-MX' : 'en-US', {
      style: 'currency',
      currency: country.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${country.currency} ${amount.toLocaleString()}`;
  }
}