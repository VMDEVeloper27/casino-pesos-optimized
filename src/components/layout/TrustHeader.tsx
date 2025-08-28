'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Globe,
  Shield,
  Award,
  Search,
  Star,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCountry, countries } from '@/contexts/CountryContext';

interface TrustHeaderProps {
  locale: string;
}

export function TrustHeader({ locale }: TrustHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { selectedCountry, setSelectedCountry, isCountrySelectorOpen, setIsCountrySelectorOpen } = useCountry();

  // Professional navigation items - no flashy icons or badges
  const navItems = [
    { 
      label: locale === 'es' ? 'Casinos' : 'Casinos', 
      href: `/${locale}/casinos`,
      hasDropdown: true,
      dropdownItems: [
        { label: locale === 'es' ? 'Todos los Casinos' : 'All Casinos', href: `/${locale}/casinos` },
        { label: locale === 'es' ? 'Nuevos Casinos' : 'New Casinos', href: `/${locale}/casinos/nuevos` },
        { label: locale === 'es' ? 'Casinos en Vivo' : 'Live Casinos', href: `/${locale}/casinos/en-vivo` },
        { label: locale === 'es' ? 'Casinos Móviles' : 'Mobile Casinos', href: `/${locale}/casinos/movil` },
      ]
    },
    { 
      label: locale === 'es' ? 'Bonos' : 'Bonuses', 
      href: `/${locale}/bonos`,
      hasDropdown: true,
      dropdownItems: [
        { label: locale === 'es' ? 'Sin Depósito' : 'No Deposit', href: `/${locale}/bonos/sin-deposito` },
        { label: locale === 'es' ? 'Bienvenida' : 'Welcome', href: `/${locale}/bonos/bienvenida` },
        { label: locale === 'es' ? 'Giros Gratis' : 'Free Spins', href: `/${locale}/bonos/giros-gratis` },
        { label: locale === 'es' ? 'Cashback' : 'Cashback', href: `/${locale}/bonos/cashback` },
      ]
    },
    { 
      label: locale === 'es' ? 'Guías' : 'Guides', 
      href: `/${locale}/guias`
    },
    { 
      label: locale === 'es' ? 'Comparar' : 'Compare', 
      href: `/${locale}/comparar`
    },
    { 
      label: 'Blog', 
      href: `/${locale}/blog`
    },
  ];

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsCountrySelectorOpen(false);
  }, [pathname, setIsCountrySelectorOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setIsCountrySelectorOpen(false);
    
    // Redirect to appropriate locale if different
    if (country.locale !== locale) {
      const newPath = pathname.replace(`/${locale}`, `/${country.locale}`);
      window.location.href = newPath;
    }
  };

  return (
    <>
      {/* Main Header - Clean & Professional */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        {/* Trust indicators bar */}
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-blue-800">
                <Shield className="w-4 h-4" />
                <span className="font-medium">{locale === 'es' ? 'Sitio Seguro' : 'Secure Site'}</span>
              </div>
              <div className="flex items-center gap-2 text-green-800">
                <Award className="w-4 h-4" />
                <span className="font-medium">{locale === 'es' ? 'Información Verificada' : 'Verified Info'}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <Star className="w-4 h-4" />
                <span className="font-medium">{locale === 'es' ? 'Fuente Confiable' : 'Trusted Source'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Professional Logo */}
              <Link href={`/${locale}`} className="flex items-center gap-3 group">
                <div className="relative">
                  {/* Clean, professional logo */}
                  <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-800 transition-colors">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-2xl text-gray-900 group-hover:text-blue-900 transition-colors">
                    CasinosPesos
                  </span>
                  <div className="text-xs text-gray-600 -mt-1">
                    {locale === 'es' ? 'Tu Guía Confiable' : 'Your Trusted Guide'}
                  </div>
                </div>
              </Link>

              {/* Clean Navigation */}
              <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                  <div key={item.label} className="relative">
                    {item.hasDropdown ? (
                      <>
                        <button
                          onMouseEnter={() => setActiveDropdown(item.label)}
                          onMouseLeave={() => setActiveDropdown(null)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                            pathname.startsWith(item.href)
                              ? "bg-blue-50 text-blue-900 shadow-sm"
                              : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        </button>

                        {/* Professional Dropdown */}
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.15 }}
                              onMouseEnter={() => setActiveDropdown(item.label)}
                              onMouseLeave={() => setActiveDropdown(null)}
                              className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg p-2 z-50"
                            >
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-blue-50 transition-all"
                                >
                                  <span className="font-medium">{dropdownItem.label}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                          pathname.startsWith(item.href)
                            ? "bg-blue-50 text-blue-900 shadow-sm"
                            : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                        )}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-3">
                {/* Country Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 hover:text-blue-900 transition-all"
                  >
                    <span className="text-sm">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium">{selectedCountry.currency}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isCountrySelectorOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isCountrySelectorOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg p-2 z-50"
                      >
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => handleCountrySelect(country)}
                            className={cn(
                              "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                              selectedCountry.code === country.code
                                ? "bg-blue-50 text-blue-900"
                                : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                            )}
                          >
                            <span>{country.flag}</span>
                            <div>
                              <div className="font-medium">{country.name}</div>
                              <div className="text-xs text-gray-700">{country.currency}</div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Search */}
                <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 hover:text-blue-900 transition-all">
                  <Search className="w-5 h-5" />
                </button>

                {/* Professional CTA */}
                <Link
                  href={`/${locale}/casinos`}
                  className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  {locale === 'es' ? 'Ver Casinos' : 'View Casinos'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between p-4">
            {/* Mobile Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                CasinosPesos
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200"
              aria-label={isMobileMenuOpen ? (locale === 'es' ? 'Cerrar menú' : 'Close menu') : (locale === 'es' ? 'Abrir menú' : 'Open menu')}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-6 h-6 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white z-50 overflow-y-auto shadow-xl"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-gray-900">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg"
                    aria-label={locale === 'es' ? 'Cerrar menú' : 'Close menu'}
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Navigation items */}
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg transition-all font-medium",
                        pathname.startsWith(item.href)
                          ? "bg-blue-50 text-blue-900"
                          : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* Country selector */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-gray-900 font-medium mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-900" />
                    {locale === 'es' ? 'País' : 'Country'}
                  </h3>
                  <div className="space-y-2">
                    {countries.slice(0, 4).map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                          selectedCountry.code === country.code
                            ? "bg-blue-100 text-blue-900"
                            : "text-gray-700 hover:text-blue-900 hover:bg-white"
                        )}
                      >
                        <span>{country.flag}</span>
                        <div>
                          <div className="font-medium text-sm">{country.name}</div>
                          <div className="text-xs text-gray-700">{country.currency}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <Link
                    href={`/${locale}/casinos`}
                    className="block w-full p-4 bg-blue-900 text-white text-center font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    {locale === 'es' ? 'Ver Mejores Casinos' : 'View Best Casinos'}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Country Selector Bottom Sheet (Mobile) */}
      <AnimatePresence>
        {isCountrySelectorOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/20 z-50"
              onClick={() => setIsCountrySelectorOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-50 p-6"
            >
              <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
              <h3 className="text-gray-900 font-semibold text-lg mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-900" />
                {locale === 'es' ? 'Seleccionar País' : 'Select Country'}
              </h3>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                      selectedCountry.code === country.code
                        ? "bg-blue-50 text-blue-900"
                        : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                    )}
                  >
                    <span>{country.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{country.name}</div>
                      <div className="text-xs text-gray-700">{country.currency}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}