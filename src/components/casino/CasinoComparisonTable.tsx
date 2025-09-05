'use client';

import { useMemo, useState } from 'react';
// import Image from 'next/image';
import { 
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  CreditCard,
  Filter,
  Gamepad,
  Star,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CasinoLogo } from '@/components/ui/CasinoLogo';
import { getCTAByIndex, getCTAByType } from '@/lib/cta-texts';

interface Casino {
  id: string;
  name: string;
  slug: string;
  logo: string;
  rating: number;
  established: number;
  affiliateLink: string;
  bonus: {
    type: string;
    amount: number;
    percentage: number;
    freeSpins?: number;
    minDeposit: number;
    wageringRequirement: number;
    code?: string;
  };
  games: {
    total: number;
    slots: number;
    live: number;
    table: number;
  };
  paymentMethods: string[];
  withdrawalTime: string;
  licenses: string[];
  currencies: string[];
  features: string[];
  pros: string[];
  cons: string[];
}

interface ComparisonTableProps {
  casinos: Casino[];
  locale?: string;
}

type SortField = 'rating' | 'bonus' | 'games' | 'withdrawalTime' | 'name';
type SortOrder = 'asc' | 'desc';

export function CasinoComparisonTable({ casinos, locale = 'es' }: ComparisonTableProps) {
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedCasinos, setSelectedCasinos] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    paymentMethod: '',
    currency: '',
    bonusType: '',
    hasLiveGames: false,
  });

  // Sorting logic
  const sortedCasinos = useMemo(() => {
    const filtered = casinos.filter((casino) => {
      if (filters.minRating && casino.rating < filters.minRating) { return false; }
      if (filters.paymentMethod && !casino.paymentMethods.includes(filters.paymentMethod)) { return false; }
      if (filters.currency && !casino.currencies.includes(filters.currency)) { return false; }
      if (filters.hasLiveGames && casino.games.live === 0) { return false; }
      return true;
    });

    return [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'bonus':
          aValue = a.bonus.amount;
          bValue = b.bonus.amount;
          break;
        case 'games':
          aValue = a.games.total;
          bValue = b.games.total;
          break;
        case 'withdrawalTime':
          aValue = parseInt(a.withdrawalTime);
          bValue = parseInt(b.withdrawalTime);
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [casinos, sortField, sortOrder, filters]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleCasinoSelection = (casinoId: string) => {
    setSelectedCasinos(prev => 
      prev.includes(casinoId) 
        ? prev.filter(id => id !== casinoId)
        : [...prev, casinoId].slice(0, 3) // Max 3 for comparison
    );
  };

  const clearFilters = () => {
    setFilters({
      minRating: 0,
      paymentMethod: '',
      currency: '',
      bonusType: '',
      hasLiveGames: false,
    });
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }
    return sortOrder === 'desc' ? 
      <ChevronDown className="w-4 h-4 text-primary" /> : 
      <ChevronUp className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="w-full">
      {/* Filters Bar */}
      <div className="bg-slate-900 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors"
          >
            <Filter className="w-5 h-5" />
            {locale === 'es' ? 'Filtros' : 'Filters'}
            {Object.values(filters).some(v => v) && (
              <span className="bg-primary text-black text-xs px-2 py-1 rounded-full">
                {Object.values(filters).filter(v => v).length}
              </span>
            )}
          </button>

          {selectedCasinos.length > 0 && (
            <button
              onClick={() => setSelectedCasinos([])}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {locale === 'es' ? 'Limpiar selección' : 'Clear selection'} ({selectedCasinos.length})
            </button>
          )}
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 pt-4 border-t border-slate-700">
                {/* Rating Filter */}
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">
                    {locale === 'es' ? 'Rating Mínimo' : 'Min Rating'}
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => setFilters({...filters, minRating: Number(e.target.value)})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    <option value="0">Todos</option>
                    <option value="4">4.0+</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.8">4.8+</option>
                  </select>
                </div>

                {/* Payment Method Filter */}
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">
                    {locale === 'es' ? 'Método de Pago' : 'Payment Method'}
                  </label>
                  <select
                    value={filters.paymentMethod}
                    onChange={(e) => setFilters({...filters, paymentMethod: e.target.value})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    <option value="">Todos</option>
                    <option value="PayPal">PayPal</option>
                    <option value="OXXO">OXXO</option>
                    <option value="Visa">Visa</option>
                    <option value="Bitcoin">Bitcoin</option>
                  </select>
                </div>

                {/* Currency Filter */}
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">
                    {locale === 'es' ? 'Moneda' : 'Currency'}
                  </label>
                  <select
                    value={filters.currency}
                    onChange={(e) => setFilters({...filters, currency: e.target.value})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    <option value="">Todas</option>
                    <option value="MXN">MXN</option>
                    <option value="ARS">ARS</option>
                    <option value="COP">COP</option>
                    <option value="USD">USD</option>
                  </select>
                </div>

                {/* Live Games Filter */}
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasLiveGames}
                      onChange={(e) => setFilters({...filters, hasLiveGames: e.target.checked})}
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-sm text-white">
                      {locale === 'es' ? 'Casino en Vivo' : 'Live Casino'}
                    </span>
                  </label>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    {locale === 'es' ? 'Limpiar' : 'Clear'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left p-4 text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  {locale === 'es' ? 'Comparar' : 'Compare'}
                </div>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-medium"
                >
                  Casino
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-medium"
                >
                  Rating
                  <SortIcon field="rating" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('bonus')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-medium"
                >
                  {locale === 'es' ? 'Bono' : 'Bonus'}
                  <SortIcon field="bonus" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('games')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-medium"
                >
                  {locale === 'es' ? 'Juegos' : 'Games'}
                  <SortIcon field="games" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('withdrawalTime')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-medium"
                >
                  {locale === 'es' ? 'Retiros' : 'Withdrawals'}
                  <SortIcon field="withdrawalTime" />
                </button>
              </th>
              <th className="text-left p-4 text-slate-400 font-medium">
                {locale === 'es' ? 'Características' : 'Features'}
              </th>
              <th className="text-center p-4"></th>
            </tr>
          </thead>
          <tbody>
            {sortedCasinos.map((casino, index) => (
              <motion.tr
                key={casino.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "border-b border-slate-800 hover:bg-slate-800/50 transition-colors",
                  selectedCasinos.includes(casino.id) && "bg-slate-800/30"
                )}
              >
                {/* Compare Checkbox */}
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedCasinos.includes(casino.id)}
                    onChange={() => toggleCasinoSelection(casino.id)}
                    className="w-5 h-5 rounded accent-primary cursor-pointer"
                    disabled={!selectedCasinos.includes(casino.id) && selectedCasinos.length >= 3}
                  />
                </td>

                {/* Casino Info */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <CasinoLogo 
                      name={casino.name} 
                      logo={casino.logo || casino.name.split(' ')[0].substring(0, 3)} 
                      size="md"
                      className="flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-white">{casino.name}</div>
                      <div className="text-xs text-slate-400">
                        {locale === 'es' ? 'Desde' : 'Since'} {casino.established}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="font-bold text-white">{casino.rating}</span>
                    <span className="text-sm text-slate-400">/5</span>
                  </div>
                </td>

                {/* Bonus */}
                <td className="p-4">
                  <div>
                    <div className="font-semibold text-primary">
                      {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()}
                    </div>
                    {casino.bonus.freeSpins && (
                      <div className="text-xs text-accent">
                        +{casino.bonus.freeSpins} giros
                      </div>
                    )}
                    <div className="text-xs text-slate-400 mt-1">
                      Rollover: {casino.bonus.wageringRequirement}x
                    </div>
                  </div>
                </td>

                {/* Games */}
                <td className="p-4">
                  <div>
                    <div className="font-semibold text-white">{casino.games.total}+</div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-slate-400">
                        🎰 {casino.games.slots}
                      </span>
                      <span className="text-xs text-slate-400">
                        🎪 {casino.games.live}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Withdrawal Time */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-white">{casino.withdrawalTime}</span>
                  </div>
                </td>

                {/* Features */}
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {casino.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex gap-2">
                    <a
                      href={`/${locale}/casinos/${casino.slug}`}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {locale === 'es' ? 'Reseña' : 'Review'}
                    </a>
                    <a
                      href={casino.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-primary to-accent text-black px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-1"
                    >
                      {locale === 'es' ? 'Jugar' : 'Play'}
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {sortedCasinos.map((casino, index) => (
          <motion.div
            key={casino.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "bg-slate-900 rounded-xl p-3 sm:p-4 border",
              selectedCasinos.includes(casino.id) ? "border-primary" : "border-slate-700"
            )}
          >
            {/* Casino Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedCasinos.includes(casino.id)}
                  onChange={() => toggleCasinoSelection(casino.id)}
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                  disabled={!selectedCasinos.includes(casino.id) && selectedCasinos.length >= 3}
                />
                <CasinoLogo 
                  name={casino.name} 
                  logo={casino.logo || casino.name.split(' ')[0].substring(0, 3)} 
                  size="sm"
                />
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-bold text-white">{casino.rating}</span>
              </div>
            </div>

            {/* Casino Name */}
            <h3 className="font-semibold text-white mb-3">{casino.name}</h3>

            {/* Bonus */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-3 mb-3">
              <div className="text-sm text-primary font-semibold mb-1">
                {locale === 'es' ? 'Bono de Bienvenida' : 'Welcome Bonus'}
              </div>
              <div className="text-lg font-bold text-white">
                {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()}
              </div>
              {casino.bonus.freeSpins && (
                <div className="text-xs text-accent">
                  +{casino.bonus.freeSpins} giros gratis
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
              <div className="bg-slate-800 rounded-lg p-2 text-center">
                <Gamepad className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-white font-semibold">{casino.games.total}+</div>
                <div className="text-slate-400">Juegos</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-2 text-center">
                <Clock className="w-4 h-4 text-accent mx-auto mb-1" />
                <div className="text-white font-semibold">{casino.withdrawalTime}</div>
                <div className="text-slate-400">Retiros</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-2 text-center">
                <CreditCard className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-white font-semibold">{casino.paymentMethods.length}</div>
                <div className="text-slate-400">Métodos</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href={`/${locale}/casinos/${casino.slug}`}
                className="flex-1 bg-slate-700 text-white text-center py-2 rounded-lg text-sm font-medium"
              >
                {locale === 'es' ? 'Ver Reseña' : 'View Review'}
              </a>
              <a
                href={casino.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-primary to-accent text-black text-center py-2 rounded-lg text-sm font-bold"
              >
                {casino.bonus?.type 
                  ? getCTAByType(casino.bonus.type, locale as 'es' | 'en')
                  : getCTAByIndex(casino.id.length + 2, locale as 'es' | 'en')}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Modal */}
      {selectedCasinos.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-96 bg-slate-900 border border-primary rounded-xl p-4 shadow-2xl z-50"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white">
              {locale === 'es' ? 'Comparar Casinos' : 'Compare Casinos'} ({selectedCasinos.length})
            </h3>
            <button
              onClick={() => setSelectedCasinos([])}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2 mb-3">
            {selectedCasinos.map(id => {
              const casino = casinos.find(c => c.id === id);
              return casino ? (
                <div key={id} className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-4 h-4 text-accent" />
                  {casino.name}
                </div>
              ) : null;
            })}
          </div>
          <button className="w-full bg-gradient-to-r from-primary to-accent text-black py-3 rounded-lg font-bold">
            {locale === 'es' ? 'Ver Comparación Detallada' : 'View Detailed Comparison'}
          </button>
        </motion.div>
      )}
    </div>
  );
}