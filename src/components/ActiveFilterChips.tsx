'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FilterState } from './CasinoFilters';

interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemoveFilter: (filterType: keyof FilterState, value?: string) => void;
  onClearAll: () => void;
}

const filterLabels: Record<string, string> = {
  // Payment Methods
  'OXXO': 'OXXO',
  'PayPal': 'PayPal',
  'SPEI': 'SPEI',
  'Visa': 'Visa',
  'Mastercard': 'Mastercard',
  'Bitcoin': 'Bitcoin',
  'Skrill': 'Skrill',
  'Neteller': 'Neteller',
  
  // Deposit Ranges
  '0-100': 'Depósito: $0-100',
  '100-200': 'Depósito: $100-200',
  '200-500': 'Depósito: $200-500',
  '500+': 'Depósito: $500+',
  
  // Game Types
  'slots': 'Tragamonedas',
  'live': 'Casino en Vivo',
  'table': 'Juegos de Mesa',
  'sports': 'Deportes',
  'poker': 'Póker',
  
  // Withdrawal Times
  'instant': 'Retiro: Instantáneo',
  '24h': 'Retiro: 24 horas',
  '48h': 'Retiro: 48 horas',
  '72h': 'Retiro: 72 horas',
  
  // License Types
  'segob': 'Solo SEGOB',
};

export default function ActiveFilterChips({
  filters,
  onRemoveFilter,
  onClearAll
}: ActiveFilterChipsProps) {
  const activeFilters: { type: keyof FilterState; value: string }[] = [];
  
  // Collect all active filters
  filters.paymentMethods.forEach(method => {
    activeFilters.push({ type: 'paymentMethods', value: method });
  });
  
  if (filters.minDeposit && filters.minDeposit !== '') {
    activeFilters.push({ type: 'minDeposit', value: filters.minDeposit });
  }
  
  filters.gameTypes.forEach(game => {
    activeFilters.push({ type: 'gameTypes', value: game });
  });
  
  if (filters.withdrawalTime && filters.withdrawalTime !== '') {
    activeFilters.push({ type: 'withdrawalTime', value: filters.withdrawalTime });
  }
  
  if (filters.licenseType && filters.licenseType !== 'all') {
    activeFilters.push({ type: 'licenseType', value: filters.licenseType });
  }
  
  if (activeFilters.length === 0) return null;
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Filtros activos:</span>
        
        <AnimatePresence>
          {activeFilters.map((filter, index) => (
            <motion.div
              key={`${filter.type}-${filter.value}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="inline-flex"
            >
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
                {filterLabels[filter.value] || filter.value}
                <button
                  onClick={() => onRemoveFilter(filter.type, filter.value)}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5 transition-colors"
                  aria-label={`Quitar filtro ${filterLabels[filter.value] || filter.value}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <button
          onClick={onClearAll}
          className="ml-2 text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 transition-colors"
        >
          <X className="w-4 h-4" />
          Limpiar todos
        </button>
      </div>
    </div>
  );
}