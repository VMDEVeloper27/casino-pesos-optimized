'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, User, Calendar, Share2, Bookmark, ThumbsUp, MessageCircle, ChevronRight, Award } from 'lucide-react';
import Link from 'next/link';

// Extended guide data with full content
const guidesData = {
  '1': {
    id: 1,
    title: 'Cómo Elegir el Mejor Casino Online en 2024',
    category: 'Principiantes',
    readTime: '10 min',
    author: 'Carlos Mendoza',
    date: '2024-01-15',
    image: '🎰',
    difficulty: 'Fácil',
    content: `
      <h2>Introducción</h2>
      <p>Elegir un casino online seguro y confiable es el primer paso para disfrutar de una experiencia de juego positiva. En esta guía completa, te explicaremos todos los factores que debes considerar antes de registrarte en cualquier plataforma.</p>
      
      <h2>1. Verificar la Licencia y Regulación</h2>
      <p>El factor más importante al elegir un casino online es verificar que tenga una licencia válida. Los casinos con licencia están regulados por autoridades reconocidas que garantizan:</p>
      <ul>
        <li>Juegos justos y auditados</li>
        <li>Protección de datos personales</li>
        <li>Procesos de pago seguros</li>
        <li>Mecanismos de resolución de disputas</li>
      </ul>
      
      <h2>2. Evaluar la Selección de Juegos</h2>
      <p>Un buen casino debe ofrecer una amplia variedad de juegos de proveedores reconocidos. Busca casinos que ofrezcan:</p>
      <ul>
        <li>Tragamonedas de última generación</li>
        <li>Juegos de mesa clásicos (Blackjack, Ruleta, Baccarat)</li>
        <li>Casino en vivo con crupieres reales</li>
        <li>Poker y sus variantes</li>
      </ul>
      
      <h2>3. Métodos de Pago Disponibles</h2>
      <p>Verifica que el casino acepte métodos de pago convenientes para ti y que sean populares en México:</p>
      <ul>
        <li>Tarjetas de crédito/débito (Visa, Mastercard)</li>
        <li>Transferencias bancarias</li>
        <li>Monederos electrónicos (PayPal, Skrill, Neteller)</li>
        <li>OXXO y SPEI para México</li>
        <li>Criptomonedas (opcional)</li>
      </ul>
      
      <h2>4. Bonos y Promociones</h2>
      <p>Los bonos pueden aumentar significativamente tu bankroll, pero es crucial entender sus términos:</p>
      <ul>
        <li>Bono de bienvenida y su porcentaje de match</li>
        <li>Requisitos de apuesta (rollover)</li>
        <li>Tiempo límite para cumplir los requisitos</li>
        <li>Juegos que contribuyen al rollover</li>
        <li>Límites de retiro de ganancias del bono</li>
      </ul>
      
      <h2>5. Atención al Cliente</h2>
      <p>Un soporte eficiente es esencial. Busca casinos que ofrezcan:</p>
      <ul>
        <li>Chat en vivo 24/7 en español</li>
        <li>Soporte por email</li>
        <li>Número telefónico (preferible)</li>
        <li>Sección de preguntas frecuentes completa</li>
      </ul>
      
      <h2>Conclusión</h2>
      <p>Tomarte el tiempo para evaluar estos factores te ayudará a encontrar un casino online que se ajuste a tus necesidades y te proporcione una experiencia de juego segura y entretenida.</p>
    `,
    relatedGuides: [2, 3, 5]
  },
  '2': {
    id: 2,
    title: 'Estrategias Avanzadas de Blackjack',
    category: 'Estrategia',
    readTime: '15 min',
    author: 'Ana García',
    date: '2024-01-14',
    image: '🃏',
    difficulty: 'Avanzado',
    content: `
      <h2>Introducción al Blackjack Avanzado</h2>
      <p>El blackjack es uno de los juegos de casino con mejor RTP cuando se juega con estrategia óptima. En esta guía aprenderás las técnicas avanzadas que usan los jugadores profesionales.</p>
      
      <h2>1. Estrategia Básica del Blackjack</h2>
      <p>La estrategia básica es un conjunto de reglas matemáticamente probadas que te dicen la mejor jugada en cada situación.</p>
      
      <h2>2. Conteo de Cartas: Hi-Lo System</h2>
      <p>Aunque no es ilegal, el conteo de cartas requiere práctica y concentración. El sistema Hi-Lo asigna valores a las cartas:</p>
      <ul>
        <li>2-6: +1</li>
        <li>7-9: 0</li>
        <li>10-A: -1</li>
      </ul>
      
      <h2>3. Gestión de Bankroll para Blackjack</h2>
      <p>La gestión adecuada del bankroll es crucial para el éxito a largo plazo en el blackjack.</p>
      
      <h2>4. Variaciones del Juego</h2>
      <p>Conoce las diferentes variantes y sus reglas específicas.</p>
    `,
    relatedGuides: [3, 4, 8]
  },
  '3': {
    id: 3,
    title: 'Gestión de Bankroll: La Clave del Éxito',
    category: 'Finanzas',
    readTime: '8 min',
    author: 'Roberto Silva',
    date: '2024-01-13',
    image: '💰',
    difficulty: 'Intermedio',
    content: `
      <h2>¿Qué es el Bankroll?</h2>
      <p>Tu bankroll es el dinero que has destinado específicamente para jugar en casinos online. Una gestión adecuada es fundamental para maximizar tu diversión y minimizar las pérdidas.</p>
      
      <h2>1. Establece un Presupuesto</h2>
      <p>Nunca juegues con dinero que necesites para gastos esenciales. Define un monto mensual que puedas perder sin afectar tu vida.</p>
      
      <h2>2. La Regla del 5%</h2>
      <p>Nunca apuestes más del 5% de tu bankroll total en una sola sesión de juego.</p>
      
      <h2>3. Define Límites de Pérdida y Ganancia</h2>
      <p>Establece límites claros y respétalos siempre.</p>
    `,
    relatedGuides: [1, 6, 7]
  }
};

// Add more guides data (4-12) following the same pattern...

export default function GuiaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [guide, setGuide] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const guideId = params.id as string;
    const guideData = guidesData[guideId as keyof typeof guidesData];
    
    if (guideData) {
      setGuide(guideData);
      // Initialize random likes for demo
      setLikes(Math.floor(Math.random() * 500) + 100);
    }
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: guide?.title,
        text: guide?.excerpt,
        url: window.location.href,
      });
    }
  };

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Guía no encontrada</h1>
          <p className="text-gray-600 mb-4">La guía que buscas no existe o ha sido movida.</p>
          <Link 
            href="/guias"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Guías
          </Link>
        </div>
      </div>
    );
  }

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
                {guide.category}
              </span>
              <span className={`px-3 py-1 rounded-lg text-sm ${
                guide.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                guide.difficulty === 'Intermedio' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {guide.difficulty}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {guide.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {guide.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {guide.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {guide.readTime} de lectura
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
          className="bg-white rounded-2xl p-8 md:p-12 mb-8 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />

        {/* Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLikes(likes + 1)}
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>Comentarios</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Related Guides */}
        {guide.relatedGuides && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Guías Relacionadas</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {guide.relatedGuides.map((relatedId: number) => (
                <Link
                  key={relatedId}
                  href={`/guias/${relatedId}`}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-3">📖</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Guía Relacionada #{relatedId}</h3>
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    Leer más
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}