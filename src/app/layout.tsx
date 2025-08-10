import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Since [locale]/layout.tsx provides html and body tags, 
// the root layout should only return children
export default function RootLayout({ children }: Props) {
  return children;
}