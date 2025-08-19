'use client';

import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  DollarSign,
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [locale, setLocale] = useState('es');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    params.then(p => setLocale(p.locale));
  }, [params]);

  // Check if user is admin (temporarily disabled for development)
  // useEffect(() => {
  //   if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'editor') {
  //     redirect(`/${locale}/dashboard`);
  //   }
  // }, [session, status, locale]);

  // if (status === 'loading') {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
  //     </div>
  //   );
  // }

  // if (status === 'unauthenticated') {
  //   redirect(`/${locale}/auth/signin`);
  // }

  const menuItems = [
    {
      href: `/${locale}/admin`,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/admin/blog`,
      label: 'Blog Posts',
      icon: FileText,
    },
    {
      href: `/${locale}/admin/subscribers`,
      label: 'Suscriptores',
      icon: Users,
    },
    {
      href: `/${locale}/admin/casinos`,
      label: 'Casinos',
      icon: DollarSign,
    },
    {
      href: `/${locale}/admin/settings`,
      label: 'Configuración',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
                           (item.href !== `/${locale}/admin` && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center gap-3 mb-3 px-4">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              {session?.user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}` })}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Panel de Administración
            </h1>
            <Link
              href={`/${locale}`}
              className="text-sm text-green-600 hover:text-green-700"
            >
              Ver Sitio →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}