'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  const getErrorMessage = () => {
    switch (error) {
      case 'Configuration':
        return 'Server configuration error. Please try again later.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.';
      case 'Verification':
        return 'Verification error. Please try again.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-700 mb-6">{getErrorMessage()}</p>
        <div className="space-y-2">
          <Link
            href="/es/auth/signin"
            className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Try Sign In Again
          </Link>
          <Link
            href="/"
            className="block w-full text-center bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
}