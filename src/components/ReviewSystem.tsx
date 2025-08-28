'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Award, Calendar, CheckCircle, MessageSquare, Star, ThumbsDown, ThumbsUp, User, Loader2, AlertCircle } from 'lucide-react';

interface Review {
  id: string;
  user_name: string;
  rating: number;
  created_at: string;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  verified: boolean;
  helpful: number;
  not_helpful: number;
  review_responses?: {
    created_at: string;
    message: string;
  }[];
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

export default function ReviewSystem({ 
  casinoId, 
  casinoName, 
  locale 
}: ReviewSystemProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('helpful');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  
  // Form state
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
    pros: '',
    cons: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isSpanish = locale === 'es';

  // Fetch reviews from API
  useEffect(() => {
    fetchReviews();
  }, [casinoId, currentPage]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reviews?casinoId=${casinoId}&page=${currentPage}&limit=10`);
      const data = await response.json();
      
      if (response.ok) {
        setReviews(data.reviews);
        setStats({
          averageRating: data.averageRating,
          totalReviews: data.totalReviews,
          ratingDistribution: data.ratingDistribution
        });
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle review submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.push(`/${locale}/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          casinoId,
          casinoName,
          rating: formData.rating,
          title: formData.title,
          comment: formData.comment,
          pros: formData.pros ? formData.pros.split(',').map(p => p.trim()).filter(p => p) : [],
          cons: formData.cons ? formData.cons.split(',').map(c => c.trim()).filter(c => c) : []
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setShowReviewForm(false);
        setFormData({ rating: 5, title: '', comment: '', pros: '', cons: '' });
        // Refresh reviews after submission
        fetchReviews();
      } else {
        setSubmitError(data.error || 'Failed to submit review');
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle vote for helpful/not helpful
  const handleVote = async (reviewId: string, vote: 'helpful' | 'not_helpful') => {
    if (!session) {
      router.push(`/${locale}/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote })
      });

      if (response.ok) {
        // Refresh reviews to get updated counts
        fetchReviews();
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  // Filter and sort reviews
  const filteredReviews = selectedRating 
    ? reviews.filter(r => r.rating === selectedRating)
    : reviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === 'helpful') {
      return b.helpful - a.helpful;
    } else {
      return b.rating - a.rating;
    }
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-700';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return isSpanish ? 'Excelente' : 'Excellent';
    if (rating >= 4) return isSpanish ? 'Muy Bueno' : 'Very Good';
    if (rating >= 3) return isSpanish ? 'Bueno' : 'Good';
    if (rating >= 2) return isSpanish ? 'Regular' : 'Fair';
    return isSpanish ? 'Malo' : 'Poor';
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-green-700" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-green-700" />
          {isSpanish ? 'Reseñas de Usuarios' : 'User Reviews'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Rating Overview */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <div className="text-5xl font-bold text-gray-900">{stats.averageRating || 0}</div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(stats.averageRating) ? 'fill-green-500 text-green-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {stats.totalReviews} {isSpanish ? 'reseñas' : 'reviews'}
                </p>
              </div>
              <div className="hidden md:block">
                <div className={`text-2xl font-bold ${getRatingColor(stats.averageRating)}`}>
                  {getRatingLabel(stats.averageRating)}
                </div>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              
              return (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                  className={`w-full flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors ${
                    selectedRating === rating ? 'bg-green-50' : ''
                  }`}
                >
                  <span className="text-sm font-medium w-4">{rating}</span>
                  <Star className="w-4 h-4 fill-green-500 text-green-500" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full transition-all duration-300"
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
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t">
          <button
            onClick={() => {
              if (session) {
                setShowReviewForm(!showReviewForm);
              } else {
                router.push(`/${locale}/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
              }
            }}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-colors"
          >
            {isSpanish ? 'Escribir Reseña' : 'Write Review'}
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="helpful">{isSpanish ? 'Más útiles' : 'Most helpful'}</option>
            <option value="recent">{isSpanish ? 'Más recientes' : 'Most recent'}</option>
            <option value="rating">{isSpanish ? 'Mejor calificación' : 'Highest rated'}</option>
          </select>
        </div>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-700 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900">
              {isSpanish ? 'Reseña enviada exitosamente' : 'Review submitted successfully'}
            </h4>
            <p className="text-sm text-green-700 mt-1">
              {isSpanish 
                ? 'Tu reseña se ha publicado exitosamente.'
                : 'Your review has been published successfully.'}
            </p>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {isSpanish ? 'Escribe tu reseña' : 'Write your review'}
          </h3>
          
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isSpanish ? 'Calificación' : 'Rating'}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-8 h-8 ${
                      star <= formData.rating 
                        ? 'fill-green-500 text-green-500' 
                        : 'text-gray-300'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isSpanish ? 'Título' : 'Title'}
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={isSpanish ? 'Resume tu experiencia' : 'Summarize your experience'}
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isSpanish ? 'Tu reseña' : 'Your review'}
              </label>
              <textarea 
                required
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                placeholder={isSpanish ? 'Comparte tu experiencia...' : 'Share your experience...'}
              />
            </div>

