export default function TrustSection() {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Por Qué Confiar en CasinosPesos?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">100% Seguros</h3>
            <p className="text-sm text-gray-600">Solo casinos con licencias válidas</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Bonos Exclusivos</h3>
            <p className="text-sm text-gray-600">Ofertas negociadas para ti</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Pagos Rápidos</h3>
            <p className="text-sm text-gray-600">Retiros en 24-48 horas</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expertos Locales</h3>
            <p className="text-sm text-gray-600">Conocemos tu mercado</p>
          </div>
        </div>
      </div>
    </section>
  );
}