'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthStatus() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    // Only check auth on protected pages
    const protectedPages = ['/dashboard', '/admin', '/profile'];
    const shouldCheckAuth = protectedPages.some(page => pathname.includes(page));
    
    if (shouldCheckAuth) {
      setLoading(true);
      fetch('/api/auth/session')
        .then(res => res.json())
        .then(data => {
          if (data?.user) {
            setUser(data.user);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [pathname]);

  if (loading) return null;
  
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">{user.email}</span>
        <Link href="/dashboard" className="text-sm hover:underline">
          Dashboard
        </Link>
        <button
          onClick={() => {
            fetch('/api/auth/signout', { method: 'POST' })
              .then(() => {
                setUser(null);
                window.location.href = '/';
              });
          }}
          className="text-sm hover:underline"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/es/auth/signin" className="text-sm hover:underline">
        Login
      </Link>
      <Link href="/es/auth/signup" className="text-sm hover:underline">
        Register
      </Link>
    </div>
  );
}