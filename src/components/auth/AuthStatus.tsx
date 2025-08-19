'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'es';
  
  if (status === 'loading') return null;
  
  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">{session.user.email}</span>
        <Link href={`/${locale}/dashboard`} className="text-sm hover:underline">
          Dashboard
        </Link>
        <button
          onClick={() => {
            signOut({ callbackUrl: `/${locale}` });
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
      <Link href={`/${locale}/auth/signin`} className="text-sm hover:underline">
        Login
      </Link>
      <Link href={`/${locale}/auth/signup`} className="text-sm hover:underline">
        Register
      </Link>
    </div>
  );
}