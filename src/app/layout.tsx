import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Root layout - locale routes will handle their own html/body tags
export default function RootLayout({ children }: Props) {
  return children;
}