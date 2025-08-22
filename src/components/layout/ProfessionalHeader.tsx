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
  Scale,
  Gamepad2,
  User,
  LogOut,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCountry, countries } from '@/contexts/CountryContext';
import { useSession, signOut } from 'next-auth/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { MobileNav } from '@/components/ui/MobileNav';

interface ProfessionalHeaderProps {
  locale: string;
}

export function ProfessionalHeader({ locale }: ProfessionalHeaderProps) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { selectedCountry } = useCountry();
  const { data: session, status } = useSession();

  // Navigation items with dropdowns
  const navItems = [
    { 
      label: locale === 'es' ? 'Casinos' : 'Casinos', 
      href: `/${locale}/casinos`,
      icon: Target
    },
    { 
      label: locale === 'es' ? 'Juegos' : 'Games', 
      href: `/${locale}/juegos`,
      icon: Gamepad2,
      badge: 'NEW'
    },
    { 
      label: locale === 'es' ? 'Bonos' : 'Bonuses', 
      href: `/${locale}/bonos`,
      icon: Gift,
      badge: 'HOT'
    },
    {
      label: locale === 'es' ? 'Más' : 'More',
      href: '#',
      icon: ChevronDown,
      hasDropdown: true,
      dropdownItems: [
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
          href: `/${locale}/blog`,
          icon: BookOpen
        },
        { 
          label: locale === 'es' ? 'Contacto' : 'Contact', 
          href: `/${locale}/contacto`,
          icon: User
        },
      ]
    },
  ];

  // Close all menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    setActiveDropdown(null);
  }, [pathname]);


  return (
    <>
      {/* Mobile Navigation Component */}
      <div className="lg:hidden">
        <MobileNav locale={locale} />
      </div>
      
      {/* Professional Light Header */}
      <header className="hidden lg:block bg-white border-b border-border sticky top-0 z-50 shadow-soft">
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

              {/* Navigation with Dropdowns */}
              <nav className="flex items-center gap-6">
                {navItems.map((item) => (
                  <div key={item.label} className="relative">
                    {item.hasDropdown ? (
                      <>
                        <button
                          onMouseEnter={() => setActiveDropdown(item.label)}
                          onMouseLeave={() => setActiveDropdown(null)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-gray-700 hover:text-green-700 hover:bg-green-50",
                            activeDropdown === item.label && "text-green-700 bg-green-50"
                          )}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              onMouseEnter={() => setActiveDropdown(item.label)}
                              onMouseLeave={() => setActiveDropdown(null)}
                              className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                            >
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  className={cn(
                                    "flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors",
                                    pathname === dropdownItem.href && "text-green-700 bg-green-50"
                                  )}
                                >
                                  {dropdownItem.icon && <dropdownItem.icon className="w-4 h-4" />}
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
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {/* Language Switcher */}
                <LanguageSwitcher />

                {/* Auth Buttons or User Menu */}
                {status === 'loading' ? (
                  <div className="animate-pulse bg-gray-200 h-10 w-24 rounded-lg"></div>
                ) : session ? (
                  // User dropdown menu when logged in
                  <div className="relative">
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-medium">
                        {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                        {session.user?.name || session.user?.email?.split('@')[0]}
                      </span>
                      <ChevronDown className={cn(
                        "w-4 h-4 text-gray-500 transition-transform",
                        isUserDropdownOpen && "rotate-180"
                      )} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isUserDropdownOpen && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsUserDropdownOpen(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                          >
                            <div className="p-3 border-b border-gray-100">
                              <p className="text-sm font-medium text-gray-900">{session.user?.name || session.user?.email?.split('@')[0]}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{session.user?.email}</p>
                              {session.user?.role && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-2">
                                  {session.user.role === 'admin' ? 'Administrador' : session.user.role === 'editor' ? 'Editor' : 'Usuario'}
                                </span>
                              )}
                            </div>
                            <div className="py-2">
                              <Link
                                href={`/${locale}/dashboard`}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setIsUserDropdownOpen(false)}
                              >
                                <LayoutDashboard className="w-4 h-4" />
                                {locale === 'es' ? 'Mi Panel' : 'My Dashboard'}
                              </Link>
                              <Link
                                href={`/${locale}/dashboard/profile`}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setIsUserDropdownOpen(false)}
                              >
                                <User className="w-4 h-4" />
                                {locale === 'es' ? 'Mi Perfil' : 'My Profile'}
                              </Link>
                              <Link
                                href={`/${locale}/dashboard/settings`}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setIsUserDropdownOpen(false)}
                              >
                                <Settings className="w-4 h-4" />
                                {locale === 'es' ? 'Configuración' : 'Settings'}
                              </Link>
                              {(session.user?.role === 'admin' || session.user?.role === 'editor') && (
                                <>
                                  <div className="border-t border-gray-100 my-2"></div>
                                  <Link
                                    href="/admin"
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsUserDropdownOpen(false)}
                                  >
                                    <Settings className="w-4 h-4" />
                                    {locale === 'es' ? 'Panel Admin' : 'Admin Panel'}
                                  </Link>
                                </>
                              )}
                              <div className="border-t border-gray-100 my-2"></div>
                              <button
                                onClick={() => {
                                  setIsUserDropdownOpen(false);
                                  signOut({ callbackUrl: `/${locale}` });
                                }}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                              >
                                <LogOut className="w-4 h-4" />
                                {locale === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Login and Register buttons when not logged in
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/${locale}/auth/signin`}
                      className="px-4 py-2 text-gray-700 font-medium hover:text-green-700 transition-colors"
                    >
                      {locale === 'es' ? 'Iniciar Sesión' : 'Sign In'}
                    </Link>
                    <Link
                      href={`/${locale}/auth/signup`}
                      className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all shadow-medium hover:shadow-large transform hover:scale-105"
                    >
                      {locale === 'es' ? 'Registrarse' : 'Sign Up'}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}