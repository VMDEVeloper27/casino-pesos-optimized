'use client';

import { ChevronRight, Gift, Shield, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
// import { useTranslations } from 'next-intl';

export function Hero() {
  // const t = useTranslations('homepage.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Gradient Orbs - Static for better performance */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12 sm:py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fadeIn">
            <Trophy className="w-4 h-4" />
            #1 en Casinos con Pesos
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeIn hero-title">
            Los Mejores{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Casinos Online
            </span>
            <br />
            que Aceptan Pesos
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 animate-fadeIn hero-subtitle">
            Encuentra casinos confiables con bonos exclusivos en MXN, ARS y COP.
            <br />
            Compara, elige y gana con total seguridad.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fadeIn hero-buttons">
            <Link
              href="/es/casinos"
              className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
            >
              Ver Top 10 Casinos
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/es/bonos"
              className="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              🎁 Bonos Exclusivos
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-3 sm:p-4">
              <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-lg font-bold text-white">100%</div>
              <div className="text-sm text-slate-400">Seguros y Licenciados</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-3 sm:p-4">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-white">24-48h</div>
              <div className="text-sm text-slate-400">Retiros Rápidos</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-3 sm:p-4">
              <Gift className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-lg font-bold text-white">$50,000</div>
              <div className="text-sm text-slate-400">en Bonos</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-3 sm:p-4">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-white">50+</div>
              <div className="text-sm text-slate-400">Casinos Verificados</div>
            </div>
          </div>

          {/* Static Casino Elements - Removed animations for better performance */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 text-6xl opacity-20">🎰</div>
            <div className="absolute bottom-10 right-10 text-6xl opacity-20">🎲</div>
            <div className="absolute top-1/2 right-20 text-6xl opacity-20">🃏</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}