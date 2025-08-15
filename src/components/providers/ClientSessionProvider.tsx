'use client';

import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

export default function ClientSessionProvider({ children }: Props) {
  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      // Disable automatic session fetching on mount
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  );
}