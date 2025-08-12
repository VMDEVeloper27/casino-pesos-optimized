'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, X, Share2, Check, Star, Trophy, Shield, Clock, CreditCard, Gift, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Casino } from '@/lib/casino-database';
import CasinoSelector from '@/components/CasinoSelector';
import CopyButton from '@/components/CopyButton';

interface CompararClientProps {
  allCasinos: Casino[];
  initialCasinos: string[];
  locale: string;
}

export default function CompararClientCompact({ allCasinos, initialCasinos, locale }: CompararClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCasinos, setSelectedCasinos] = useState<string[]>(initialCasinos);
  const [showSelector, setShowSelector] = useState(false);
  
  // Get casino data for selected IDs
  const compareData = selectedCasinos
    .map(id => allCasinos.find(c => c.id === id))
    .filter(Boolean) as Casino[];

  // Update URL when selection changes
  useEffect(() => {
    if (selectedCasinos.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('casinos', selectedCasinos.join(','));
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [selectedCasinos, router, searchParams]);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('compareSelection', JSON.stringify(selectedCasinos));
    }
  }, [selectedCasinos]);

  const handleCasinoToggle = (casinoId: string) => {
    setSelectedCasinos(prev => {
      if (prev.includes(casinoId)) {
        return prev.filter(id => id !== casinoId);
      }
      if (prev.length < 4) {
        return [...prev, casinoId];
      }
      return prev;
    });
  };

  const handleRemoveCasino = (casinoId: string) => {
    setSelectedCasinos(prev => prev.filter(id => id !== casinoId));
  };

  // Find best values for highlighting
  const getBestValue = (key: string) => {
    switch (key) {
      case 'rating':
        return Math.max(...compareData.map(c => c.rating));
      case 'bonus':
        return Math.max(...compareData.map(c => c.bonus.amount));
      case 'games':
        return Math.max(...compareData.map(c => c.games.total));
      case 'wagering':
        return Math.min(...compareData.map(c => c.bonus.wageringRequirement));
      case 'minDeposit':
        return Math.min(...compareData.map(c => c.bonus.minDeposit));
      default:
        return null;
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Comparación de Casinos - CasinosPesos',
          text: `Compara ${compareData.map(c => c.name).join(', ')}`,
          url
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-4 pb-16">
      <div className="container mx-auto px-4">
        {/* Compact Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Comparar Casinos
          </h1>
          <p className="text-sm text-gray-600">
            Analiza hasta 4 casinos lado a lado
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg p-3 mb-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setShowSelector(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar ({compareData.length}/4)
            </button>
            <div className="flex items-center gap-2">
              {compareData.length > 0 && (
                <button
                  onClick={() => setSelectedCasinos([])}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Limpiar
                </button>
              )}
              <button
                onClick={handleShare}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Compartir"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {compareData.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No hay casinos seleccionados</h2>
            <p className="text-sm text-gray-600 mb-4">Agrega hasta 4 casinos para comparar</p>
            <button
              onClick={() => setShowSelector(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl"
            >
              Seleccionar Casinos
            </button>
          </div>
        ) : (
          /* Compact Comparison Table */
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                {/* Casino Headers with Remove Buttons */}
                <thead>
                  <tr className="bg-gray-50">
                    <th className="sticky left-0 bg-gray-50 p-2 text-left text-xs font-medium text-gray-600 w-32 border-r border-b-2 border-gray-200">
                      
                    </th>
                    {compareData.map((casino, idx) => (
                      <th key={casino.id} className={`relative p-3 text-center min-w-[140px] border-b-2 border-gray-200 ${idx < compareData.length - 1 ? 'border-r' : ''}`}>
                        <button
                          onClick={() => handleRemoveCasino(casino.id)}
                          className="absolute top-1 right-1 w-5 h-5 bg-gray-300 hover:bg-red-500 text-white rounded-full flex items-center justify-center z-10 transition-all"
                          title="Quitar"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="flex flex-col items-center pt-2">
                          <div className="w-16 h-10 bg-white rounded border border-gray-200 mb-1 flex items-center justify-center overflow-hidden">
                            {casino.logo && casino.logo.startsWith('/') ? (
                              <Image
                                src={casino.logo}
                                alt={casino.name}
                                width={60}
                                height={36}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-sm font-bold text-gray-700">
                                {casino.name.substring(0, 3).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-gray-900 text-sm leading-tight">
                            {casino.name.replace(' Casino', '').replace('Casino ', '')}
                          </p>
                        </div>
                      </th>
                    ))}
                    {compareData.length < 4 && (
                      <th className="p-2 text-center min-w-[140px] border-b-2 border-gray-200">
                        <button
                          onClick={() => setShowSelector(true)}
                          className="w-full h-full flex flex-col items-center justify-center py-3 hover:bg-gray-50 transition-colors rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
                        >
                          <Plus className="w-5 h-5 text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500 font-medium">Agregar</span>
                        </button>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* Rating */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Calificación
                      </div>
                    </td>
                    {compareData.map((casino) => {
                      const isBest = casino.rating === getBestValue('rating');
                      return (
                        <td key={casino.id} className="p-2 text-center border-r border-gray-100">
                          <div className={`font-bold text-lg ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                            {casino.rating}
                          </div>
                          <div className="flex justify-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(casino.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Bonus Amount */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      <div className="flex items-center gap-1">
                        <Gift className="w-3 h-3" />
                        Bono
                      </div>
                    </td>
                    {compareData.map((casino) => {
                      const isBest = casino.bonus.amount === getBestValue('bonus');
                      return (
                        <td key={casino.id} className="p-2 text-center border-r border-gray-100">
                          <div className={`font-bold text-sm ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                            ${casino.bonus.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">{casino.bonus.percentage}%</div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Free Spins */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      Giros Gratis
                    </td>
                    {compareData.map((casino) => (
                      <td key={casino.id} className="p-2 text-center">
                        <span className="font-bold text-sm text-purple-600">
                          {casino.bonus.freeSpins || '-'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Wagering */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      Rollover
                    </td>
                    {compareData.map((casino) => {
                      const isBest = casino.bonus.wageringRequirement === getBestValue('wagering');
                      return (
                        <td key={casino.id} className="p-2 text-center border-r border-gray-100">
                          <span className={`font-bold text-sm ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                            {casino.bonus.wageringRequirement}x
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Bonus Code */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      Código
                    </td>
                    {compareData.map((casino) => (
                      <td key={casino.id} className="p-2 text-center">
                        {casino.bonus.code ? (
                          <div className="flex items-center justify-center gap-1">
                            <span className="font-mono text-xs font-bold text-blue-600">
                              {casino.bonus.code}
                            </span>
                            <CopyButton text={casino.bonus.code} variant="icon" />
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Min Deposit */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      Dep. Mínimo
                    </td>
                    {compareData.map((casino) => {
                      const isBest = casino.bonus.minDeposit === getBestValue('minDeposit');
                      return (
                        <td key={casino.id} className="p-2 text-center border-r border-gray-100">
                          <span className={`font-semibold text-sm ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                            ${casino.bonus.minDeposit}
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Withdrawal Time */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Retiros
                      </div>
                    </td>
                    {compareData.map((casino) => (
                      <td key={casino.id} className="p-2 text-center">
                        <span className="text-xs text-gray-700">{casino.withdrawalTime}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Total Games */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      <div className="flex items-center gap-1">
                        <Gamepad2 className="w-3 h-3" />
                        Total Juegos
                      </div>
                    </td>
                    {compareData.map((casino) => {
                      const isBest = casino.games.total === getBestValue('games');
                      return (
                        <td key={casino.id} className="p-2 text-center border-r border-gray-100">
                          <span className={`font-bold text-sm ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                            {casino.games.total}+
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Game Types */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      Slots/Live/Mesa
                    </td>
                    {compareData.map((casino) => (
                      <td key={casino.id} className="p-2 text-center">
                        <span className="text-xs text-gray-700">
                          {casino.games.slots}/{casino.games.live}/{casino.games.table}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Payment Methods */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      <div className="flex items-center gap-1">
                        <CreditCard className="w-3 h-3" />
                        Métodos
                      </div>
                    </td>
                    {compareData.map((casino) => (
                      <td key={casino.id} className="p-2 text-center">
                        <span className="text-xs text-gray-700">
                          {casino.paymentMethods.length} métodos
                        </span>
                        <div className="text-xs text-gray-500">
                          {casino.paymentMethods.includes('OXXO') && '✓ OXXO'}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* License */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Licencia
                      </div>
                    </td>
                    {compareData.map((casino) => (
                      <td key={casino.id} className="p-2 text-center">
                        <span className="text-xs text-gray-700">
                          {casino.licenses.some(l => l.includes('SEGOB')) ? '✓ SEGOB' : casino.licenses[0]?.split(' ')[0]}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Established */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="sticky left-0 bg-white p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      Establecido
                    </td>
                    {compareData.map((casino) => (
                      <td key={casino.id} className="p-2 text-center">
                        <span className="text-xs text-gray-700">{casino.established}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Action Buttons */}
                  <tr className="bg-gray-50">
                    <td className="sticky left-0 bg-gray-50 p-2 text-xs font-medium text-gray-600 border-r border-gray-100">
                      Acciones
                    </td>
                    {compareData.map((casino) => (
                      <td key={casino.id} className="p-2 text-center">
                        <div className="space-y-1">
                          <a
                            href={casino.affiliateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Jugar
                          </a>
                          <Link
                            href={`/${locale}/casinos/${casino.slug}`}
                            className="block w-full text-gray-600 hover:text-gray-800 text-xs transition-colors text-center"
                          >
                            Ver más →
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Casino Selector Modal */}
        <CasinoSelector
          isOpen={showSelector}
          onClose={() => setShowSelector(false)}
          casinos={allCasinos}
          selectedCasinos={selectedCasinos}
          onCasinoToggle={handleCasinoToggle}
          maxSelection={4}
        />
      </div>
    </main>
  );
}