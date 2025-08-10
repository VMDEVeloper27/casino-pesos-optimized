import { ArrowRight, Check, Clock, CreditCard, Gift, Plus, Scale, Shield, Star, TrendingUp, Trophy, Users, X, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCasinos } from '@/lib/casino-database';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ casinos?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Comparar Casinos Online en México | CasinosPesos',
      description: 'Compara los mejores casinos online de México lado a lado. Bonos, métodos de pago, retiros y más.',
      keywords: 'comparar casinos, mejores casinos mexico, comparador casinos, casino vs casino',
    };
  } else {
    return {
      title: 'Compare Online Casinos in Mexico | CasinosPesos',
      description: 'Compare the best online casinos in Mexico side by side. Bonuses, payment methods, withdrawals and more.',
      keywords: 'compare casinos, best casinos mexico, casino comparison, casino vs casino',
    };
  }
}

export default async function CompararPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { casinos: casinoParam } = await searchParams;
  
  // Fetch all casinos from database
  const allCasinos = await getAllCasinos();
  
  // Parse selected casinos from URL parameter
  const selectedCasinos = casinoParam ? casinoParam.split(',').filter(id => 
    allCasinos.some(c => c.id === id)
  ).slice(0, 4) : ['bet365', 'codere'];
  
  const compareData = selectedCasinos.map(id => 
    allCasinos.find(c => c.id === id)!
  ).filter(Boolean);

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full mb-6">
            <Scale className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-600">Comparador de Casinos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Compara los Mejores Casinos
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Analiza lado a lado hasta 4 casinos para encontrar el que mejor se adapte a tus necesidades
          </p>
        </div>

        {/* Casino Selector */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Casinos Seleccionados ({compareData.length}/4)</h2>
            <Link 
              href={`/${locale}/casinos`}
              className="text-primary hover:text-primary/80 text-sm font-semibold"
            >
              Agregar más casinos
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {compareData.map((casino) => (
              <div key={casino.id} className="bg-gray-100 rounded-lg p-4 relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-400">
                  <X className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2 relative overflow-hidden">
                    {casino.logo && casino.logo.startsWith('/') ? (
                      <Image
                        src={casino.logo}
                        alt={`${casino.name} logo`}
                        width={64}
                        height={48}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-xl font-bold text-gray-900">
                        {casino.logo || casino.name.substring(0, 3).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{casino.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs text-gray-600">{casino.rating}</span>
                  </div>
                </div>
              </div>
            ))}
            {compareData.length < 4 && (
              <Link 
                href={`/${locale}/casinos`}
                className="bg-gray-100/50 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <div className="text-center">
                  <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Agregar Casino</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 text-gray-500 font-semibold">Característica</th>
                  {compareData.map((casino) => (
                    <th key={casino.id} className="p-6 text-center">
                      <div className="text-gray-900 font-bold">{casino.name}</div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(casino.rating)
                                ? 'fill-primary text-primary'
                                : 'text-neutral-600'
                            }`}
                          />
                        ))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Bonus */}
                <tr className="border-b border-gray-200">
                  <td className="p-6 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-primary" />
                      Bono de Bienvenida
                    </div>
                  </td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6 text-center">
                      <div className="text-gray-900 font-bold">
                        {casino.bonus.percentage}% hasta ${casino.bonus.amount.toLocaleString()}
                      </div>
                      {casino.bonus.freeSpins && (
                        <div className="text-sm text-accent mt-1">
                          + {casino.bonus.freeSpins} Giros Gratis
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Rollover */}
                <tr className="border-b border-gray-200 bg-white/50">
                  <td className="p-6 text-gray-500">Rollover</td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6 text-center text-gray-900">
                      {casino.bonus.wageringRequirement}x
                    </td>
                  ))}
                </tr>

                {/* Min Deposit */}
                <tr className="border-b border-gray-200">
                  <td className="p-6 text-gray-500">Depósito Mínimo</td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6 text-center text-gray-900">
                      ${casino.bonus.minDeposit} MXN
                    </td>
                  ))}
                </tr>

                {/* Games */}
                <tr className="border-b border-gray-200 bg-white/50">
                  <td className="p-6 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-accent" />
                      Total de Juegos
                    </div>
                  </td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6 text-center">
                      <div className="text-gray-900 font-bold">{casino.games.total}+</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {casino.games.slots} Slots | {casino.games.live} Live
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Withdrawal Time */}
                <tr className="border-b border-gray-200">
                  <td className="p-6 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-400" />
                      Tiempo de Retiro
                    </div>
                  </td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6 text-center text-gray-900">
                      {casino.withdrawalTime}
                    </td>
                  ))}
                </tr>

                {/* Payment Methods */}
                <tr className="border-b border-gray-200 bg-white/50">
                  <td className="p-6 text-gray-500">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-400" />
                      Métodos de Pago
                    </div>
                  </td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {casino.paymentMethods.slice(0, 5).map((method) => (
                          <span key={method} className="bg-gray-100 text-xs text-gray-900 px-2 py-1 rounded">
                            {method}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* License */}
                <tr className="border-b border-gray-200">
                  <td className="p-6 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-400" />
                      Licencia
                    </div>
                  </td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6 text-center text-gray-900 text-sm">
                      {casino.licenses.join(', ')}
                    </td>
                  ))}
                </tr>

                {/* Established */}
                <tr className="border-b border-gray-200 bg-white/50">
                  <td className="p-6 text-gray-500">Establecido</td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6 text-center text-gray-900">
                      {casino.established}
                    </td>
                  ))}
                </tr>

                {/* Features */}
                <tr className="border-b border-gray-200">
                  <td className="p-6 text-gray-500">Características</td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6">
                      <div className="space-y-1">
                        {casino.features.slice(0, 3).map((feature) => (
                          <div key={feature} className="flex items-center justify-center gap-1">
                            <Check className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Pros */}
                <tr className="border-b border-gray-200 bg-white/50">
                  <td className="p-6 text-gray-500">Ventajas</td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6">
                      <div className="space-y-1">
                        {casino.pros.slice(0, 2).map((pro) => (
                          <div key={pro} className="flex items-start justify-center gap-1">
                            <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-600 text-left">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Cons */}
                <tr className="border-b border-gray-200">
                  <td className="p-6 text-gray-500">Desventajas</td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6">
                      <div className="space-y-1">
                        {casino.cons.slice(0, 2).map((con) => (
                          <div key={con} className="flex items-start justify-center gap-1">
                            <X className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-600 text-left">{con}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Action Buttons */}
                <tr>
                  <td className="p-6 text-gray-500">Acción</td>
                  {compareData.map((casino) => (
                    <td key={casino.id} className="p-6 text-center">
                      <a
                        href={casino.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200"
                      >
                        Jugar Ahora
                      </a>
                      <Link
                        href={`/${locale}/casinos/${casino.slug}`}
                        className="block mt-2 text-primary hover:text-primary/80 text-sm font-semibold"
                      >
                        Ver Reseña →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo Elegir el Mejor Casino?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">1</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Revisa la Licencia</p>
                  <p className="text-sm text-gray-500">Asegúrate de que el casino tenga licencia válida</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">2</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Compara Bonos</p>
                  <p className="text-sm text-gray-500">No solo el monto, también los requisitos de apuesta</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">3</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Métodos de Pago</p>
                  <p className="text-sm text-gray-500">Verifica que acepten tu método preferido</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">4</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Tiempo de Retiro</p>
                  <p className="text-sm text-gray-500">Prefiere casinos con retiros rápidos</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Factores Más Importantes</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 font-semibold">Seguridad</span>
                  <span className="text-primary-600">95%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 font-semibold">Bonos y Promociones</span>
                  <span className="text-primary-600">85%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 font-semibold">Variedad de Juegos</span>
                  <span className="text-primary-600">75%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 font-semibold">Velocidad de Pago</span>
                  <span className="text-primary-600">90%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}