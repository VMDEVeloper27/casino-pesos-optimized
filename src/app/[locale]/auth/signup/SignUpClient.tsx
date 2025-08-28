'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, Eye, EyeOff, Loader2, Check } from 'lucide-react';

interface SignUpClientProps {
  locale: string;
}

export default function SignUpClient({ locale }: SignUpClientProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const passwordRequirements = [
    { met: password.length >= 8, text: locale === 'es' ? 'Al menos 8 caracteres' : 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: locale === 'es' ? 'Una letra mayúscula' : 'One uppercase letter' },
    { met: /[a-z]/.test(password), text: locale === 'es' ? 'Una letra minúscula' : 'One lowercase letter' },
    { met: /[0-9]/.test(password), text: locale === 'es' ? 'Un número' : 'One number' },
  ];

  const texts = {
    es: {
      createAccount: 'Crea tu cuenta',
      joinDescription: 'Únete a CasinosPesos y empieza a ganar',
      fullName: 'Nombre completo',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      acceptTerms: 'Debes aceptar los términos y condiciones',
      passwordsDontMatch: 'Las contraseñas no coinciden',
      passwordRequirements: 'La contraseña no cumple con todos los requisitos',
      createAccountButton: 'Crear cuenta',
      creatingAccount: 'Creando cuenta...',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      signIn: 'Inicia sesión',
      terms: 'términos y condiciones',
      privacy: 'política de privacidad',
      acceptText: 'Acepto los',
      andText: 'y la',
      genericError: 'Ha ocurrido un error. Por favor, intenta de nuevo.',
      emailPlaceholder: 'tu@email.com',
      namePlaceholder: 'Juan Pérez',
      passwordsNoMatch: 'Las contraseñas no coinciden'
    },
    en: {
      createAccount: 'Create your account',
      joinDescription: 'Join CasinosPesos and start winning',
      fullName: 'Full name',
      email: 'Email address',
      password: 'Password',
      confirmPassword: 'Confirm password',
      acceptTerms: 'You must accept the terms and conditions',
      passwordsDontMatch: 'Passwords do not match',
      passwordRequirements: 'Password does not meet all requirements',
      createAccountButton: 'Create account',
      creatingAccount: 'Creating account...',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign in',
      terms: 'terms and conditions',
      privacy: 'privacy policy',
      acceptText: 'I accept the',
      andText: 'and the',
      genericError: 'An error occurred. Please try again.',
      emailPlaceholder: 'your@email.com',
      namePlaceholder: 'John Doe',
      passwordsNoMatch: 'Passwords do not match'
    }
  };

  const t = texts[locale as keyof typeof texts] || texts.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!acceptTerms) {
      setError(t.acceptTerms);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.passwordsDontMatch);
      return;
    }

    if (!passwordRequirements.every(req => req.met)) {
      setError(t.passwordRequirements);
      return;
    }

    setIsLoading(true);

    try {
      // Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || (locale === 'es' ? 'Error al crear la cuenta' : 'Error creating account'));
        return;
      }

      // Auto sign in after successful registration
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push(`/${locale}/dashboard`);
        router.refresh();
      }
    } catch (error) {
      setError(t.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t.createAccount}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t.joinDescription}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.fullName}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder={t.namePlaceholder}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.email}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder={t.emailPlaceholder}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.password}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className={`h-4 w-4 ${req.met ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{t.passwordsNoMatch}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5"
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
                {t.acceptText}{' '}
                <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium">
                  {t.terms}
                </Link>{' '}
                {t.andText}{' '}
                <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                  {t.privacy}
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !acceptTerms}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isLoading ? t.creatingAccount : t.createAccountButton}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  {t.creatingAccount}
                </>
              ) : (
                t.createAccountButton
              )}
            </button>

          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              {t.alreadyHaveAccount}{' '}
              <Link href={`/${locale}/auth/signin`} className="font-medium text-green-600 hover:text-green-700">
                {t.signIn}
              </Link>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}