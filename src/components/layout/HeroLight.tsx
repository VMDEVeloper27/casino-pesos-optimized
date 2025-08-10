'use client';

import { ChevronRight, Gift, Shield, Trophy, Zap, Search, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb1a_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb1a_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <Trophy className="w-4 h-4" />
              #1 Comparador de Casinos en México
              <div className="flex items-center gap-1 ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
          >
            <span className="text-gray-900">Encuentra el</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
              Casino Perfecto
            </span>
            <br />
            <span className="text-gray-900">para Ti</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 text-center mb-10 max-w-3xl mx-auto"
          >
            Compara bonos exclusivos, métodos de pago locales y 
            encuentra casinos seguros con licencia. Tu guía confiable 
            para ganar en pesos mexicanos.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar casinos, bonos, juegos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
                Buscar
              </button>
            </div>
            
            {/* Quick search tags */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <span className="text-xs text-gray-500">Búsquedas populares:</span>
              {['Bet365', 'Bonos sin depósito', 'PayPal', 'Tragamonedas', 'Blackjack'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/es/casinos"
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Ver Top 10 Casinos
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/es/bonos"
              className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-200 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Gift className="w-5 h-5 text-red-500" />
              Bonos Exclusivos
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Seguros y Licenciados</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24h</div>
              <div className="text-sm text-gray-600">Retiros Rápidos</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <Gift className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">$50K</div>
              <div className="text-sm text-gray-600">en Bonos MXN</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <Trophy className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Casinos Verificados</div>
            </div>
          </motion.div>

          {/* Security badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4" />
              SSL Seguro
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              Datos Protegidos
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              ✓ GDPR Compliant
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              18+ Juego Responsable
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}