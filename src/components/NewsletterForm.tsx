'use client';
// @ts-nocheck

import { useState, useEffect } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterFormProps {
  locale?: string;
}

export default function NewsletterForm({ locale = 'es' }: NewsletterFormProps) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isSpanish = locale === 'es';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.data?.message || (isSpanish ? '¡Suscripción exitosa!' : 'Successfully subscribed!'));
        setEmail('');
        setFirstName('');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || (isSpanish ? 'Error al suscribirse' : 'Failed to subscribe'));
      }
    } catch (error) {
      setStatus('error');
      setMessage(isSpanish ? 'Error de conexión' : 'Connection error');
    }
  };

  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-lg animate-pulse">
        <div className="h-8 bg-green-500/30 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-green-500/20 rounded w-full mb-2"></div>
        <div className="h-10 bg-green-500/20 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 md:p-6 shadow-lg max-w-full overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Mail className="w-5 h-5 flex-shrink-0" />
          <span className="break-words">{isSpanish ? 'Suscríbete a nuestro Newsletter' : 'Subscribe to our Newsletter'}</span>
        </h3>
        <p className="text-green-100 text-xs md:text-sm">
          {isSpanish 
            ? 'Recibe los mejores bonos y promociones exclusivas directamente en tu correo'
            : 'Get the best bonuses and exclusive promotions delivered to your inbox'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <input
            type="text"
            placeholder={isSpanish ? 'Nombre (opcional)' : 'Name (optional)'}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full lg:w-auto lg:flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-green-200 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm md:text-base"
          />
          <input
            type="email"
            placeholder={isSpanish ? 'Tu email' : 'Your email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full lg:w-auto lg:flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-green-200 border border-green-500/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm md:text-base"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full lg:w-auto px-4 md:px-6 py-2.5 md:py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base whitespace-nowrap shadow-md hover:shadow-lg"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
            ) : (
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
            )}
            <span>{isSpanish ? 'Suscribir' : 'Subscribe'}</span>
          </button>
        </div>

        {/* Status messages */}
        {status === 'success' && (
          <div className="flex items-center gap-2 text-white bg-green-500/20 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs md:text-sm break-words">{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-white bg-red-500/20 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs md:text-sm break-words">{message}</span>
          </div>
        )}

        <p className="text-[10px] md:text-xs text-green-100 px-1">
          {isSpanish 
            ? 'Al suscribirte aceptas recibir emails promocionales. Puedes cancelar en cualquier momento.'
            : 'By subscribing you agree to receive promotional emails. You can unsubscribe anytime.'}
        </p>
      </form>
    </div>
  );
}