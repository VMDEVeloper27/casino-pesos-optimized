'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Gift, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Calendar,
  DollarSign,
  Target,
  Award,
  ArrowRight,
  X,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { getCTAByName, getCTAByType } from '@/lib/cta-texts';

interface Bonus {
  id: string;
  casinoId: string;
  casinoName: string;
  bonusType: 'welcome' | 'reload' | 'cashback' | 'free-spins' | 'no-deposit';
  amount: number;
  currency: string;
  wagering: number;
  status: 'active' | 'pending' | 'completed' | 'expired';
  expiresAt: string;
  claimedAt: string;
  progress: number; // percentage of wagering completed
  maxWin?: number;
  minDeposit?: number;
  bonusCode?: string;
}

interface BonusesClientProps {
  locale: string;
}

export default function BonusesClient({ locale }: BonusesClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'completed' | 'expired'>('all');
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);

  const isSpanish = locale === 'es';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${locale}/auth/signin`);
    } else if (status === 'authenticated') {
      fetchBonuses();
    }
  }, [status, locale, router]);

  const fetchBonuses = async () => {
    try {
      // Por ahora usamos datos de ejemplo
      // En producción, esto vendría de la API
      const mockBonuses: Bonus[] = [
        {
          id: '1',
          casinoId: 'bet365',
          casinoName: 'Bet365',
          bonusType: 'welcome',
          amount: 1000,
          currency: 'MXN',
          wagering: 35,
          status: 'active',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          claimedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          progress: 45,
          maxWin: 10000,
          minDeposit: 200
        },
        {
          id: '2',
          casinoId: 'caliente',
          casinoName: 'Caliente.mx',
          bonusType: 'reload',
          amount: 500,
          currency: 'MXN',
          wagering: 25,
          status: 'active',
          expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          claimedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          progress: 20,
          maxWin: 5000,
          minDeposit: 100,
          bonusCode: 'RELOAD50'
        },
        {
          id: '3',
          casinoId: 'codere',
          casinoName: 'Codere',
          bonusType: 'free-spins',
          amount: 50,
          currency: 'SPINS',
          wagering: 40,
          status: 'pending',
          expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          claimedAt: new Date().toISOString(),
          progress: 0
        },
        {
          id: '4',
          casinoId: 'rushbet',
          casinoName: 'RushBet',
          bonusType: 'cashback',
          amount: 250,
          currency: 'MXN',
          wagering: 10,
          status: 'completed',
          expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          claimedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          progress: 100
        }
      ];

      setBonuses(mockBonuses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bonuses:', error);
      setLoading(false);
    }
  };

  const filteredBonuses = bonuses.filter(bonus => {
    if (filter === 'all') return true;
    return bonus.status === filter;
  });

  const getStatusColor = (status: Bonus['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'expired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Bonus['status']) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <X className="w-4 h-4" />;
      default: return null;
    }
  };

  const getBonusTypeLabel = (type: Bonus['bonusType']) => {
    const labels = {
      'welcome': isSpanish ? 'Bono de Bienvenida' : 'Welcome Bonus',
      'reload': isSpanish ? 'Bono de Recarga' : 'Reload Bonus',
      'cashback': isSpanish ? 'Cashback' : 'Cashback',
      'free-spins': isSpanish ? 'Giros Gratis' : 'Free Spins',
      'no-deposit': isSpanish ? 'Sin Depósito' : 'No Deposit'
    };
    return labels[type];
  };

  const getStatusLabel = (status: Bonus['status']) => {
    const labels = {
      'active': isSpanish ? 'Activo' : 'Active',
      'pending': isSpanish ? 'Pendiente' : 'Pending',
      'completed': isSpanish ? 'Completado' : 'Completed',
      'expired': isSpanish ? 'Expirado' : 'Expired'
    };
    return labels[status];
  };

  const getDaysRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Gift className="w-8 h-8 text-green-600" />
            {isSpanish ? 'Mis Bonos' : 'My Bonuses'}
          </h1>
          <p className="text-gray-600">
            {isSpanish 
              ? 'Gestiona y rastrea tus bonos activos de casino'
              : 'Manage and track your active casino bonuses'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                {bonuses.filter(b => b.status === 'active').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {isSpanish ? 'Bonos Activos' : 'Active Bonuses'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                ${bonuses
                  .filter(b => b.status === 'active' && b.currency === 'MXN')
                  .reduce((sum, b) => sum + b.amount, 0)
                  .toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {isSpanish ? 'Valor Total' : 'Total Value'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(
                  bonuses
                    .filter(b => b.status === 'active')
                    .reduce((sum, b, _, arr) => sum + b.progress / arr.length, 0)
                )}%
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {isSpanish ? 'Progreso Promedio' : 'Average Progress'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">
                {bonuses.filter(b => b.status === 'completed').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {isSpanish ? 'Completados' : 'Completed'}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'active', 'pending', 'completed', 'expired'] as const).map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterType
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filterType === 'all' && (isSpanish ? 'Todos' : 'All')}
              {filterType === 'active' && (isSpanish ? 'Activos' : 'Active')}
              {filterType === 'pending' && (isSpanish ? 'Pendientes' : 'Pending')}
              {filterType === 'completed' && (isSpanish ? 'Completados' : 'Completed')}
              {filterType === 'expired' && (isSpanish ? 'Expirados' : 'Expired')}
              <span className="ml-2 text-sm">
                ({bonuses.filter(b => filterType === 'all' || b.status === filterType).length})
              </span>
            </button>
          ))}
        </div>

        {/* Bonuses List */}
        <div className="space-y-4">
          {filteredBonuses.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isSpanish ? 'No hay bonos' : 'No bonuses'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isSpanish 
                  ? 'No tienes bonos en esta categoría'
                  : 'You have no bonuses in this category'}
              </p>
              <Link
                href={`/${locale}/bonos`}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                {isSpanish ? 'Explorar Bonos' : 'Explore Bonuses'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            filteredBonuses.map(bonus => (
              <div
                key={bonus.id}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedBonus(bonus)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Bonus Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white">
                        <Gift className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900">
                            {bonus.casinoName}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bonus.status)}`}>
                            {getStatusIcon(bonus.status)}
                            {getStatusLabel(bonus.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {getBonusTypeLabel(bonus.bonusType)}
                        </p>
                        
                        {/* Bonus Amount */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-2xl font-bold text-gray-900">
                            {bonus.currency === 'SPINS' 
                              ? bonus.amount
                              : `$${bonus.amount.toLocaleString()}`}
                          </span>
                          <span className="text-sm text-gray-600">
                            {bonus.currency === 'SPINS' 
                              ? (isSpanish ? 'Giros' : 'Spins')
                              : bonus.currency}
                          </span>
                          {bonus.wagering && (
                            <span className="text-sm text-gray-500">
                              • {bonus.wagering}x {isSpanish ? 'Apuesta' : 'Wagering'}
                            </span>
                          )}
                        </div>

                        {/* Progress Bar (for active bonuses) */}
                        {bonus.status === 'active' && (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">
                                {isSpanish ? 'Progreso' : 'Progress'}
                              </span>
                              <span className="font-medium text-gray-900">
                                {bonus.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                                style={{ width: `${bonus.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Additional Info */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          {bonus.bonusCode && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">
                                {isSpanish ? 'Código:' : 'Code:'}
                              </span>
                              <code className="bg-gray-100 px-2 py-1 rounded text-gray-900 font-mono">
                                {bonus.bonusCode}
                              </code>
                            </div>
                          )}
                          {bonus.minDeposit && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {isSpanish ? 'Depósito mín:' : 'Min deposit:'} ${bonus.minDeposit}
                              </span>
                            </div>
                          )}
                          {bonus.maxWin && (
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {isSpanish ? 'Ganancia máx:' : 'Max win:'} ${bonus.maxWin.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expiry Info */}
                  <div className="flex flex-col items-end gap-2">
                    {bonus.status === 'active' && (
                      <>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {isSpanish ? 'Expira en' : 'Expires in'}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {getDaysRemaining(bonus.expiresAt)} {isSpanish ? 'días' : 'days'}
                          </p>
                        </div>
                        <Link
                          href={`/${locale}/casinos/${bonus.casinoId}`}
                          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {getCTAByType(bonus.type, isSpanish ? 'es' : 'en')}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </>
                    )}
                    {bonus.status === 'pending' && (
                      <button
                        className="inline-flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle activation
                        }}
                      >
                        {isSpanish ? 'Activar' : 'Activate'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {bonus.status === 'completed' && (
                      <div className="text-green-600 font-medium flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {isSpanish ? 'Completado' : 'Completed'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bonus Details Modal */}
        {selectedBonus && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBonus(null)}
          >
            <div 
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isSpanish ? 'Detalles del Bono' : 'Bonus Details'}
                </h2>
                <button
                  onClick={() => setSelectedBonus(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Casino & Type */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {selectedBonus.casinoName}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBonus.status)}`}>
                      {getStatusIcon(selectedBonus.status)}
                      {getStatusLabel(selectedBonus.status)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {getBonusTypeLabel(selectedBonus.bonusType)}
                    </span>
                  </div>
                </div>

                {/* Amount & Wagering */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      {isSpanish ? 'Monto del Bono' : 'Bonus Amount'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedBonus.currency === 'SPINS' 
                        ? `${selectedBonus.amount} ${isSpanish ? 'Giros' : 'Spins'}`
                        : `$${selectedBonus.amount.toLocaleString()} ${selectedBonus.currency}`}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      {isSpanish ? 'Requisito de Apuesta' : 'Wagering Requirement'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedBonus.wagering}x
                    </p>
                  </div>
                </div>

                {/* Progress */}
                {selectedBonus.status === 'active' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {isSpanish ? 'Progreso de Apuesta' : 'Wagering Progress'}
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {isSpanish ? 'Completado' : 'Completed'}
                        </span>
                        <span className="font-bold text-gray-900">
                          {selectedBonus.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                          style={{ width: `${selectedBonus.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {isSpanish 
                          ? `Necesitas apostar $${((selectedBonus.amount * selectedBonus.wagering) * (1 - selectedBonus.progress / 100)).toLocaleString()} más`
                          : `You need to wager $${((selectedBonus.amount * selectedBonus.wagering) * (1 - selectedBonus.progress / 100)).toLocaleString()} more`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Terms */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {isSpanish ? 'Términos y Condiciones' : 'Terms & Conditions'}
                  </h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-2 text-sm text-gray-700">
                        {selectedBonus.minDeposit && (
                          <p>• {isSpanish ? 'Depósito mínimo:' : 'Minimum deposit:'} ${selectedBonus.minDeposit}</p>
                        )}
                        {selectedBonus.maxWin && (
                          <p>• {isSpanish ? 'Ganancia máxima:' : 'Maximum win:'} ${selectedBonus.maxWin.toLocaleString()}</p>
                        )}
                        <p>• {isSpanish ? 'Requisito de apuesta:' : 'Wagering requirement:'} {selectedBonus.wagering}x</p>
                        <p>• {isSpanish ? 'Válido hasta:' : 'Valid until:'} {new Date(selectedBonus.expiresAt).toLocaleDateString()}</p>
                        {selectedBonus.bonusCode && (
                          <p>• {isSpanish ? 'Código de bono:' : 'Bonus code:'} <code className="bg-white px-2 py-1 rounded">{selectedBonus.bonusCode}</code></p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {selectedBonus.status === 'active' && (
                    <Link
                      href={`/${locale}/casinos/${selectedBonus.casinoId}`}
                      className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      {isSpanish ? 'Ir al Casino' : 'Go to Casino'}
                    </Link>
                  )}
                  <button
                    onClick={() => setSelectedBonus(null)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    {isSpanish ? 'Cerrar' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}