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
    if (rating >= 4) { return 'text-green-400'; }
    if (rating >= 3) { return 'text-yellow-400'; }
    return 'text-red-400';
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
      <div className="bg-neutral-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          {isSpanish ? 'Reseñas de Usuarios' : 'User Reviews'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Rating Overview */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <div className="text-5xl font-bold text-white">{averageRating}</div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-primary text-primary' : 'text-neutral-600'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-neutral-400 mt-1">
                  {totalReviews} {isSpanish ? 'reseñas' : 'reviews'}
                </p>
              </div>
              <div className="hidden md:block">
                <div className={`text-2xl font-bold ${getRatingColor(averageRating)}`}>
                  {getRatingLabel(averageRating)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-neutral-400">
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
                    selectedRating === rating ? 'bg-neutral-700' : 'hover:bg-neutral-700/50'
                  }`}
                >
                  <span className="text-sm text-neutral-400 w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-neutral-400 w-12 text-right">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-neutral-700">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-gradient-to-r from-primary to-accent text-black px-6 py-2 rounded-lg font-semibold hover:from-primary/90 hover:to-accent/90 transition-colors"
          >
            {isSpanish ? 'Escribir Reseña' : 'Write Review'}
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-400">
              {isSpanish ? 'Ordenar por:' : 'Sort by:'}
            </span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-neutral-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="helpful">{isSpanish ? 'Más útiles' : 'Most helpful'}</option>
              <option value="recent">{isSpanish ? 'Más recientes' : 'Most recent'}</option>
              <option value="rating">{isSpanish ? 'Calificación' : 'Rating'}</option>
            </select>
          </div>

          {selectedRating && (
            <button
              onClick={() => setSelectedRating(null)}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {isSpanish ? `Limpiar filtro (${selectedRating}★)` : `Clear filter (${selectedRating}★)`}
            </button>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">
            {isSpanish ? 'Comparte tu experiencia' : 'Share your experience'}
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-300 mb-2">
                {isSpanish ? 'Tu calificación' : 'Your rating'}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    className="p-2 hover:bg-neutral-700 rounded transition-colors"
                  >
                    <Star className="w-6 h-6 text-neutral-500 hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-neutral-300 mb-2">
                {isSpanish ? 'Título de tu reseña' : 'Review title'}
              </label>
              <input 
                type="text"
                className="w-full bg-neutral-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={isSpanish ? 'Resume tu experiencia' : 'Summarize your experience'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-neutral-300 mb-2">
                {isSpanish ? 'Tu reseña' : 'Your review'}
              </label>
              <textarea 
                className="w-full bg-neutral-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
                placeholder={isSpanish ? 'Cuéntanos tu experiencia...' : 'Tell us about your experience...'}
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-accent text-black px-6 py-2 rounded-lg font-semibold hover:from-primary/90 hover:to-accent/90 transition-colors"
              >
                {isSpanish ? 'Publicar Reseña' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-neutral-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-neutral-600 transition-colors"
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
          <div key={review.id} className="bg-neutral-800 rounded-xl p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-neutral-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white">{review.userName}</h4>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
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
                          className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-neutral-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
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
            <h5 className="font-semibold text-white mb-2">{review.title}</h5>
            <p className="text-neutral-300 mb-4">{review.comment}</p>

            {/* Pros and Cons */}
            {(review.pros.length > 0 || review.cons.length > 0) && (
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {review.pros.length > 0 && (
                  <div>
                    <h6 className="text-sm font-semibold text-green-400 mb-2">
                      {isSpanish ? 'Pros:' : 'Pros:'}
                    </h6>
                    <ul className="space-y-1">
                      {review.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {review.cons.length > 0 && (
                  <div>
                    <h6 className="text-sm font-semibold text-red-400 mb-2">
                      {isSpanish ? 'Contras:' : 'Cons:'}
                    </h6>
                    <ul className="space-y-1">
                      {review.cons.map((con, i) => (
                        <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">-</span>
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
              <div className="bg-neutral-700/50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-white">
                    {isSpanish ? `Respuesta de ${casinoName}` : `Response from ${casinoName}`}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {new Date(review.casinoResponse.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-neutral-300">{review.casinoResponse.message}</p>
              </div>
            )}

            {/* Helpful Votes */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-700">
              <span className="text-sm text-neutral-400">
                {isSpanish ? '¿Te resultó útil?' : 'Was this helpful?'}
              </span>
              <button
                onClick={() => handleHelpfulVote(review.id, 'helpful')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                  helpfulVotes[review.id] === 'helpful' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{review.helpful + (helpfulVotes[review.id] === 'helpful' ? 1 : 0)}</span>
              </button>
              <button
                onClick={() => handleHelpfulVote(review.id, 'not')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                  helpfulVotes[review.id] === 'not' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
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
          <button className="bg-neutral-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-600 transition-colors">
            {isSpanish ? 'Cargar más reseñas' : 'Load more reviews'}
          </button>
        </div>
      )}

      {/* No Reviews */}
      {sortedReviews.length === 0 && (
        <div className="bg-neutral-800 rounded-xl p-12 text-center">
          <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {selectedRating 
              ? (isSpanish ? `No hay reseñas de ${selectedRating} estrellas` : `No ${selectedRating}-star reviews`)
              : (isSpanish ? 'Aún no hay reseñas' : 'No reviews yet')}
          </h3>
          <p className="text-neutral-400 mb-6">
            {isSpanish 
              ? 'Sé el primero en compartir tu experiencia con este casino'
              : 'Be the first to share your experience with this casino'}
          </p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-gradient-to-r from-primary to-accent text-black px-6 py-3 rounded-lg font-bold hover:from-primary/90 hover:to-accent/90 transition-colors"
          >
            {isSpanish ? 'Escribir la primera reseña' : 'Write the first review'}
          </button>
        </div>
      )}
    </div>
  );
}