import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Root layout delegates HTML structure to locale-specific layout
export default function RootLayout({ children }: Props) {
  return children;
}