'use client';

import { useState } from 'react';
import { Award, Calendar, CheckCircle, MessageSquare, Star, ThumbsDown, ThumbsUp, User } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  verified: boolean;
  helpful: number;
  notHelpful: number;
  casinoResponse?: {
    date: string;
    message: string;
  };
}

interface ReviewSystemProps {
  casinoId: string;
  casinoName: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  locale: string;
}

// Sample reviews data
const sampleReviews: Record<string, Review[]> = {
  'bet365': [
    {
      id: '1',
      userName: 'Carlos M.',
      rating: 5,
      date: '2024-01-10',
      title: 'Excelente casino, retiros rápidos',
      comment: 'Llevo 6 meses jugando en Bet365 y ha sido una experiencia excelente. Los retiros son súper rápidos, generalmente en menos de 24 horas. El soporte en español es muy bueno y siempre responden rápido.',
      pros: ['Retiros en menos de 24h', 'Excelente app móvil', 'Soporte 24/7 en español'],
      cons: ['Verificación inicial algo lenta'],
      verified: true,
      helpful: 45,
      notHelpful: 3,
      casinoResponse: {
        date: '2024-01-11',
        message: 'Gracias Carlos por tu reseña. Nos alegra mucho que disfrutes de nuestra plataforma. Seguiremos trabajando para mejorar el proceso de verificación.'
      }
    },
    {
      id: '2',
      userName: 'María G.',
      rating: 4,
      date: '2024-01-08',
      title: 'Muy buen casino pero podría mejorar',
      comment: 'En general muy satisfecha. Gran variedad de juegos y bonos frecuentes. Lo único malo es que no aceptan OXXO directamente, tienes que usar otros métodos.',
      pros: ['Muchos juegos', 'Bonos semanales', 'Interfaz fácil de usar'],
      cons: ['No acepta OXXO directamente', 'Algunos juegos tardan en cargar'],
      verified: true,
      helpful: 32,
      notHelpful: 5
    },
    {
      id: '3',
      userName: 'Roberto S.',
      rating: 5,
      date: '2024-01-05',
      title: 'El mejor casino online de México',
      comment: 'Después de probar varios casinos, Bet365 es definitivamente el mejor. RTP alto, pagos puntuales y excelente selección de slots. 100% recomendado.',
      pros: ['RTP alto', 'Pagos puntuales', 'Gran selección de slots'],
      cons: [],
      verified: false,
      helpful: 28,
      notHelpful: 2
    }
  ],
  'codere': [
    {
      id: '1',
      userName: 'Ana P.',
      rating: 4,
      date: '2024-01-12',
      title: 'Buen casino con licencia mexicana',
      comment: 'Me gusta que tengan licencia SEGOB. Los depósitos con OXXO son muy convenientes. Los retiros tardan un poco más que otros casinos pero son confiables.',
      pros: ['Licencia mexicana', 'Acepta OXXO', 'Buenos bonos'],
      cons: ['Retiros de 2-3 días', 'App mejorable'],
      verified: true,
      helpful: 38,
      notHelpful: 4
    }
  ]
};

