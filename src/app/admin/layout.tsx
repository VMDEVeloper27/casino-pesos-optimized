import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Gift, 
  FileText, 
  Settings,
  LogOut,
  Plus,
  Shield,
  Image,
  BookOpen
} from 'lucide-react';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'CasinosPesos Admin',
  description: 'Admin Panel for CasinosPesos',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple auth check (in production, use proper authentication)
  const isAuthenticated = true; // You can check cookies or session here
  
  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-neutral-900">
        <div className="min-h-screen bg-neutral-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-800 border-r border-neutral-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8">
            Admin Panel
          </h1>
          
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            
            <div className="pt-4 pb-2">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4">
                Manage
              </h3>
            </div>
            
            <Link
              href="/admin/casinos"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Casinos</span>
            </Link>
            
            <Link
              href="/admin/casinos/new"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Casino</span>
            </Link>
            
            <Link
              href="/admin/bonuses"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <Gift className="w-5 h-5" />
              <span>Bonuses</span>
            </Link>
            
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>Blog</span>
            </Link>
            
            <Link
              href="/admin/content"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span>Content</span>
            </Link>
            
            <Link
              href="/admin/media"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <Image className="w-5 h-5" />
              <span>Media Library</span>
            </Link>
            
            <div className="pt-4 pb-2">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4">
                System
              </h3>
            </div>
            
            <Link
              href="/admin/audit-log"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <Shield className="w-5 h-5" />
              <span>Audit Log</span>
            </Link>
            
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}