import { redirect } from 'next/navigation';

export default function NewBlogPage({ params }: { params: Promise<{ locale: string }> }) {
  redirect(`/${params.then(p => p.locale)}/admin/blog/new/edit`);
  return null;
}