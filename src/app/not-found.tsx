import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        {/* Casino Chip 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-xl border-8 border-white ring-4 ring-green-200 relative">
            <div className="absolute inset-2 border-4 border-dashed border-green-200 rounded-full opacity-60"></div>
            <span className="text-white font-bold text-5xl relative z-10">404</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Página No Encontrada
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Ir al Inicio
          </Link>
          <Link
            href="/es/casinos"
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-200 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <Search className="w-5 h-5" />
            Ver Casinos
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Enlaces útiles:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/es/bonos" className="text-green-600 hover:text-green-700 font-medium text-sm">
              Mejores Bonos
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/es/juegos" className="text-green-600 hover:text-green-700 font-medium text-sm">
              Juegos de Casino
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/es/promociones" className="text-green-600 hover:text-green-700 font-medium text-sm">
              Promociones
            </Link>
          </div>
        </div>
      </div>
    </main>
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