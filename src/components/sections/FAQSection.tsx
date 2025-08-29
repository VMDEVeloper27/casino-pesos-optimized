interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "¿Es legal jugar en casinos online desde México?",
    answer: "Sí, es completamente legal para mexicanos jugar en casinos online con licencia internacional. La legislación mexicana no prohíbe a los ciudadanos acceder a estos sitios."
  },
  {
    question: "¿Qué casinos aceptan depósitos con OXXO?",
    answer: "Los mejores casinos como Bet365, Codere y Strendus aceptan depósitos en OXXO. Puedes depositar efectivo en cualquiera de las +19,000 tiendas OXXO del país."
  },
  {
    question: "¿Cuánto tiempo tardan los retiros en pesos mexicanos?",
    answer: "Los retiros varían desde 2 horas (PayPal, Skrill) hasta 5 días (transferencia bancaria). Los e-wallets son los más rápidos, seguidos por tarjetas (24-72h) y transferencias bancarias."
  },
  {
    question: "¿Qué bonos de bienvenida son los mejores?",
    answer: "Los mejores bonos ofrecen hasta $50,000 MXN + giros gratis. Lo importante es revisar los requisitos de apuesta (idealmente 35x o menos) y el tiempo para cumplirlos."
  },
  {
    question: "¿Cómo sé si un casino online es seguro?",
    answer: "Verifica que tenga licencia válida (Curaçao, Malta, Gibraltar), encriptación SSL, métodos de pago reconocidos y reseñas positivas de usuarios reales."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Preguntas Frecuentes sobre Casinos Online en México
        </h2>
        <div className="max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.question}
              </h3>
              <p className="text-gray-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}