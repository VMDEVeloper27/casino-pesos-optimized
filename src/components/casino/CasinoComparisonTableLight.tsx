'use client';

import { useMemo, useState } from 'react';
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
import { getCTAByName, getCTAByIndex } from '@/lib/cta-texts';

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

export function CasinoComparisonTableLight({ casinos, locale = 'es' }: ComparisonTableProps) {
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
        : [...prev, casinoId].slice(0, 4) // Max 4 for comparison
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
      <ChevronDown className="w-4 h-4 text-primary-600" /> : 
      <ChevronUp className="w-4 h-4 text-primary-600" />;
  };

  return (
    <div className="w-full">
      {/* Filters Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-900 font-semibold hover:text-primary-600 transition-colors"
          >
            <Filter className="w-5 h-5" />
            {locale === 'es' ? 'Filtros' : 'Filters'}
            {Object.values(filters).some(v => v) && (
              <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                {Object.values(filters).filter(v => v).length}
              </span>
            )}
          </button>

          {selectedCasinos.length > 0 && (
            <button
              onClick={() => setSelectedCasinos([])}
              className="text-sm text-gray-600 hover:text-gray-700 transition-colors"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                {/* Rating Filter */}
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    {locale === 'es' ? 'Rating Mínimo' : 'Min Rating'}
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => setFilters({...filters, minRating: Number(e.target.value)})}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-sm"
                  >
                    <option value="0">Todos</option>
                    <option value="4">4.0+</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.8">4.8+</option>
                  </select>
                </div>

                {/* Payment Method Filter */}
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    {locale === 'es' ? 'Método de Pago' : 'Payment Method'}
                  </label>
                  <select
                    value={filters.paymentMethod}
                    onChange={(e) => setFilters({...filters, paymentMethod: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-sm"
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
                  <label className="text-xs text-gray-600 mb-1 block">
                    {locale === 'es' ? 'Moneda' : 'Currency'}
                  </label>
                  <select
                    value={filters.currency}
                    onChange={(e) => setFilters({...filters, currency: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-sm"
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
                      className="w-4 h-4 rounded accent-primary-600"
                    />
                    <span className="text-sm text-gray-700">
                      {locale === 'es' ? 'Casino en Vivo' : 'Live Casino'}
                    </span>
                  </label>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-700 transition-colors flex items-center gap-1"
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
        <table className="w-full bg-white rounded-xl overflow-hidden">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-4 text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                  {locale === 'es' ? 'Comparar' : 'Compare'}
                </div>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Casino
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Rating
                  <SortIcon field="rating" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('bonus')}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {locale === 'es' ? 'Bono' : 'Bonus'}
                  <SortIcon field="bonus" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('games')}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {locale === 'es' ? 'Juegos' : 'Games'}
                  <SortIcon field="games" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('withdrawalTime')}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {locale === 'es' ? 'Retiros' : 'Withdrawals'}
                  <SortIcon field="withdrawalTime" />
                </button>
              </th>
              <th className="text-left p-4 text-gray-600 font-medium">
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
                  "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                  selectedCasinos.includes(casino.id) && "bg-primary-50"
                )}
              >
                {/* Compare Checkbox */}
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedCasinos.includes(casino.id)}
                    onChange={() => toggleCasinoSelection(casino.id)}
                    className="w-5 h-5 rounded accent-primary-600 cursor-pointer"
                    disabled={!selectedCasinos.includes(casino.id) && selectedCasinos.length >= 4}
                    title={!selectedCasinos.includes(casino.id) && selectedCasinos.length >= 4 ? (locale === 'es' ? 'Máximo 4 casinos para comparar' : 'Maximum 4 casinos to compare') : ''}
                    aria-label={`${locale === 'es' ? 'Seleccionar' : 'Select'} ${casino.name} ${locale === 'es' ? 'para comparar' : 'for comparison'}`}
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
                      <div className="font-semibold text-gray-900">{casino.name}</div>
                      <div className="text-xs text-gray-600">
                        {locale === 'es' ? 'Desde' : 'Since'} {casino.established}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{casino.rating}</span>
                    <span className="text-sm text-gray-600">/5</span>
                  </div>
                </td>

                {/* Bonus */}
                <td className="p-4">
                  <div>
                    <div className="font-semibold text-green-700">
                      {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()}
                    </div>
                    {casino.bonus.freeSpins && (
                      <div className="text-xs text-orange-700">
                        +{casino.bonus.freeSpins} giros
                      </div>
                    )}
                    <div className="text-xs text-gray-600 mt-1">
                      Rollover: {casino.bonus.wageringRequirement}x
                    </div>
                  </div>
                </td>

                {/* Games */}
                <td className="p-4">
                  <div>
                    <div className="font-semibold text-gray-900">{casino.games.total}+</div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-gray-600">
                        🎰 {casino.games.slots}
                      </span>
                      <span className="text-xs text-gray-600">
                        🎪 {casino.games.live}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Withdrawal Time */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-900">{casino.withdrawalTime}</span>
                  </div>
                </td>

                {/* Features */}
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {casino.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200"
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
                      className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {locale === 'es' ? 'Reseña' : 'Review'}
                    </a>
                    <a
                      href={casino.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1 shadow-md hover:shadow-lg"
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
              "bg-white rounded-xl p-3 sm:p-4 border shadow-sm",
              selectedCasinos.includes(casino.id) ? "border-primary-300 shadow-md" : "border-gray-200"
            )}
          >
            {/* Casino Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedCasinos.includes(casino.id)}
                  onChange={() => toggleCasinoSelection(casino.id)}
                  className="w-5 h-5 rounded accent-primary-600 cursor-pointer"
                  disabled={!selectedCasinos.includes(casino.id) && selectedCasinos.length >= 4}
                  title={!selectedCasinos.includes(casino.id) && selectedCasinos.length >= 4 ? (locale === 'es' ? 'Máximo 4 casinos para comparar' : 'Maximum 4 casinos to compare') : ''}
                  aria-label={`${locale === 'es' ? 'Seleccionar' : 'Select'} ${casino.name} ${locale === 'es' ? 'para comparar' : 'for comparison'}`}
                />
                <CasinoLogo 
                  name={casino.name} 
                  logo={casino.logo || casino.name.split(' ')[0].substring(0, 3)} 
                  size="sm"
                />
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900">{casino.rating}</span>
              </div>
            </div>

            {/* Casino Name */}
            <h3 className="font-semibold text-gray-900 mb-3">{casino.name}</h3>

            {/* Bonus */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-3 border border-green-200">
              <div className="text-sm text-green-700 font-semibold mb-1">
                {locale === 'es' ? 'Bono de Bienvenida' : 'Welcome Bonus'}
              </div>
              <div className="text-lg font-bold text-gray-900">
                {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()}
              </div>
              {casino.bonus.freeSpins && (
                <div className="text-xs text-green-700">
                  +{casino.bonus.freeSpins} giros gratis
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                <Gamepad className="w-4 h-4 text-primary-600 mx-auto mb-1" />
                <div className="text-gray-900 font-semibold">{casino.games.total}+</div>
                <div className="text-gray-600">Juegos</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                <Clock className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                <div className="text-gray-900 font-semibold">{casino.withdrawalTime}</div>
                <div className="text-gray-600">Retiros</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                <CreditCard className="w-4 h-4 text-primary-600 mx-auto mb-1" />
                <div className="text-gray-900 font-semibold">{casino.paymentMethods.length}</div>
                <div className="text-gray-600">Métodos</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href={`/${locale}/casinos/${casino.slug}`}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2 rounded-lg text-sm font-medium transition-colors border border-gray-200"
              >
                {locale === 'es' ? 'Ver Reseña' : 'View Review'}
              </a>
              <a
                href={casino.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-center py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                {getCTAByName(casino.name, locale as 'es' | 'en')}
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
          className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-96 bg-white border-2 border-primary-300 rounded-xl p-4 shadow-2xl z-50"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                {locale === 'es' ? 'Comparar Casinos' : 'Compare Casinos'} ({selectedCasinos.length}/4)
              </h3>
              {selectedCasinos.length === 4 && (
                <p className="text-xs text-amber-600 mt-1">
                  {locale === 'es' ? 'Límite máximo alcanzado' : 'Maximum limit reached'}
                </p>
              )}
            </div>
            <button
              onClick={() => setSelectedCasinos([])}
              className="text-gray-600 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2 mb-3">
            {selectedCasinos.map(id => {
              const casino = casinos.find(c => c.id === id);
              return casino ? (
                <div key={id} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  {casino.name}
                </div>
              ) : null;
            })}
          </div>
          <a 
            href={`/${locale}/comparar?casinos=${selectedCasinos.join(',')}`}
            className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all text-center"
          >
            {locale === 'es' ? 'Ver Comparación Detallada' : 'View Detailed Comparison'}
          </a>
        </motion.div>
      )}
    </div>
  );
}