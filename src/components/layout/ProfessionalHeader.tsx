'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight,
  Check,
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
  const pathname = usePathname();
  const { selectedCountry } = useCountry();

  // Simplified navigation items without dropdowns
  const navItems = [
    { 
      label: locale === 'es' ? 'Casinos' : 'Casinos', 
      href: `/${locale}/casinos`,
      icon: Target
    },
    { 
      label: locale === 'es' ? 'Bonos' : 'Bonuses', 
      href: `/${locale}/bonos`,
      icon: Gift,
      badge: 'HOT'
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  return (
    <>
      {/* Professional Light Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-soft">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-3">
              {/* Casino Chip Logo with Big C */}
              <Link href={`/${locale}`} className="flex items-center gap-3 group">
                <div className="relative">
                  {/* Casino Chip Design */}
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center group-hover:from-green-500 group-hover:to-green-600 transition-all shadow-lg border-4 border-white ring-2 ring-green-200">
                    {/* Dotted border pattern like casino chip */}
                    <div className="absolute inset-1 border-2 border-dashed border-green-200 rounded-full opacity-60"></div>
                    <span className="text-white font-bold text-2xl relative z-10">C</span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-xl text-gray-900 group-hover:text-green-700 transition-colors">
                    CasinosPesos
                  </span>
                  <div className="text-xs text-gray-500 -mt-1">
                    {locale === 'es' ? 'Análisis Profesional' : 'Professional Analysis'}
                  </div>
                </div>
              </Link>

              {/* Clean Navigation without Dropdowns */}
              <nav className="flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-gray-700 hover:text-green-700 hover:bg-green-50",
                      pathname.startsWith(item.href) && "text-green-700 bg-green-50"
                    )}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-1 animate-pulse-slow">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {/* Simple Country Badge */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-700 border border-gray-200">
                  <Globe className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{selectedCountry.flag}</span>
                  <span className="text-sm font-medium">
                    {selectedCountry.code === 'MX' ? 'México' : selectedCountry.name}
                  </span>
                </div>

                {/* Orange CTA Button matching reference */}
                <Link
                  href={`/${locale}/casinos`}
                  className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all shadow-medium hover:shadow-large transform hover:scale-105"
                >
                  {locale === 'es' ? 'Jugar Ahora' : 'Play Now'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between p-3">
            {/* Mobile Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-white ring-1 ring-green-200">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="min-w-0">
                <span className="font-bold text-base sm:text-lg text-gray-900 truncate block">CasinosPesos</span>
                <div className="text-xs text-gray-500 -mt-1 hidden sm:block">
                  {locale === 'es' ? 'Análisis Profesional' : 'Professional Analysis'}
                </div>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
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
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[min(80vw,320px)] bg-white z-50 overflow-y-auto shadow-2xl mobile-menu-panel border-l border-gray-200"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-gray-900">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
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
                          ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                          : "text-gray-700 hover:text-green-700 hover:bg-gray-50"
                      )}
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-auto animate-pulse-slow">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Current Country Display */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-gray-900 font-medium mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    {locale === 'es' ? 'Región' : 'Region'}
                  </h3>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                    <span className="text-2xl">{selectedCountry.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900">{selectedCountry.name}</div>
                      <div className="text-sm text-green-700">{selectedCountry.currency}</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <Link
                    href={`/${locale}/casinos`}
                    className="block w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-center font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-medium hover:shadow-large"
                  >
                    {locale === 'es' ? 'Ver Mejores Casinos' : 'View Best Casinos'}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  );
}