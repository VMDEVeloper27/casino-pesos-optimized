'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Eye,
  FileText,
  Globe,
  Clock,
  Tag,
  AlertCircle
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'article' | 'review' | 'guide';
  status: 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';
  author: string;
  content: string;
  metaDescription: string;
  slug: string;
  locale: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  publishedAt?: string;
  lastModified: string;
}

export default function EditContentPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'article' as const,
    status: 'draft' as const,
    content: '',
    metaDescription: '',
    slug: '',
    locale: 'es',
    category: '',
    tags: '',
    featuredImage: ''
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/content/${resolvedParams.id}`);
      
      if (!response.ok) {
        throw new Error('Content not found');
      }
      
      const data = await response.json();
      setContent(data);
      setFormData({
        title: data.title || '',
        type: data.type || 'article',
        status: data.status || 'draft',
        content: data.content || '',
        metaDescription: data.metaDescription || '',
        slug: data.slug || '',
        locale: data.locale || 'es',
        category: data.category || '',
        tags: data.tags?.join(', ') || '',
        featuredImage: data.featuredImage || ''
      });
    } catch (error) {
      console.error('Error fetching content:', error);
      alert('Ошибка загрузки контента');
      router.push('/admin/content');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/content/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
          lastModified: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert('Контент успешно обновлен!');
        router.push('/admin/content');
      } else {
        throw new Error('Failed to update content');
      }
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Ошибка при сохранении контента');
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[áàäâ]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöô]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Загрузка контента...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к списку
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Редактировать контент
            </h1>
            <p className="text-neutral-400">ID: {resolvedParams.id}</p>
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => window.open(`/${formData.locale}/${formData.type}/${formData.slug}`, '_blank')}
              className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Предпросмотр
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Основная информация
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Заголовок *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Slug (URL)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, slug: generateSlug(formData.title) })}
                  className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors"
                >
                  Генерировать
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Тип контента
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
              >
                <option value="page">Страница</option>
                <option value="article">Статья</option>
                <option value="review">Обзор</option>
                <option value="guide">Руководство</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Статус
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
              >
                <option value="draft">Черновик</option>
                <option value="pending_review">На проверке</option>
                <option value="approved">Одобрено</option>
                <option value="published">Опубликовано</option>
                <option value="archived">В архиве</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Язык
              </label>
              <select
                value={formData.locale}
                onChange={(e) => setFormData({ ...formData, locale: e.target.value })}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Категория
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                placeholder="Например: Bonos, Juegos, Guías"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-xl font-bold text-white mb-6">
            Содержание
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Основной контент *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                rows={15}
                required
                placeholder="Напишите или вставьте контент здесь... Поддерживается Markdown"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Мета-описание (SEO)
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                rows={3}
                maxLength={160}
                placeholder="Краткое описание для поисковых систем (до 160 символов)"
              />
              <p className="text-sm text-neutral-400 mt-1">
                {formData.metaDescription.length}/160 символов
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Теги
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                placeholder="Разделите теги запятыми: casino, bonos, méxico"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Изображение превью
              </label>
              <input
                type="text"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                placeholder="URL изображения"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link
            href="/admin/content"
            className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
          >
            Отмена
          </Link>
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-black rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}