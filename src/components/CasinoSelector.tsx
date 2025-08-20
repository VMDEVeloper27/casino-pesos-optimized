'use client';

import { useState } from 'react';
import { X, Search, Plus, Check, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { Casino } from '@/lib/casino-database';

interface CasinoSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  casinos: Casino[];
  selectedCasinos: string[];
  onCasinoToggle: (casinoId: string) => void;
  maxSelection?: number;
}

export default function CasinoSelector({
  isOpen,
  onClose,
  casinos,
  selectedCasinos,
  onCasinoToggle,
  maxSelection = 4
}: CasinoSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'selected'>('all');

  const filteredCasinos = casinos.filter(casino => {
    const matchesSearch = casino.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || selectedCasinos.includes(casino.id);
    return matchesSearch && matchesFilter;
  });

  const canAddMore = selectedCasinos.length < maxSelection;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[min(90vw,800px)] max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Seleccionar Casinos</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedCasinos.length} de {maxSelection} casinos seleccionados
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar casino..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterBy('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterBy === 'all'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFilterBy('selected')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterBy === 'selected'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Seleccionados ({selectedCasinos.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Casino List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-3">
                {filteredCasinos.map((casino) => {
                  const isSelected = selectedCasinos.includes(casino.id);
                  const canSelect = isSelected || canAddMore;

                  return (
                    <motion.button
                      key={casino.id}
                      onClick={() => canSelect && onCasinoToggle(casino.id)}
                      disabled={!canSelect}
                      whileHover={canSelect ? { scale: 1.01 } : {}}
                      whileTap={canSelect ? { scale: 0.99 } : {}}
                      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-green-500 bg-green-50'
                          : canSelect
                          ? 'border-gray-200 bg-white hover:border-green-300 hover:bg-gray-50'
                          : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {/* Top Row - Mobile and Desktop */}
                      <div className="flex items-center gap-3 w-full">
                        {/* Checkbox */}
                        <div
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                            isSelected
                              ? 'bg-green-500 border-green-500'
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>

                        {/* Casino Info */}
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-14 h-10 sm:w-16 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {casino.logo && (casino.logo.startsWith('/') || casino.logo.startsWith('http')) ? (
                              <Image
                                src={casino.logo}
                                alt={casino.name}
                                width={64}
                                height={48}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-base sm:text-lg font-bold text-gray-700">
                                {casino.name.substring(0, 3).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="text-left flex-1">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">{casino.name}</p>
                            <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{casino.rating}</span>
                              </div>
                              <span>•</span>
                              <span>{casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Selection Status - Desktop only */}
                        <div className="hidden sm:block flex-shrink-0">
                          {isSelected ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              Seleccionado
                            </span>
                          ) : canSelect ? (
                            <Plus className="w-5 h-5 text-gray-400" />
                          ) : (
                            <span className="text-xs text-gray-500">Máx.</span>
                          )}
                        </div>
                      </div>

                      {/* Selection Status - Mobile only */}
                      <div className="sm:hidden w-full flex justify-end">
                        {isSelected ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Seleccionado
                          </span>
                        ) : canSelect ? (
                          <span className="text-xs text-gray-500">Toca para seleccionar</span>
                        ) : (
                          <span className="text-xs text-gray-500">Máximo alcanzado</span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}

                {filteredCasinos.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No se encontraron casinos</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {!canAddMore && (
                    <span className="text-orange-600 font-medium">
                      Has alcanzado el máximo de {maxSelection} casinos
                    </span>
                  )}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                  >
                    Comparar ({selectedCasinos.length})
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}