export default function ReviewSystem({ 
  casinoId, 
  casinoName, 
  averageRating, 
  totalReviews, 
  ratingDistribution,
  locale 
}: ReviewSystemProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('helpful');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, 'helpful' | 'not' | null>>({});

  const reviews = sampleReviews[casinoId] || [];
  const isSpanish = locale === 'es';

  // Filter and sort reviews
  const filteredReviews = selectedRating 
    ? reviews.filter(r => r.rating === selectedRating)
    : reviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'helpful') {
      return b.helpful - a.helpful;
    } else {
      return b.rating - a.rating;
    }
  });

  const handleHelpfulVote = (reviewId: string, vote: 'helpful' | 'not') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: prev[reviewId] === vote ? null : vote
    }));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) { return 'text-green-600'; }
    if (rating >= 3) { return 'text-yellow-600'; }
    return 'text-red-600';
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) { return isSpanish ? 'Excelente' : 'Excellent'; }
    if (rating >= 4) { return isSpanish ? 'Muy Bueno' : 'Very Good'; }
    if (rating >= 3) { return isSpanish ? 'Bueno' : 'Good'; }
    if (rating >= 2) { return isSpanish ? 'Regular' : 'Fair'; }
    return isSpanish ? 'Malo' : 'Poor';
  };

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-green-600" />
          {isSpanish ? 'Reseñas de Usuarios' : 'User Reviews'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Rating Overview */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <div className="text-5xl font-bold text-gray-900">{averageRating}</div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-green-500 text-green-500' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {totalReviews} {isSpanish ? 'reseñas' : 'reviews'}
                </p>
              </div>
              <div className="hidden md:block">
                <div className={`text-2xl font-bold ${getRatingColor(averageRating)}`}>
                  {getRatingLabel(averageRating)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">
                    {isSpanish ? '78% verificadas' : '78% verified'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = ratingDistribution[rating as keyof typeof ratingDistribution];
              const percentage = (count / totalReviews) * 100;
              
              return (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    selectedRating === rating ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm text-gray-600 w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors"
          >
            {isSpanish ? 'Escribir Reseña' : 'Write Review'}
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {isSpanish ? 'Ordenar por:' : 'Sort by:'}
            </span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-white border border-gray-300 text-gray-900 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="helpful">{isSpanish ? 'Más útiles' : 'Most helpful'}</option>
              <option value="recent">{isSpanish ? 'Más recientes' : 'Most recent'}</option>
              <option value="rating">{isSpanish ? 'Calificación' : 'Rating'}</option>
            </select>
          </div>

          {selectedRating && (
            <button
              onClick={() => setSelectedRating(null)}
              className="text-sm text-green-600 hover:text-green-700 transition-colors"
            >
              {isSpanish ? `Limpiar filtro (${selectedRating}★)` : `Clear filter (${selectedRating}★)`}
            </button>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {isSpanish ? 'Comparte tu experiencia' : 'Share your experience'}
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isSpanish ? 'Tu calificación' : 'Your rating'}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Star className="w-6 h-6 text-gray-600 hover:text-green-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isSpanish ? 'Título de tu reseña' : 'Review title'}
              </label>
              <input 
                type="text"
                className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={isSpanish ? 'Resume tu experiencia' : 'Summarize your experience'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isSpanish ? 'Tu reseña' : 'Your review'}
              </label>
              <textarea 
                className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
                placeholder={isSpanish ? 'Cuéntanos tu experiencia...' : 'Tell us about your experience...'}
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors"
              >
                {isSpanish ? 'Publicar Reseña' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                {isSpanish ? 'Cancelar' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map(review => (
          <div key={review.id} className="bg-white rounded-xl p-6 border border-gray-200">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        {isSpanish ? 'Verificado' : 'Verified'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-green-500 text-green-500' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(review.date).toLocaleDateString(isSpanish ? 'es-MX' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
            <p className="text-gray-700 mb-4">{review.comment}</p>

            {/* Pros and Cons */}
            {(review.pros.length > 0 || review.cons.length > 0) && (
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {review.pros.length > 0 && (
                  <div>
                    <h6 className="text-sm font-semibold text-green-600 mb-2">
                      {isSpanish ? 'Pros:' : 'Pros:'}
                    </h6>
                    <ul className="space-y-1">
                      {review.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {review.cons.length > 0 && (
                  <div>
                    <h6 className="text-sm font-semibold text-red-600 mb-2">
                      {isSpanish ? 'Contras:' : 'Cons:'}
                    </h6>
                    <ul className="space-y-1">
                      {review.cons.map((con, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Casino Response */}
            {review.casinoResponse && (
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-gray-900">
                    {isSpanish ? `Respuesta de ${casinoName}` : `Response from ${casinoName}`}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(review.casinoResponse.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{review.casinoResponse.message}</p>
              </div>
            )}

            {/* Helpful Votes */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">
                {isSpanish ? '¿Te resultó útil?' : 'Was this helpful?'}
              </span>
              <button
                onClick={() => handleHelpfulVote(review.id, 'helpful')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                  helpfulVotes[review.id] === 'helpful' 
                    ? 'bg-green-500/20 text-green-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{review.helpful + (helpfulVotes[review.id] === 'helpful' ? 1 : 0)}</span>
              </button>
              <button
                onClick={() => handleHelpfulVote(review.id, 'not')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                  helpfulVotes[review.id] === 'not' 
                    ? 'bg-red-500/20 text-red-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span className="text-sm">{review.notHelpful + (helpfulVotes[review.id] === 'not' ? 1 : 0)}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {sortedReviews.length > 0 && (
        <div className="text-center">
          <button className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            {isSpanish ? 'Cargar más reseñas' : 'Load more reviews'}
          </button>
        </div>
      )}

      {/* No Reviews */}
      {sortedReviews.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {selectedRating 
              ? (isSpanish ? `No hay reseñas de ${selectedRating} estrellas` : `No ${selectedRating}-star reviews`)
              : (isSpanish ? 'Aún no hay reseñas' : 'No reviews yet')}
          </h3>
          <p className="text-gray-600 mb-6">
            {isSpanish 
              ? 'Sé el primero en compartir tu experiencia con este casino'
              : 'Be the first to share your experience with this casino'}
          </p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-colors"
          >
            {isSpanish ? 'Escribir la primera reseña' : 'Write the first review'}
          </button>
        </div>
      )}
    </div>
  );
}