import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import FavoritesClientDB from './FavoritesClientDB';

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }

  return <FavoritesClientDB userEmail={session.user?.email || ''} />;
}