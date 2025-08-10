import Link from 'next/link';
import { Home, Search, Gamepad2, Gift } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-slate-700">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎰</div>
          </div>
        </div>
        
        {/* Error Message */}
        <h2 className="text-3xl font-bold text-white mb-4">
          ¡Ups! Página No Encontrada
        </h2>
        <p className="text-lg text-slate-300 mb-8">
          Parece que esta página se fue al casino y no ha vuelto. 
          Mientras tanto, te sugerimos explorar nuestras mejores opciones.
        </p>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            href="/es"
            className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-xl transition-all group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Ir al Inicio</span>
          </Link>
          
          <Link
            href="/es/casinos"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-6 py-4 rounded-xl transition-all group font-semibold"
          >
            <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Ver Casinos</span>
          </Link>
        </div>
        
        {/* Popular Pages */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Páginas Populares
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/es/bonos"
              className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Gift className="w-8 h-8" />
              <span className="text-sm">Bonos</span>
            </Link>
            <Link
              href="/es/comparar"
              className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Search className="w-8 h-8" />
              <span className="text-sm">Comparar</span>
            </Link>
            <Link
              href="/es/guias"
              className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span className="text-2xl">📚</span>
              <span className="text-sm">Guías</span>
            </Link>
            <Link
              href="/es/blog"
              className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span className="text-2xl">📰</span>
              <span className="text-sm">Blog</span>
            </Link>
          </div>
        </div>
        
        {/* Search Suggestion */}
        <div className="mt-8 text-sm text-slate-500">
          <p>
            ¿Buscabas algo específico? Prueba con el{' '}
            <Link href="/es/casinos" className="text-primary hover:text-primary/80 underline">
              buscador de casinos
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: '404 - Página No Encontrada | CasinosPesos',
  description: 'La página que buscas no existe. Explora los mejores casinos online que aceptan pesos mexicanos.',
  robots: {
    index: false,
    follow: false
  }
};