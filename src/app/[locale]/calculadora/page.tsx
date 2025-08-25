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
      title: 'Calculadora de Bonos de Casino 2025 | Rollover y Requisitos | CasinosPesos',
      description: 'Calcula exactamente cuánto apostar para liberar bonos de casino. Herramienta gratuita para calcular requisitos de rollover 30x, 35x, 40x y más.',
      keywords: 'calculadora bonos casino, rollover mexico, requisitos apuesta, wagering requirements, calculadora rollover, liberar bono casino',
      alternates: {
        canonical: 'https://www.casinospesos.com/es/calculadora',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/calculadora',
          'en-US': 'https://www.casinospesos.com/en/calculator',
        }
      },
      openGraph: {
        title: 'Calculadora de Bonos de Casino | Rollover Gratis',
        description: 'Calcula los requisitos de apuesta de cualquier bono. Descubre cuánto apostar para retirar tus ganancias.',
        url: 'https://www.casinospesos.com/es/calculadora',
        siteName: 'CasinosPesos',
        locale: 'es_MX',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Calculadora de Bonos de Casino'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Calculadora de Bonos de Casino Gratis',
        description: 'Calcula requisitos de rollover 30x, 35x, 40x. Herramienta gratuita.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
    };
  } else {
    return {
      title: 'Casino Bonus Calculator 2025 | Rollover & Requirements | CasinosPesos',
      description: 'Calculate exactly how much to wager to clear casino bonuses. Free tool to calculate 30x, 35x, 40x rollover requirements and more.',
      keywords: 'casino bonus calculator, rollover mexico, wagering requirements, rollover calculator, clear casino bonus',
      alternates: {
        canonical: 'https://www.casinospesos.com/en/calculator',
        languages: {
          'es-MX': 'https://www.casinospesos.com/es/calculadora',
          'en-US': 'https://www.casinospesos.com/en/calculator',
        }
      },
      openGraph: {
        title: 'Casino Bonus Calculator | Free Rollover Tool',
        description: 'Calculate wagering requirements for any bonus. Find out how much to bet to withdraw your winnings.',
        url: 'https://www.casinospesos.com/en/calculator',
        siteName: 'CasinosPesos',
        locale: 'en_US',
        type: 'website',
        images: [{
          url: 'https://www.casinospesos.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'Casino Bonus Calculator'
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Free Casino Bonus Calculator',
        description: 'Calculate 30x, 35x, 40x rollover requirements. Free tool.',
        images: ['https://www.casinospesos.com/logo.png'],
      }
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