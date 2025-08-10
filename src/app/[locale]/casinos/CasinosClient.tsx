'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, Star, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Casino } from '@/lib/casino-database';

interface CasinosClientProps {
  casinos: Casino[];
}

export default function CasinosClient({ casinos }: CasinosClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and sorting
  const filteredCasinos = casinos
    .filter(casino => {
      // Search filter
      if (searchQuery && !casino.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'bonus':
          return b.bonus.amount - a.bonus.amount;
        case 'newest':
          return b.established - a.established;
        case 'games':
          return b.games.total - a.games.total;
        default:
          return 0;
      }
    });

  return (
    <main className="min-h-screen bg-neutral-900 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Todos los Casinos Online
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            {filteredCasinos.length} casinos disponibles para jugadores mexicanos.
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="bg-neutral-800 rounded-xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar casino..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="rating">Mayor Calificación</option>
                <option value="bonus">Mayor Bono</option>
                <option value="newest">Más Recientes</option>
                <option value="games">Más Juegos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Casino Grid */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-neutral-400">
              Mostrando <span className="text-white font-bold">{filteredCasinos.length}</span> de {casinos.length} casinos
            </p>
          </div>

          {/* Casino Cards */}
          <div className="grid gap-6">
            <AnimatePresence>
              {filteredCasinos.map((casino, index) => (
                <motion.article
                  key={casino.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-neutral-800 rounded-xl p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="grid lg:grid-cols-[200px,1fr,300px] gap-6">
                    {/* Casino Info */}
                    <div className="text-center lg:text-left">
                      <div className="w-24 h-16 bg-neutral-700 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-3 relative overflow-hidden">
                        {casino.logo && casino.logo.startsWith('/') ? (
                          <Image
                            src={casino.logo}
                            alt={`${casino.name} logo`}
                            width={96}
                            height={64}
                            className="object-contain"
                            priority={index < 3}
                          />
                        ) : (
                          <span className="text-2xl font-bold text-white">
                            {casino.logo || casino.name.substring(0, 3).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2">{casino.name}</h2>
                      <div className="flex items-center justify-center lg:justify-start gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(casino.rating)
                                ? 'fill-primary text-primary'
                                : 'text-neutral-600'
                            }`}
                          />
                        ))}
                        <span className="text-white font-semibold ml-1">{casino.rating}</span>
                      </div>
                      <p className="text-xs text-neutral-400">Est. {casino.established}</p>
                    </div>

                    {/* Details */}
                    <div>
                      <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-4 mb-4 border border-primary/30">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-neutral-400 mb-1">Bono de Bienvenida</p>
                            <p className="text-2xl font-bold text-white">
                              {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()} MXN
                            </p>
                            {casino.bonus.freeSpins && (
                              <p className="text-sm text-accent mt-1">+ {casino.bonus.freeSpins} Giros Gratis</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-neutral-400">Rollover</p>
                            <p className="text-lg font-bold text-white">{casino.bonus.wageringRequirement}x</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-neutral-400">Juegos</p>
                          <p className="text-white font-semibold">{casino.games.total}+</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-400">Retiros</p>
                          <p className="text-white font-semibold">{casino.withdrawalTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-400">Dep. Mínimo</p>
                          <p className="text-white font-semibold">${casino.bonus.minDeposit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-400">Live Casino</p>
                          <p className="text-white font-semibold">{casino.games.live} juegos</p>
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {casino.paymentMethods.slice(0, 5).map(method => (
                          <span key={method} className="bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full text-xs">
                            {method}
                          </span>
                        ))}
                        {casino.paymentMethods.length > 5 && (
                          <span className="text-neutral-400 text-xs">
                            +{casino.paymentMethods.length - 5} más
                          </span>
                        )}
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {casino.features.slice(0, 4).map(feature => (
                          <span key={feature} className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      <a 
                        href={casino.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 text-center"
                      >
                        Jugar Ahora
                      </a>
                      <Link 
                        href={`/es/casinos/${casino.slug}`}
                        className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-xl font-semibold text-center transition-colors"
                      >
                        Ver Reseña Completa
                      </Link>
                      
                      {/* Pros & Cons Summary */}
                      <div className="space-y-2 text-xs">
                        <div>
                          <p className="text-green-400 font-semibold mb-1">Ventajas</p>
                          {casino.pros.slice(0, 2).map(pro => (
                            <p key={pro} className="text-neutral-400">• {pro}</p>
                          ))}
                        </div>
                        <div>
                          <p className="text-red-400 font-semibold mb-1">Desventajas</p>
                          {casino.cons.slice(0, 1).map(con => (
                            <p key={con} className="text-neutral-400">• {con}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {filteredCasinos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-neutral-400 mb-4">No se encontraron casinos</p>
              <p className="text-neutral-500 mb-6">Intenta ajustar tu búsqueda</p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-primary text-black px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
              >
                Limpiar Búsqueda
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}