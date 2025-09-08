'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { 
  BookOpen,
  ChevronRight,
  CreditCard,
  Gamepad2, 
  Gift,
  Globe,
  Home, 
  Menu,
  Search,
  Settings,
  Shield,
  Star,
  TrendingUp,
  User,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  locale?: string;
}

export function MobileNav({ locale = 'es' }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // Use scroll lock hook to prevent body scroll when menu is open
  useScrollLock(isOpen);

  // Additional scroll prevention for iOS and problematic devices
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Create a fixed overlay that captures all events
      const overlay = document.createElement('div');
      overlay.id = 'scroll-lock-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.zIndex = '1';
      overlay.style.touchAction = 'none';
      overlay.style.userSelect = 'none';
      overlay.style.WebkitUserSelect = 'none';
      document.body.appendChild(overlay);
      
      // Prevent all scroll events
      const preventAll = (e: Event) => {
        // Allow scrolling only in menu panel
        const target = e.target as HTMLElement;
        if (target.closest('.mobile-menu-panel')) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      };
      
      // Add listeners to multiple elements to be sure
      const elements = [document, document.body, document.documentElement, window];
      const events = ['scroll', 'wheel', 'touchmove', 'touchstart', 'mousewheel', 'DOMMouseScroll'];
      
      elements.forEach(el => {
        events.forEach(event => {
          el.addEventListener(event, preventAll, { passive: false, capture: true });
        });
      });
      
      // Apply all locking styles
      const originalStyles = {
        bodyPosition: document.body.style.position,
        bodyTop: document.body.style.top,
        bodyLeft: document.body.style.left,
        bodyRight: document.body.style.right,
        bodyBottom: document.body.style.bottom,
        bodyOverflow: document.body.style.overflow,
        bodyWidth: document.body.style.width,
        bodyHeight: document.body.style.height,
        htmlOverflow: document.documentElement.style.overflow,
        htmlPosition: document.documentElement.style.position,
        htmlHeight: document.documentElement.style.height,
      };
      
      // Lock body completely
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.bottom = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'none';
      document.body.style.userSelect = 'none';
      document.body.style.WebkitOverflowScrolling = 'touch';
      document.body.setAttribute('data-scroll-locked', 'true');
      
      // Lock html too
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.height = '100%';
      document.documentElement.style.touchAction = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
      
      return () => {
        // Remove overlay
        const overlay = document.getElementById('scroll-lock-overlay');
        if (overlay) {
          overlay.remove();
        }
        
        // Remove all event listeners
        elements.forEach(el => {
          events.forEach(event => {
            el.removeEventListener(event, preventAll, { capture: true });
          });
        });
        
        // Restore ALL styles properly
        document.body.style.position = originalStyles.bodyPosition;
        document.body.style.top = originalStyles.bodyTop;
        document.body.style.left = originalStyles.bodyLeft;
        document.body.style.right = originalStyles.bodyRight;
        document.body.style.bottom = originalStyles.bodyBottom;
        document.body.style.overflow = originalStyles.bodyOverflow;
        document.body.style.width = originalStyles.bodyWidth;
        document.body.style.height = originalStyles.bodyHeight;
        document.body.style.touchAction = '';
        document.body.style.overscrollBehavior = '';
        document.body.style.userSelect = '';
        document.body.style.WebkitOverflowScrolling = '';
        document.body.removeAttribute('data-scroll-locked');
        
        document.documentElement.style.overflow = originalStyles.htmlOverflow;
        document.documentElement.style.position = originalStyles.htmlPosition;
        document.documentElement.style.height = originalStyles.htmlHeight;
        document.documentElement.style.touchAction = '';
        document.documentElement.style.overscrollBehavior = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
    
    // Cleanup on unmount
    return () => {
      // Remove overlay if exists
      const overlay = document.getElementById('scroll-lock-overlay');
      if (overlay) {
        overlay.remove();
      }
      
      // Make sure everything is cleaned up if component unmounts while open
      document.body.removeAttribute('data-scroll-locked');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.bottom = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.touchAction = '';
      document.body.style.userSelect = '';
      document.body.style.WebkitOverflowScrolling = '';
      
      document.documentElement.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
      document.documentElement.style.touchAction = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
    }
  }, [isOpen]);

  const menuItems: Array<{
    id: string;
    label: string;
    icon: typeof Home;
    href: string;
    badge: string | null;
    submenu?: Array<{
      label: string;
      href: string;
      icon: typeof Home;
      badge?: string;
    }>;
  }> = [
    {
      id: 'home',
      label: locale === 'es' ? 'Inicio' : 'Home',
      icon: Home,
      href: `/${locale}`,
      badge: null,
    },
    {
      id: 'casinos',
      label: locale === 'es' ? 'Casinos' : 'Casinos',
      icon: Gamepad2,
      href: `/${locale}/casinos`,
      badge: 'NEW',
      submenu: [
        { 
          label: locale === 'es' ? 'Todos los Casinos' : 'All Casinos', 
          href: `/${locale}/casinos`,
          icon: Star
        },
        { 
          label: locale === 'es' ? 'Nuevos Casinos' : 'New Casinos', 
          href: `/${locale}/casinos/nuevos`,
          icon: TrendingUp,
          badge: 'HOT'
        },
        { 
          label: locale === 'es' ? 'Casinos Móviles' : 'Mobile Casinos', 
          href: `/${locale}/casinos/movil`,
          icon: Gamepad2
        },
        { 
          label: locale === 'es' ? 'Casino en Vivo' : 'Live Casino', 
          href: `/${locale}/casinos/en-vivo`,
          icon: Gamepad2
        },
      ]
    },
    {
      id: 'bonuses',
      label: locale === 'es' ? 'Bonos' : 'Bonuses',
      icon: Gift,
      href: `/${locale}/bonos`,
      badge: '🔥',
      submenu: [
        { 
          label: locale === 'es' ? 'Sin Depósito' : 'No Deposit', 
          href: `/${locale}/bonos/sin-deposito`,
          icon: Gift,
          badge: 'TOP'
        },
        { 
          label: locale === 'es' ? 'Bienvenida' : 'Welcome', 
          href: `/${locale}/bonos/bienvenida`,
          icon: Gift
        },
        { 
          label: locale === 'es' ? 'Giros Gratis' : 'Free Spins', 
          href: `/${locale}/bonos/giros-gratis`,
          icon: Gift
        },
        { 
          label: locale === 'es' ? 'Cashback' : 'Cashback', 
          href: `/${locale}/bonos/cashback`,
          icon: CreditCard
        },
      ]
    },
    {
      id: 'guides',
      label: locale === 'es' ? 'Guías' : 'Guides',
      icon: BookOpen,
      href: `/${locale}/guias`,
      badge: null,
    },
  ];

  const bottomLinks = [
    {
      label: locale === 'es' ? 'Juego Responsable' : 'Responsible Gaming',
      href: `/${locale}/juego-responsable`,
      icon: Shield
    },
    {
      label: locale === 'es' ? 'Sobre Nosotros' : 'About Us',
      href: `/${locale}/sobre-nosotros`,
      icon: User
    },
    {
      label: locale === 'es' ? 'Contacto' : 'Contact',
      href: `/${locale}/contacto`,
      icon: Settings
    },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-white text-lg">CasinosPesos</span>
          </Link>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative min-w-[47px] min-h-[47px] w-12 h-12 flex items-center justify-center rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
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

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="search"
              placeholder={locale === 'es' ? 'Buscar casinos o juegos...' : 'Search casinos or games...'}
              className="w-full bg-neutral-800 text-white pl-10 pr-4 py-3 rounded-lg text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 mobile-menu-backdrop"
              onClick={() => setIsOpen(false)}
              onTouchMove={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onWheel={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{ 
                touchAction: 'none',
                overscrollBehavior: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-80 bg-neutral-900 z-50 overflow-y-auto mobile-menu-panel"
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {/* Menu Header */}
              <div className="p-4 border-b border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <Link href={`/${locale}`} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-lg">C</span>
                    </div>
                    <span className="font-bold text-white text-lg">CasinosPesos</span>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="min-w-[47px] min-h-[47px] w-12 h-12 flex items-center justify-center text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-neutral-800 rounded-lg p-2 text-center">
                    <div className="text-primary font-bold text-lg">50+</div>
                    <div className="text-xs text-neutral-400">Casinos</div>
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-2 text-center">
                    <div className="text-accent font-bold text-lg">$50k</div>
                    <div className="text-xs text-neutral-400">en Bonos</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="p-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="mb-2">
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => setActiveSubmenu(activeSubmenu === item.id ? null : item.id)}
                          className={cn(
                            "w-full flex items-center justify-between p-3 rounded-lg transition-colors min-h-[48px]",
                            pathname.startsWith(item.href) 
                              ? "bg-primary/20 text-primary" 
                              : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <span className="bg-accent text-black text-xs px-2 py-0.5 rounded-full font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <ChevronRight 
                            className={cn(
                              "w-4 h-4 transition-transform",
                              activeSubmenu === item.id && "rotate-90"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {activeSubmenu === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-8 mt-1 space-y-1">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className="flex items-center gap-3 p-3 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors min-h-[48px]"
                                  >
                                    <subItem.icon className="w-4 h-4" />
                                    <span>{subItem.label}</span>
                                    {subItem.badge && (
                                      <span className="bg-primary text-black text-xs px-2 py-0.5 rounded-full font-bold">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg transition-colors min-h-[48px]",
                          pathname === item.href 
                            ? "bg-primary/20 text-primary" 
                            : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="bg-accent text-black text-xs px-2 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Divider */}
                <div className="my-4 border-t border-neutral-800" />

                {/* Bottom Links */}
                {bottomLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors min-h-[48px]"
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                ))}

                {/* Language Switcher */}
                <div className="mt-4 p-3 bg-neutral-800 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-white">
                      {locale === 'es' ? 'Idioma' : 'Language'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/es"
                      className={cn(
                        "text-center py-3 rounded-lg text-sm font-medium transition-colors min-h-[48px] flex items-center justify-center",
                        locale === 'es' 
                          ? "bg-primary text-black" 
                          : "bg-neutral-700 text-neutral-300 hover:text-white"
                      )}
                    >
                      Español
                    </Link>
                    <Link
                      href="/en"
                      className={cn(
                        "text-center py-3 rounded-lg text-sm font-medium transition-colors min-h-[48px] flex items-center justify-center",
                        locale === 'en' 
                          ? "bg-primary text-black" 
                          : "bg-neutral-700 text-neutral-300 hover:text-white"
                      )}
                    >
                      English
                    </Link>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-4">
                  <Link
                    href={`/${locale}/casinos`}
                    className="block w-full bg-gradient-to-r from-primary to-accent text-black text-center py-3 rounded-lg font-bold min-h-[48px] flex items-center justify-center"
                  >
                    {locale === 'es' ? '🎰 Ver Mejores Casinos' : '🎰 View Best Casinos'}
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar (Always Visible on Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 z-30">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Link
            href={`/${locale}`}
            className={cn(
              "flex flex-col items-center justify-center py-2 rounded-lg transition-colors min-h-[48px]",
              pathname === `/${locale}` 
                ? "bg-primary/20 text-primary" 
                : "text-neutral-400 hover:text-white"
            )}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs">{locale === 'es' ? 'Inicio' : 'Home'}</span>
          </Link>
          <Link
            href={`/${locale}/casinos`}
            className={cn(
              "flex flex-col items-center justify-center py-2 rounded-lg transition-colors min-h-[48px]",
              pathname.startsWith(`/${locale}/casinos`) 
                ? "bg-primary/20 text-primary" 
                : "text-neutral-400 hover:text-white"
            )}
          >
            <Gamepad2 className="w-5 h-5 mb-1" />
            <span className="text-xs">Casinos</span>
          </Link>
          <Link
            href={`/${locale}/bonos`}
            className={cn(
              "flex flex-col items-center justify-center py-2 rounded-lg transition-colors relative min-h-[48px]",
              pathname.startsWith(`/${locale}/bonos`) 
                ? "bg-primary/20 text-primary" 
                : "text-neutral-400 hover:text-white"
            )}
          >
            <Gift className="w-5 h-5 mb-1" />
            <span className="text-xs">{locale === 'es' ? 'Bonos' : 'Bonuses'}</span>
            <span className="absolute top-0 right-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </Link>
          <Link
            href={`/${locale}/guias`}
            className={cn(
              "flex flex-col items-center justify-center py-2 rounded-lg transition-colors min-h-[48px]",
              pathname.startsWith(`/${locale}/guias`) 
                ? "bg-primary/20 text-primary" 
                : "text-neutral-400 hover:text-white"
            )}
          >
            <BookOpen className="w-5 h-5 mb-1" />
            <span className="text-xs">{locale === 'es' ? 'Guías' : 'Guides'}</span>
          </Link>
        </div>
      </div>
    </>
  );
}