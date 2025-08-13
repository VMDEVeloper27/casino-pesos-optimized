import type { Metadata } from 'next';
import { Calculator, TrendingUp, AlertCircle, Lightbulb, DollarSign, Target } from 'lucide-react';
import BonusCalculator from '@/components/BonusCalculator';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === 'es';
  
  if (isSpanish) {
    return {
      title: 'Calculadora de Bonos de Casino | Calcula tu Rollover | CasinosPesos',
      description: 'Calcula cuánto necesitas apostar para liberar tu bono de casino. Herramienta gratuita para calcular requisitos de rollover.',
      keywords: 'calculadora bonos casino, rollover calculator, requisitos apuesta, wagering requirements, calculadora casino',
    };
  } else {
    return {
      title: 'Casino Bonus Calculator | Calculate Your Wagering | CasinosPesos',
      description: 'Calculate how much you need to wager to clear your casino bonus. Free tool for calculating rollover requirements.',
      keywords: 'casino bonus calculator, rollover calculator, wagering requirements, bonus calculator, casino calculator',
    };
  }
}

export default async function CalculadoraPage({ params }: PageProps) {
  const { locale } = await params;
  const isSpanish = locale === 'es';

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isSpanish ? 'Calculadora de Bonos' : 'Bonus Calculator'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? 'Calcula exactamente cuánto necesitas apostar para liberar tu bono de casino y planifica tu estrategia de juego.'
              : 'Calculate exactly how much you need to wager to clear your casino bonus and plan your gaming strategy.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <BonusCalculator />
            </div>

            {/* How to Use */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-bold text-gray-900">
                  {isSpanish ? 'Cómo usar la calculadora' : 'How to use the calculator'}
                </h2>
              </div>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Ingresa el monto que planeas depositar'
                      : 'Enter the amount you plan to deposit'}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Ajusta tu tamaño promedio de apuesta'
                      : 'Adjust your average bet size'}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Revisa cuánto necesitas apostar en total'
                      : 'Review how much you need to wager in total'}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Verifica el tiempo estimado para completar el rollover'
                      : 'Check the estimated time to complete the rollover'}
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">
                  {isSpanish ? 'Consejos Pro' : 'Pro Tips'}
                </h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Los slots suelen contar 100% para el rollover'
                      : 'Slots usually count 100% towards rollover'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Los juegos de mesa pueden contar solo 10-20%'
                      : 'Table games may only count 10-20%'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Revisa siempre los términos del bono'
                      : 'Always check the bonus terms'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    {isSpanish 
                      ? 'Algunos juegos están excluidos del rollover'
                      : 'Some games are excluded from rollover'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Warning */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {isSpanish ? 'Importante' : 'Important'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isSpanish 
                      ? 'Esta calculadora proporciona estimaciones basadas en valores estándar. Siempre verifica los términos específicos de cada casino antes de aceptar un bono.'
                      : 'This calculator provides estimates based on standard values. Always verify the specific terms of each casino before accepting a bonus.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Common Wagering Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">
                  {isSpanish ? 'Requisitos Comunes' : 'Common Requirements'}
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">
                    {isSpanish ? 'Bajo' : 'Low'}
                  </span>
                  <span className="font-semibold text-gray-900">20x - 25x</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">
                    {isSpanish ? 'Medio' : 'Medium'}
                  </span>
                  <span className="font-semibold text-gray-900">30x - 40x</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">
                    {isSpanish ? 'Alto' : 'High'}
                  </span>
                  <span className="font-semibold text-gray-900">45x - 60x</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">
                    {isSpanish ? 'Muy Alto' : 'Very High'}
                  </span>
                  <span className="font-semibold text-gray-900">65x+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}