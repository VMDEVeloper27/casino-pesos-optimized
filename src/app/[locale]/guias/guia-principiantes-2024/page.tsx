'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, User, Calendar, Share2, Bookmark, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GuiaPrincipiantesPage() {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Guía Definitiva para Principiantes 2024',
        text: 'Todo lo que necesitas saber antes de empezar a jugar en casinos online',
        url: window.location.href,
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Guías
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-600">
                Principiantes
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
                Fácil
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-bold">
                ⭐ GUÍA DESTACADA
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Guía Definitiva para Principiantes 2024
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Equipo de Expertos
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Actualizado: Enero 2024
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                25 min de lectura
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  isBookmarked 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Guardado' : 'Guardar'}
              </button>
              <button
                onClick={handleShare}
                className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Compartir
              </button>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 md:p-12 mb-8"
        >
          <div className="prose prose-lg max-w-none">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
              <p className="text-green-900 font-semibold">
                Esta guía completa te enseñará todo lo que necesitas saber antes de empezar a jugar en casinos online: 
                desde elegir el casino correcto hasta entender los bonos y jugar responsablemente.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">📋 Tabla de Contenidos</h2>
            <ol className="list-decimal list-inside space-y-2 mb-8">
              <li><a href="#licencias" className="text-green-600 hover:underline">Verificación de Licencias y Seguridad</a></li>
              <li><a href="#registro" className="text-green-600 hover:underline">Proceso de Registro Paso a Paso</a></li>
              <li><a href="#bonos" className="text-green-600 hover:underline">Entendiendo los Bonos de Casino</a></li>
              <li><a href="#juegos" className="text-green-600 hover:underline">Tipos de Juegos y RTP</a></li>
              <li><a href="#pagos" className="text-green-600 hover:underline">Métodos de Pago y Retiros</a></li>
              <li><a href="#responsable" className="text-green-600 hover:underline">Juego Responsable</a></li>
              <li><a href="#errores" className="text-green-600 hover:underline">Errores Comunes a Evitar</a></li>
            </ol>

            <h2 id="licencias" className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              1. Verificación de Licencias y Seguridad
            </h2>
            <p className="mb-4">
              El primer y más importante paso es verificar que el casino tenga una licencia válida. 
              Un casino con licencia garantiza juegos justos, protección de datos y pagos seguros.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-blue-900">Licencias Confiables:</p>
                  <ul className="list-disc list-inside mt-2 text-blue-800">
                    <li>Malta Gaming Authority (MGA)</li>
                    <li>UK Gambling Commission</li>
                    <li>Gibraltar Regulatory Authority</li>
                    <li>Curacao eGaming</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 id="registro" className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              2. Proceso de Registro Paso a Paso
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold">Paso 1: Elige un casino confiable</p>
                  <p className="text-gray-600">Verifica licencias, lee reseñas y compara opciones.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold">Paso 2: Completa el formulario de registro</p>
                  <p className="text-gray-600">Proporciona información real y verificable.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold">Paso 3: Verifica tu cuenta</p>
                  <p className="text-gray-600">Confirma tu email y envía documentos si es necesario.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold">Paso 4: Realiza tu primer depósito</p>
                  <p className="text-gray-600">Elige un método de pago seguro y aprovecha el bono de bienvenida.</p>
                </div>
              </div>
            </div>

            <h2 id="bonos" className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              3. Entendiendo los Bonos de Casino
            </h2>
            <p className="mb-4">
              Los bonos pueden aumentar significativamente tu bankroll, pero es crucial entender sus términos y condiciones.
            </p>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-3">Tipos de Bonos Comunes:</h3>
              <ul className="space-y-3">
                <li><strong>Bono de Bienvenida:</strong> Hasta 100-200% de tu primer depósito</li>
                <li><strong>Giros Gratis:</strong> Tiradas gratuitas en slots específicas</li>
                <li><strong>Bono sin Depósito:</strong> Dinero o giros gratis sin necesidad de depositar</li>
                <li><strong>Cashback:</strong> Devolución de un porcentaje de tus pérdidas</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <p className="font-semibold text-yellow-900">Importante: Requisitos de Apuesta</p>
                  <p className="text-yellow-800">
                    Los bonos tienen requisitos de apuesta (rollover) que debes cumplir antes de retirar. 
                    Por ejemplo, un rollover de 30x significa que debes apostar 30 veces el valor del bono.
                  </p>
                </div>
              </div>
            </div>

            <h2 id="juegos" className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              4. Tipos de Juegos y RTP
            </h2>
            <p className="mb-4">
              El RTP (Return to Player) indica el porcentaje teórico que un juego devuelve a los jugadores a largo plazo.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Tipo de Juego</th>
                    <th className="px-4 py-2 text-left">RTP Típico</th>
                    <th className="px-4 py-2 text-left">Nivel de Habilidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Blackjack</td>
                    <td className="px-4 py-2">99.5%</td>
                    <td className="px-4 py-2">Alto</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Ruleta Europea</td>
                    <td className="px-4 py-2">97.3%</td>
                    <td className="px-4 py-2">Bajo</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Tragamonedas</td>
                    <td className="px-4 py-2">94-98%</td>
                    <td className="px-4 py-2">Ninguno</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Baccarat</td>
                    <td className="px-4 py-2">98.9%</td>
                    <td className="px-4 py-2">Bajo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="pagos" className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              5. Métodos de Pago y Retiros
            </h2>
            <p className="mb-4">
              Elegir el método de pago correcto es crucial para una experiencia fluida.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Depósitos Rápidos:</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Tarjetas de crédito/débito</li>
                  <li>E-wallets (PayPal, Skrill)</li>
                  <li>Criptomonedas</li>
                  <li>OXXO (México)</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Retiros Seguros:</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Transferencia bancaria (3-5 días)</li>
                  <li>E-wallets (24-48 horas)</li>
                  <li>Criptomonedas (instantáneo)</li>
                  <li>Cheque (7-21 días)</li>
                </ul>
              </div>
            </div>

            <h2 id="responsable" className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              6. Juego Responsable
            </h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="font-bold text-red-900 mb-3">Establece Límites Desde el Principio:</h3>
              <ul className="space-y-2 text-red-800">
                <li>✓ Define un presupuesto mensual para jugar</li>
                <li>✓ Nunca juegues con dinero que necesites</li>
                <li>✓ Establece límites de tiempo de juego</li>
                <li>✓ Toma descansos regulares</li>
                <li>✓ No persigas las pérdidas</li>
              </ul>
            </div>

            <h2 id="errores" className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              7. Errores Comunes a Evitar
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-red-600 text-xl">❌</span>
                <div>
                  <p className="font-semibold">No leer los términos y condiciones</p>
                  <p className="text-gray-600">Siempre revisa los requisitos de bonos y reglas del casino.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 text-xl">❌</span>
                <div>
                  <p className="font-semibold">Jugar sin establecer límites</p>
                  <p className="text-gray-600">Define tu presupuesto antes de empezar a jugar.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 text-xl">❌</span>
                <div>
                  <p className="font-semibold">Perseguir las pérdidas</p>
                  <p className="text-gray-600">Acepta las pérdidas como parte del juego y no intentes recuperarlas apostando más.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 text-xl">❌</span>
                <div>
                  <p className="font-semibold">Jugar bajo los efectos del alcohol</p>
                  <p className="text-gray-600">Mantén la mente clara para tomar decisiones racionales.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-8 mt-12">
              <h2 className="text-2xl font-bold mb-4">🎯 Conclusión</h2>
              <p className="mb-4">
                Ahora tienes todas las herramientas necesarias para empezar tu aventura en los casinos online de forma segura y responsable. 
                Recuerda siempre:
              </p>
              <ul className="space-y-2">
                <li>✅ Verifica siempre las licencias</li>
                <li>✅ Lee los términos de los bonos</li>
                <li>✅ Juega responsablemente</li>
                <li>✅ Diviértete y no lo tomes como una fuente de ingresos</li>
              </ul>
            </div>
          </div>
        </motion.article>

        {/* Related Guides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos Pasos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/guias/3"
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Gestión de Bankroll</h3>
              <p className="text-gray-600 text-sm mb-3">Aprende a gestionar tu presupuesto de forma efectiva</p>
              <span className="text-green-600 font-semibold">Leer más →</span>
            </Link>

            <Link
              href="/guias/5"
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="font-semibold text-gray-900 mb-2">Guía de Bonos</h3>
              <p className="text-gray-600 text-sm mb-3">Maximiza el valor de los bonos de casino</p>
              <span className="text-green-600 font-semibold">Leer más →</span>
            </Link>

            <Link
              href="/guias/4"
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Slots con Alto RTP</h3>
              <p className="text-gray-600 text-sm mb-3">Descubre las mejores tragamonedas para jugar</p>
              <span className="text-green-600 font-semibold">Leer más →</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}