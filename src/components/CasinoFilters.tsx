'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X, DollarSign, CreditCard, Gamepad2, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterState {
  paymentMethods: string[];
  minDeposit: string;
  gameTypes: string[];
  withdrawalTime: string;
  licenseType: string;
}

interface CasinoFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
  isMobile?: boolean;
}

const paymentOptions = [
  { value: 'OXXO', label: 'OXXO', icon: '🏪' },
  { value: 'PayPal', label: 'PayPal', icon: '💳' },
  { value: 'SPEI', label: 'SPEI', icon: '🏦' },
  { value: 'Visa', label: 'Visa', icon: '💳' },
  { value: 'Mastercard', label: 'Mastercard', icon: '💳' },
  { value: 'Bitcoin', label: 'Bitcoin', icon: '₿' },
  { value: 'Skrill', label: 'Skrill', icon: '💰' },
  { value: 'Neteller', label: 'Neteller', icon: '💰' },
];

const depositRanges = [
  { value: '0-100', label: '$0 - $100 MXN' },
  { value: '100-200', label: '$100 - $200 MXN' },
  { value: '200-500', label: '$200 - $500 MXN' },
  { value: '500+', label: '$500+ MXN' },
];

const gameTypeOptions = [
  { value: 'slots', label: 'Tragamonedas', icon: '🎰' },
  { value: 'live', label: 'Casino en Vivo', icon: '🎲' },
  { value: 'table', label: 'Juegos de Mesa', icon: '♠️' },
  { value: 'sports', label: 'Deportes', icon: '⚽' },
  { value: 'poker', label: 'Póker', icon: '🃏' },
];

const withdrawalOptions = [
  { value: 'instant', label: 'Instantáneo' },
  { value: '24h', label: '24 horas' },
  { value: '48h', label: '48 horas' },
  { value: '72h', label: '72 horas' },
];

const licenseOptions = [
  { value: 'all', label: 'Todas las licencias' },
  { value: 'segob', label: 'Solo SEGOB México' },
];

export default function CasinoFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  activeFilterCount,
  isMobile = false
}: CasinoFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['payment', 'deposit']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handlePaymentToggle = (payment: string) => {
    const newPayments = filters.paymentMethods.includes(payment)
      ? filters.paymentMethods.filter(p => p !== payment)
      : [...filters.paymentMethods, payment];
    onFiltersChange({ ...filters, paymentMethods: newPayments });
  };

  const handleGameTypeToggle = (gameType: string) => {
    const newGameTypes = filters.gameTypes.includes(gameType)
      ? filters.gameTypes.filter(g => g !== gameType)
      : [...filters.gameTypes, gameType];
    onFiltersChange({ ...filters, gameTypes: newGameTypes });
  };

  const FilterSection = ({ 
    title, 
    section, 
    icon,
    children 
  }: { 
    title: string; 
    section: string; 
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections.includes(section);
    
    return (
      <div className="border-b border-gray-200 last:border-0">
        <button
          onClick={() => toggleSection(section)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium text-gray-900">{title}</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${isMobile ? 'w-full' : ''}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-green-700" />
            <h3 className="font-bold text-gray-900">Filtros</h3>
            {activeFilterCount > 0 && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <FilterSection 
        title="Métodos de Pago" 
        section="payment"
        icon={<CreditCard className="w-4 h-4 text-gray-500" />}
      >
        <div className="space-y-2">
          {paymentOptions.map(option => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.paymentMethods.includes(option.value)}
                onChange={() => handlePaymentToggle(option.value)}
                className="w-4 h-4 text-green-700 rounded border-gray-300 focus:ring-green-500"
              />
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Minimum Deposit */}
      <FilterSection 
        title="Depósito Mínimo" 
        section="deposit"
        icon={<DollarSign className="w-4 h-4 text-gray-500" />}
      >
        <div className="space-y-2">
          {depositRanges.map(option => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="radio"
                name="minDeposit"
                value={option.value}
                checked={filters.minDeposit === option.value}
                onChange={(e) => onFiltersChange({ ...filters, minDeposit: e.target.value })}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Game Types */}
      <FilterSection 
        title="Tipos de Juegos" 
        section="games"
        icon={<Gamepad2 className="w-4 h-4 text-gray-500" />}
      >
        <div className="space-y-2">
          {gameTypeOptions.map(option => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.gameTypes.includes(option.value)}
                onChange={() => handleGameTypeToggle(option.value)}
                className="w-4 h-4 text-green-700 rounded border-gray-300 focus:ring-green-500"
              />
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Withdrawal Time */}
      <FilterSection 
        title="Tiempo de Retiro" 
        section="withdrawal"
        icon={<Clock className="w-4 h-4 text-gray-500" />}
      >
        <div className="space-y-2">
          {withdrawalOptions.map(option => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="radio"
                name="withdrawalTime"
                value={option.value}
                checked={filters.withdrawalTime === option.value}
                onChange={(e) => onFiltersChange({ ...filters, withdrawalTime: e.target.value })}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* License Type */}
      <FilterSection 
        title="Tipo de Licencia" 
        section="license"
        icon={<Shield className="w-4 h-4 text-gray-500" />}
      >
        <div className="space-y-2">
          {licenseOptions.map(option => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="radio"
                name="licenseType"
                value={option.value}
                checked={filters.licenseType === option.value}
                onChange={(e) => onFiltersChange({ ...filters, licenseType: e.target.value })}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}