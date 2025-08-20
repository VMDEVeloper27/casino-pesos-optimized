'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, X, Download, Share2, Check, Star, Trophy, TrendingUp, Shield, Clock, CreditCard, Gift, Gamepad2, Users, ChevronDown, ChevronUp } from 'lucide-react';
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

export default function CompararClient({ allCasinos, initialCasinos, locale }: CompararClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCasinos, setSelectedCasinos] = useState<string[]>(initialCasinos);
  const [showSelector, setShowSelector] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['bonus', 'games']);
  
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

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
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
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      alert('Enlace copiado al portapapeles');
    }
  };

  const ComparisonSection = ({ 
    title, 
    icon, 
    section,
    children 
  }: { 
    title: string; 
    icon: React.ReactNode;
    section: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections.includes(section);
    
    return (
      <div className="bg-white rounded-xl overflow-hidden mb-4">
        <button
          onClick={() => toggleSection(section)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-bold text-gray-900">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comparar Casinos Online
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Analiza hasta 4 casinos lado a lado para tomar la mejor decisión
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSelector(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar Casino ({compareData.length}/4)
              </button>
              {compareData.length > 0 && (
                <button
                  onClick={() => setSelectedCasinos([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Limpiar todo
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Compartir comparación"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {compareData.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No hay casinos seleccionados</h2>
            <p className="text-gray-600 mb-6">Agrega hasta 4 casinos para comenzar la comparación</p>
            <button
              onClick={() => setShowSelector(true)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              Seleccionar Casinos
            </button>
          </div>
        ) : (
          <>
            {/* Casino Cards Row */}
            <div className="bg-white rounded-xl p-6 mb-6 overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-max lg:min-w-0">
                {compareData.map((casino) => (
                  <div key={casino.id} className="relative">
                    <button
                      onClick={() => handleRemoveCasino(casino.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-10 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="w-20 h-14 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 overflow-hidden">
                        {casino.logo && (casino.logo.startsWith('/') || casino.logo.startsWith('http')) ? (
                          <Image
                            src={casino.logo}
                            alt={casino.name}
                            width={80}
                            height={56}
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-gray-700">
                            {casino.name.substring(0, 3).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{casino.name}</h3>
                      <div className="flex items-center justify-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(casino.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-2xl font-bold mb-1 ${
                        casino.rating === getBestValue('rating') ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {casino.rating}/5
                      </p>
                      <Link
                        href={`/${locale}/casinos/${casino.slug}`}
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                      >
                        Ver reseña →
                      </Link>
                    </div>
                  </div>
                ))}
                
                {/* Add More Slot */}
                {compareData.length < 4 && (
                  <button
                    onClick={() => setShowSelector(true)}
                    className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all"
                  >
                    <Plus className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">Agregar Casino</span>
                  </button>
                )}
              </div>
            </div>

            {/* Comparison Sections */}
            <ComparisonSection title="Bonos de Bienvenida" icon={<Gift className="w-5 h-5 text-green-600" />} section="bonus">
              {/* Mobile Table View */}
              <div className="block md:hidden overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-3 text-xs font-medium text-gray-600">Característica</th>
                      {compareData.map((casino) => (
                        <th key={casino.id} className="text-center p-3">
                          <span className="font-bold text-gray-900 text-sm">{casino.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-xs text-gray-600">Monto del Bono</td>
                      {compareData.map((casino) => {
                        const isBest = casino.bonus.amount === getBestValue('bonus');
                        return (
                          <td key={casino.id} className="p-3 text-center">
                            <span className={`font-bold text-lg ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                              ${casino.bonus.amount.toLocaleString()}
                            </span>
                            <br />
                            <span className="text-xs text-gray-600">{casino.bonus.percentage}%</span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-xs text-gray-600">Giros Gratis</td>
                      {compareData.map((casino) => (
                        <td key={casino.id} className="p-3 text-center">
                          <span className="font-bold text-lg text-purple-600">
                            {casino.bonus.freeSpins || '-'}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-xs text-gray-600">Rollover</td>
                      {compareData.map((casino) => {
                        const isBest = casino.bonus.wageringRequirement === getBestValue('wagering');
                        return (
                          <td key={casino.id} className="p-3 text-center">
                            <span className={`font-bold text-lg ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                              {casino.bonus.wageringRequirement}x
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 text-xs text-gray-600">Código</td>
                      {compareData.map((casino) => (
                        <td key={casino.id} className="p-3 text-center">
                          {casino.bonus.code ? (
                            <div className="flex items-center justify-center gap-1">
                              <span className="font-mono text-xs font-bold text-blue-600">
                                {casino.bonus.code}
                              </span>
                              <CopyButton text={casino.bonus.code} variant="icon" />
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Desktop Grid View */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-t border-gray-200">
                {compareData.map((casino) => {
                  const isBestBonus = casino.bonus.amount === getBestValue('bonus');
                  const isBestWagering = casino.bonus.wageringRequirement === getBestValue('wagering');
                  
                  return (
                    <div key={casino.id} className="space-y-3">
                      {/* Casino Name Header */}
                      <div className="text-center pb-2 border-b border-gray-200">
                        <h4 className="font-bold text-gray-900">{casino.name}</h4>
                      </div>
                      
                      <div className={`p-3 rounded-lg ${isBestBonus ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                        <p className="text-xs text-gray-600 mb-1">Monto del Bono</p>
                        <p className={`text-xl font-bold ${isBestBonus ? 'text-green-600' : 'text-gray-900'}`}>
                          ${casino.bonus.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">{casino.bonus.percentage}% match</p>
                      </div>
                      
                      {casino.bonus.freeSpins && (
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Giros Gratis</p>
                          <p className="text-xl font-bold text-purple-600">
                            {casino.bonus.freeSpins}
                          </p>
                        </div>
                      )}
                      
                      <div className={`p-3 rounded-lg ${isBestWagering ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                        <p className="text-xs text-gray-600 mb-1">Rollover</p>
                        <p className={`text-xl font-bold ${isBestWagering ? 'text-green-600' : 'text-gray-900'}`}>
                          {casino.bonus.wageringRequirement}x
                        </p>
                      </div>
                      
                      {casino.bonus.code && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Código</p>
                          <div className="flex items-center gap-2">
                            <p className="font-mono font-bold text-blue-600">{casino.bonus.code}</p>
                            <CopyButton text={casino.bonus.code} variant="icon" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ComparisonSection>

            <ComparisonSection title="Juegos Disponibles" icon={<Gamepad2 className="w-5 h-5 text-green-600" />} section="games">
              {/* Mobile Table View */}
              <div className="block md:hidden overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-3 text-xs font-medium text-gray-600">Tipo</th>
                      {compareData.map((casino) => (
                        <th key={casino.id} className="text-center p-3">
                          <span className="font-bold text-gray-900 text-sm">{casino.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-xs text-gray-600">Total</td>
                      {compareData.map((casino) => {
                        const isBest = casino.games.total === getBestValue('games');
                        return (
                          <td key={casino.id} className="p-3 text-center">
                            <span className={`font-bold text-lg ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                              {casino.games.total}+
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-xs text-gray-600">Slots</td>
                      {compareData.map((casino) => (
                        <td key={casino.id} className="p-3 text-center">
                          <span className="font-semibold text-gray-900">{casino.games.slots}</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-xs text-gray-600">En Vivo</td>
                      {compareData.map((casino) => (
                        <td key={casino.id} className="p-3 text-center">
                          <span className="font-semibold text-gray-900">{casino.games.live}</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-xs text-gray-600">Mesa</td>
                      {compareData.map((casino) => (
                        <td key={casino.id} className="p-3 text-center">
                          <span className="font-semibold text-gray-900">{casino.games.table}</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Desktop Grid View */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-t border-gray-200">
                {compareData.map((casino) => {
                  const isBestTotal = casino.games.total === getBestValue('games');
                  
                  return (
                    <div key={casino.id} className="space-y-2">
                      {/* Casino Name Header */}
                      <div className="text-center pb-2 border-b border-gray-200">
                        <h4 className="font-bold text-gray-900">{casino.name}</h4>
                      </div>
                      <div className={`p-3 rounded-lg ${isBestTotal ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                        <p className="text-xs text-gray-600 mb-1">Total de Juegos</p>
                        <p className={`text-2xl font-bold ${isBestTotal ? 'text-green-600' : 'text-gray-900'}`}>
                          {casino.games.total}+
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-lg font-bold text-gray-900">{casino.games.slots}</p>
                          <p className="text-xs text-gray-600">Slots</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-lg font-bold text-gray-900">{casino.games.live}</p>
                          <p className="text-xs text-gray-600">Live</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-lg font-bold text-gray-900">{casino.games.table}</p>
                          <p className="text-xs text-gray-600">Mesa</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ComparisonSection>

            <ComparisonSection title="Pagos y Retiros" icon={<CreditCard className="w-5 h-5 text-green-600" />} section="payments">
              {/* Mobile Table View */}
              <div className="block md:hidden overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-3 text-xs font-medium text-gray-600">Característica</th>
                      {compareData.map((casino) => (
                        <th key={casino.id} className="text-center p-3">
                          <span className="font-bold text-gray-900 text-sm">{casino.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-xs text-gray-600">Dep. Mínimo</td>
                      {compareData.map((casino) => (
                        <td key={casino.id} className="p-3 text-center">
                          <span className="font-bold text-gray-900">${casino.bonus.minDeposit}</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-xs text-gray-600">Retiro</td>
                      {compareData.map((casino) => (
                        <td key={casino.id} className="p-3 text-center">
                          <span className="font-semibold text-gray-900 text-sm">{casino.withdrawalTime}</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-xs text-gray-600">Métodos</td>
                      {compareData.map((casino) => (
                        <td key={casino.id} className="p-3 text-center">
                          <span className="text-xs text-gray-700">{casino.paymentMethods.length} disponibles</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Desktop Grid View */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-t border-gray-200">
                {compareData.map((casino) => (
                  <div key={casino.id} className="space-y-3">
                    {/* Casino Name Header */}
                    <div className="text-center pb-2 border-b border-gray-200">
                      <h4 className="font-bold text-gray-900">{casino.name}</h4>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Depósito Mínimo</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${casino.bonus.minDeposit}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Tiempo de Retiro</p>
                      <p className="text-sm font-bold text-gray-900">
                        {casino.withdrawalTime}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2">Métodos de Pago</p>
                      <div className="flex flex-wrap gap-1">
                        {casino.paymentMethods.slice(0, 5).map(method => (
                          <span key={method} className="text-xs bg-white px-2 py-1 rounded border border-gray-200">
                            {method}
                          </span>
                        ))}
                        {casino.paymentMethods.length > 5 && (
                          <span className="text-xs text-gray-500">
                            +{casino.paymentMethods.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ComparisonSection>

            <ComparisonSection title="Licencias y Seguridad" icon={<Shield className="w-5 h-5 text-green-600" />} section="licenses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-t border-gray-200">
                {compareData.map((casino) => (
                  <div key={casino.id} className="space-y-3">
                    {/* Casino Name Header */}
                    <div className="text-center pb-2 border-b border-gray-200">
                      <h4 className="font-bold text-gray-900">{casino.name}</h4>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2">Licencias</p>
                      {casino.licenses.map((license, idx) => (
                        <p key={idx} className="text-xs text-gray-700 mb-1">
                          • {license}
                        </p>
                      ))}
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Establecido</p>
                      <p className="text-lg font-bold text-gray-900">
                        {casino.established}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ComparisonSection>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-4">Jugar Ahora</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {compareData.map((casino) => (
                  <a
                    key={casino.id}
                    href={casino.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Ir a {casino.name}
                  </a>
                ))}
              </div>
            </div>
          </>
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