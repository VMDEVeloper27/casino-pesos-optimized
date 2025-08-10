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
  Search,
  Target,
  Gift,
  BookOpen,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCountry, countries } from '@/contexts/CountryContext';

interface ProfessionalHeaderProps {
  locale: string;
}

export function ProfessionalHeader({ locale }: ProfessionalHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { selectedCountry, setSelectedCountry, isCountrySelectorOpen, setIsCountrySelectorOpen } = useCountry();

  // Professional navigation items matching the reference design
  const navItems = [
    { 
      label: locale === 'es' ? 'Casinos' : 'Casinos', 
      href: `/${locale}/casinos`,
      icon: Target,
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
      icon: Gift,
      badge: 'HOT', // Only this section has the HOT badge
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
      href: `/${locale}/guias`,
      icon: BookOpen
    },
    { 
      label: locale === 'es' ? 'Comparar' : 'Compare', 
      href: `/${locale}/comparar`,
      icon: Scale
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
      {/* Professional Dark Header */}
      <header className="bg-slate-900 sticky top-0 z-50">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-3">
              {/* Professional Logo - Orange Circle with C */}
              <Link href={`/${locale}`} className="flex items-center gap-3 group">
                <div className="relative">
                  {/* Orange circle logo matching reference */}
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:from-orange-400 group-hover:to-orange-500 transition-all shadow-lg">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-xl text-white group-hover:text-orange-400 transition-colors">
                    CasinosPesos
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">
                    {locale === 'es' ? 'Análisis Profesional' : 'Professional Analysis'}
                  </div>
                </div>
              </Link>

              {/* Clean Navigation with Icons */}
              <nav className="flex items-center gap-6">
                {navItems.map((item) => (
                  <div key={item.label} className="relative">
                    {item.hasDropdown ? (
                      <>
                        <button
                          onMouseEnter={() => setActiveDropdown(item.label)}
                          onMouseLeave={() => setActiveDropdown(null)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-white hover:text-orange-400 group",
                            pathname.startsWith(item.href) && "text-orange-400"
                          )}
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-1">
                              {item.badge}
                            </span>
                          )}
                          <ChevronDown className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all" />
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
                              className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50"
                            >
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  className="flex items-center p-3 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all font-medium"
                                >
                                  <span>{dropdownItem.label}</span>
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
                          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-white hover:text-orange-400",
                          pathname.startsWith(item.href) && "text-orange-400"
                        )}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {/* Mexico Country Selector matching reference */}
                <div className="relative">
                  <button
                    onClick={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium">
                      {selectedCountry.code === 'MX' ? 'México' : selectedCountry.name}
                    </span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isCountrySelectorOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isCountrySelectorOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50"
                      >
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => handleCountrySelect(country)}
                            className={cn(
                              "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                              selectedCountry.code === country.code
                                ? "bg-orange-50 text-orange-600"
                                : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                            )}
                          >
                            <span className="text-lg">{country.flag}</span>
                            <div>
                              <div className="font-medium">{country.name}</div>
                              <div className="text-xs text-gray-500">{country.currency}</div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Orange CTA Button matching reference */}
                <Link
                  href={`/${locale}/casinos`}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {locale === 'es' ? 'Jugar Ahora' : 'Play Now'}
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
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <span className="font-bold text-lg text-white">CasinosPesos</span>
                <div className="text-xs text-gray-400 -mt-1">
                  {locale === 'es' ? 'Análisis Profesional' : 'Professional Analysis'}
                </div>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg text-white"
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
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-6 h-6" />
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
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-slate-900 z-50 overflow-y-auto shadow-xl"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-white">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg text-white"
                  >
                    <X className="w-5 h-5" />
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
                          ? "bg-orange-500/20 text-orange-400"
                          : "text-gray-300 hover:text-orange-400 hover:bg-gray-800"
                      )}
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-auto">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Country selector */}
                <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-400" />
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
                            ? "bg-orange-500/20 text-orange-400"
                            : "text-gray-300 hover:text-orange-400 hover:bg-gray-700"
                        )}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <div>
                          <div className="font-medium text-sm">{country.name}</div>
                          <div className="text-xs text-gray-500">{country.currency}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <Link
                    href={`/${locale}/casinos`}
                    className="block w-full p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center font-semibold rounded-lg hover:from-orange-400 hover:to-orange-500 transition-all shadow-lg"
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
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsCountrySelectorOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 rounded-t-xl shadow-xl z-50 p-6"
            >
              <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
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
                        ? "bg-orange-500/20 text-orange-400"
                        : "text-gray-300 hover:text-orange-400 hover:bg-gray-800"
                    )}
                  >
                    <span className="text-lg">{country.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{country.name}</div>
                      <div className="text-xs text-gray-500">{country.currency}</div>
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