            {/* Pros */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isSpanish ? 'Ventajas (separadas por comas)' : 'Pros (comma separated)'}
              </label>
              <input
                type="text"
                value={formData.pros}
                onChange={(e) => setFormData(prev => ({ ...prev, pros: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={isSpanish ? 'Ej: Retiros rápidos, Buen soporte' : 'Ex: Fast withdrawals, Good support'}
              />
            </div>

            {/* Cons */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isSpanish ? 'Desventajas (separadas por comas)' : 'Cons (comma separated)'}
              </label>
              <input
                type="text"
                value={formData.cons}
                onChange={(e) => setFormData(prev => ({ ...prev, cons: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={isSpanish ? 'Ej: Verificación lenta' : 'Ex: Slow verification'}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSpanish ? 'Enviar reseña' : 'Submit review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {isSpanish ? 'Cancelar' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {sortedReviews.length > 0 ? (
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
                      <h4 className="font-semibold text-gray-900">{review.user_name}</h4>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-700 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          {isSpanish ? 'Verificado' : 'Verified'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'fill-green-500 text-green-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(review.created_at).toLocaleDateString(isSpanish ? 'es-MX' : 'en-US', {
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
                      <h6 className="text-sm font-semibold text-green-700 mb-2">
                        {isSpanish ? 'Ventajas' : 'Pros'}
                      </h6>
                      <ul className="space-y-1">
                        {review.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-green-700 mt-0.5">+</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {review.cons.length > 0 && (
                    <div>
                      <h6 className="text-sm font-semibold text-red-600 mb-2">
                        {isSpanish ? 'Desventajas' : 'Cons'}
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
              {review.review_responses && review.review_responses.length > 0 && (
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-green-700" />
                    <span className="font-semibold text-sm text-gray-900">
                      {isSpanish ? 'Respuesta del Casino' : 'Casino Response'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(review.review_responses[0].created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{review.review_responses[0].message}</p>
                </div>
              )}

              {/* Helpful Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t">
                <span className="text-sm text-gray-600 mr-2">
                  {isSpanish ? '¿Te resultó útil?' : 'Was this helpful?'}
                </span>
                <button
                  onClick={() => handleVote(review.id, 'helpful')}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.helpful}</span>
                </button>
                <button
                  onClick={() => handleVote(review.id, 'not_helpful')}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">{review.not_helpful}</span>
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === i + 1
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedRating 
              ? (isSpanish ? `No hay reseñas de ${selectedRating} estrellas` : `No ${selectedRating}-star reviews`)
              : (isSpanish ? 'Aún no hay reseñas' : 'No reviews yet')}
          </h3>
          <p className="text-gray-600 mb-6">
            {isSpanish 
              ? `Sé el primero en compartir tu experiencia con ${casinoName}`
              : `Be the first to share your experience with ${casinoName}`}
          </p>
          <button
            onClick={() => {
              if (session) {
                setShowReviewForm(true);
              } else {
                router.push(`/${locale}/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
              }
            }}
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition-colors"
          >
            {isSpanish ? 'Escribir la primera reseña' : 'Write the first review'}
          </button>
        </div>
      )}
    </div>
  );
}