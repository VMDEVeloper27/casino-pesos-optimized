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
  Gamepad2,
  Gift,
  BookOpen,
  Scale,
  Edit,
  Search,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCountry, countries } from '@/contexts/CountryContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface PremiumHeaderProps {
  locale: string;
}

export function PremiumHeader({ locale }: PremiumHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { selectedCountry, setSelectedCountry, isCountrySelectorOpen, setIsCountrySelectorOpen } = useCountry();

  // Navigation items with casino theming
  const navItems = [
    { 
      label: locale === 'es' ? 'Casinos' : 'Casinos', 
      href: `/${locale}/casinos`, 
      icon: '🎰',
      hasDropdown: true,
      dropdownItems: [
        { label: locale === 'es' ? 'Todos los Casinos' : 'All Casinos', href: `/${locale}/casinos` },
        { label: locale === 'es' ? 'Nuevos Casinos' : 'New Casinos', href: `/${locale}/casinos/nuevos`, badge: 'NEW' },
        { label: locale === 'es' ? 'Casinos en Vivo' : 'Live Casinos', href: `/${locale}/casinos/en-vivo` },
        { label: locale === 'es' ? 'Casinos Móviles' : 'Mobile Casinos', href: `/${locale}/casinos/movil` },
      ]
    },
    { 
      label: locale === 'es' ? 'Bonos' : 'Bonuses', 
      href: `/${locale}/bonos`, 
      icon: '🎁', 
      badge: 'HOT',
      hasDropdown: true,
      dropdownItems: [
        { label: locale === 'es' ? 'Sin Depósito' : 'No Deposit', href: `/${locale}/bonos/sin-deposito`, badge: 'TOP' },
        { label: locale === 'es' ? 'Bienvenida' : 'Welcome', href: `/${locale}/bonos/bienvenida` },
        { label: locale === 'es' ? 'Giros Gratis' : 'Free Spins', href: `/${locale}/bonos/giros-gratis` },
        { label: locale === 'es' ? 'Cashback' : 'Cashback', href: `/${locale}/bonos/cashback` },
      ]
    },
    {
      label: locale === 'es' ? 'Más' : 'More',
      href: '#',
      icon: '📋',
      hasDropdown: true,
      dropdownItems: [
        { label: locale === 'es' ? 'Guías' : 'Guides', href: `/${locale}/guias`, icon: '📚' },
        { label: locale === 'es' ? 'Comparar Casinos' : 'Compare Casinos', href: `/${locale}/comparar`, icon: '⚖️' },
        { label: 'Blog', href: `/${locale}/blog`, icon: '✍️' },
      ]
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
      {/* Animated background effects */}
      <div className="fixed top-0 left-0 right-0 h-24 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900" />
        {/* Floating orbs */}
        <div className="absolute top-4 left-10 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse-slow" />
        <div className="absolute top-8 right-20 w-12 h-12 bg-purple-500/30 rounded-full blur-lg animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-6 left-1/3 w-8 h-8 bg-orange-500/40 rounded-full blur-lg animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Header */}
      <header className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-yellow-500/30 sticky top-0 z-50">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link href={`/${locale}`} className="flex items-center gap-3 group">
                <div className="relative">
                  {/* Casino chip logo */}
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600 rounded-full flex items-center justify-center ring-2 ring-yellow-500/50 group-hover:ring-yellow-400/70 transition-all group-hover:scale-110">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                      <span className="text-yellow-100 font-bold text-lg">C</span>
                    </div>
                  </div>
                  {/* Sparkle effects */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity" />
                </div>
                <div>
                  <span className="font-bold text-2xl bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent group-hover:from-yellow-200 group-hover:to-orange-300 transition-all">
                    CasinosPesos
                  </span>
                  <div className="text-xs text-yellow-400/80 -mt-1">
                    {locale === 'es' ? 'Tu Casino de Confianza' : 'Your Trusted Casino'}
                  </div>
                </div>
              </Link>

              {/* Navigation */}
              <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                  <div key={item.label} className="relative">
                    {item.hasDropdown ? (
                      <>
                        <button
                          onMouseEnter={() => setActiveDropdown(item.label)}
                          onMouseLeave={() => setActiveDropdown(null)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all group",
                            pathname.startsWith(item.href)
                              ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 shadow-lg shadow-yellow-500/20"
                              : "text-white/90 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-purple-800/50 hover:to-pink-800/50"
                          )}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                              {item.badge}
                            </span>
                          )}
                          <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                          <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                        </button>

                        {/* Dropdown */}
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              onMouseEnter={() => setActiveDropdown(item.label)}
                              onMouseLeave={() => setActiveDropdown(null)}
                              className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-br from-slate-800 to-purple-900 rounded-xl border border-yellow-500/30 shadow-2xl shadow-black/50 p-2 z-50"
                            >
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  className="flex items-center justify-between p-3 rounded-lg text-white/90 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-orange-500/10 transition-all group"
                                >
                                  <div className="flex items-center gap-2">
                                    {dropdownItem.icon && <span className="text-lg">{dropdownItem.icon}</span>}
                                    <span>{dropdownItem.label}</span>
                                  </div>
                                  {dropdownItem.badge && (
                                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                                      {dropdownItem.badge}
                                    </span>
                                  )}
                                  {!dropdownItem.badge && (
                                    <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
                                  )}
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
                          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all group",
                          pathname.startsWith(item.href)
                            ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 shadow-lg shadow-yellow-500/20"
                            : "text-white/90 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-purple-800/50 hover:to-pink-800/50"
                        )}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                            {item.badge}
                          </span>
                        )}
                        <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {/* Country Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-slate-800 to-purple-800 hover:from-purple-800 hover:to-pink-800 rounded-lg border border-yellow-500/30 text-white/90 hover:text-yellow-300 transition-all"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium">{selectedCountry.currency}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isCountrySelectorOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isCountrySelectorOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-gradient-to-br from-slate-800 to-purple-900 rounded-xl border border-yellow-500/30 shadow-2xl shadow-black/50 p-2 z-50"
                      >
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => handleCountrySelect(country)}
                            className={cn(
                              "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                              selectedCountry.code === country.code
                                ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300"
                                : "text-white/90 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-orange-500/10"
                            )}
                          >
                            <span className="text-lg">{country.flag}</span>
                            <div>
                              <div className="font-medium">{country.name}</div>
                              <div className="text-xs opacity-75">{country.currency}</div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Search Button */}
                <button className="p-2 bg-gradient-to-r from-slate-800 to-purple-800 hover:from-purple-800 hover:to-pink-800 rounded-lg border border-yellow-500/30 text-white/90 hover:text-yellow-300 transition-all group">
                  <Search className="w-5 h-5" />
                  <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                </button>

                {/* CTA Button */}
                <Link
                  href={`/${locale}/casinos`}
                  className="relative px-6 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-300 hover:via-yellow-400 hover:to-orange-400 text-black font-bold rounded-lg transition-all shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/50 hover:scale-105 group overflow-hidden"
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <span>{locale === 'es' ? '🎰 Jugar Ahora' : '🎰 Play Now'}</span>
                    <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                  </div>
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
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
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600 rounded-full flex items-center justify-center ring-2 ring-yellow-500/50">
                <div className="w-7 h-7 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                  <span className="text-yellow-100 font-bold text-sm">C</span>
                </div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                CasinosPesos
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-r from-slate-800 to-purple-800 rounded-lg border border-yellow-500/30"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
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
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 overflow-y-auto border-l border-yellow-500/30"
            >
              {/* Mobile menu content */}
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-slate-800 to-purple-800 rounded-lg border border-yellow-500/30 text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation items */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.hasDropdown ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-3 p-4 text-white/90 font-medium">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-0.5 rounded-full font-bold ml-auto">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="pl-8 space-y-1">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                                className={cn(
                                  "flex items-center gap-3 p-3 rounded-lg transition-all",
                                  pathname === dropdownItem.href
                                    ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300"
                                    : "text-white/80 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-pink-800/30"
                                )}
                              >
                                {dropdownItem.icon && <span className="text-lg">{dropdownItem.icon}</span>}
                                <span className="text-sm">{dropdownItem.label}</span>
                                {dropdownItem.badge && (
                                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-0.5 rounded-full font-bold ml-auto">
                                    {dropdownItem.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-lg transition-all",
                            pathname.startsWith(item.href)
                              ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300"
                              : "text-white/90 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-purple-800/50 hover:to-pink-800/50"
                          )}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-0.5 rounded-full font-bold ml-auto">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Country selector */}
                <div className="mt-8 p-4 bg-gradient-to-r from-slate-800/50 to-purple-800/50 rounded-lg border border-yellow-500/20">
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-yellow-400" />
                    {locale === 'es' ? 'País' : 'Country'}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {countries.slice(0, 4).map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                          selectedCountry.code === country.code
                            ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300"
                            : "text-white/90 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-orange-500/10"
                        )}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <div>
                          <div className="font-medium text-sm">{country.name}</div>
                          <div className="text-xs opacity-75">{country.currency}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <Link
                    href={`/${locale}/casinos`}
                    className="block w-full p-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black text-center font-bold rounded-lg shadow-lg shadow-yellow-500/30"
                  >
                    {locale === 'es' ? '🎰 Ver Mejores Casinos' : '🎰 View Best Casinos'}
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
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-t-2xl border-t border-yellow-500/30 z-50 p-6"
            >
              <div className="w-12 h-1 bg-yellow-500/50 rounded-full mx-auto mb-6" />
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-yellow-400" />
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
                        ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300"
                        : "text-white/90 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-orange-500/10"
                    )}
                  >
                    <span className="text-lg">{country.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{country.name}</div>
                      <div className="text-xs opacity-75">{country.currency}</div>
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