'use client';

import { useState, useEffect, useRef, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  X, 
  Eye,
  Send,
  Archive,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Heading2,
  Code,
  Quote,
  Image as ImageIcon
} from 'lucide-react';

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  author_role: string;
  category: string;
  tags: string[];
  featured_image: string;
  status: 'draft' | 'published' | 'archived';
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  read_time: number;
}

export default function EditBlogPost({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [post, setPost] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    author_role: '',
    category: 'Noticias',
    tags: [],
    featured_image: '',
    status: 'draft',
    seo_title: '',
    seo_description: '',
    seo_keywords: [],
    read_time: 5
  });
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  const fetchPost = useCallback(async () => {
    try {
      // Try admin API first
      let response = await fetch(`/api/admin/blog/${resolvedParams.id}`);
      let data;
      
      if (response.ok) {
        data = await response.json();
      } else {
        // Fallback to public API for existing posts
        const publicResponse = await fetch(`/api/public/blog?limit=100`);
        if (publicResponse.ok) {
          const allPosts = await publicResponse.json();
          data = allPosts.posts.find((p: any) => p.id === resolvedParams.id);
        }
      }
      
      if (data) {
        setPost({
          ...data,
          tags: data.tags || [],
          seo_keywords: data.seo_keywords || data.seoKeywords || [],
          author_role: data.author_role || data.authorRole || '',
          featured_image: data.featured_image || data.featuredImage || '',
          read_time: data.read_time || data.readTime || 5,
          seo_title: data.seo_title || data.seoTitle || data.title,
          seo_description: data.seo_description || data.seoDescription || data.excerpt,
        });
        setImagePreview(data.featured_image || data.featuredImage || '');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    if (resolvedParams.id !== 'new') {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [resolvedParams.id, fetchPost]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB');
      return;
    }

    // Convert to base64 for preview (in production, upload to storage)
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setPost({ ...post, featured_image: base64String });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview('');
    setPost({ ...post, featured_image: '' });
  };

  const handleSave = async (status?: 'draft' | 'published' | 'archived') => {
    setSaving(true);
    
    try {
      const postData = {
        ...post,
        status: status || post.status,
        slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      };

      const url = resolvedParams.id === 'new' 
        ? '/api/admin/blog'
        : `/api/admin/blog/${resolvedParams.id}`;
      
      const method = resolvedParams.id === 'new' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        if (status === 'published') {
          alert('Post publicado exitosamente. Se enviará notificación a los suscriptores.');
        } else {
          alert('Post guardado exitosamente');
        }
        router.push(`/${resolvedParams.locale}/admin/blog`);
      } else {
        throw new Error('Error al guardar el post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error al guardar el post');
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput && !post.tags.includes(tagInput)) {
      setPost({ ...post, tags: [...post.tags, tagInput] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setPost({ ...post, tags: post.tags.filter(t => t !== tag) });
  };

  const addKeyword = () => {
    if (keywordInput && !post.seo_keywords.includes(keywordInput)) {
      setPost({ ...post, seo_keywords: [...post.seo_keywords, keywordInput] });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setPost({ ...post, seo_keywords: post.seo_keywords.filter(k => k !== keyword) });
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = `${before}${selectedText}${after}`;
    
    const newValue = 
      textarea.value.substring(0, start) + 
      replacement + 
      textarea.value.substring(end);
    
    setPost({ ...post, content: newValue });
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const categories = ['Noticias', 'Guías', 'Bonos', 'Juegos', 'Legal'];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/${resolvedParams.locale}/admin/blog`}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {resolvedParams.id === 'new' ? 'Nuevo Blog Post' : 'Editar Blog Post'}
            </h1>
            <p className="text-gray-600 mt-1">
              {post.status === 'draft' && 'Borrador no publicado'}
              {post.status === 'published' && 'Publicado y visible'}
              {post.status === 'archived' && 'Archivado'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <Archive className="w-4 h-4 inline mr-2" />
            Guardar Borrador
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Send className="w-4 h-4 inline mr-2" />
            Publicar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Título del artículo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={post.slug}
                  onChange={(e) => setPost({ ...post, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="url-del-articulo"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Se generará automáticamente si se deja vacío
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Extracto *
                </label>
                <textarea
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Breve descripción del artículo"
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Imagen Destacada</h2>
            
            {imagePreview ? (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Click para subir imagen</p>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG o GIF. Máximo 5MB</p>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contenido</h2>
            
            {/* Markdown Toolbar */}
            <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
              <button
                onClick={() => insertMarkdown('**', '**')}
                className="p-2 hover:bg-white rounded"
                title="Negrita"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertMarkdown('*', '*')}
                className="p-2 hover:bg-white rounded"
                title="Cursiva"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertMarkdown('## ')}
                className="p-2 hover:bg-white rounded"
                title="Título"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertMarkdown('[', '](url)')}
                className="p-2 hover:bg-white rounded"
                title="Enlace"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertMarkdown('- ')}
                className="p-2 hover:bg-white rounded"
                title="Lista"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertMarkdown('1. ')}
                className="p-2 hover:bg-white rounded"
                title="Lista numerada"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertMarkdown('> ')}
                className="p-2 hover:bg-white rounded"
                title="Cita"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertMarkdown('`', '`')}
                className="p-2 hover:bg-white rounded"
                title="Código"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertMarkdown('![alt text](', ')')}
                className="p-2 hover:bg-white rounded"
                title="Imagen"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
            
            <textarea
              ref={contentRef}
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
              placeholder="Escribe el contenido en Markdown..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Meta Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadatos</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Autor
                </label>
                <input
                  type="text"
                  value={post.author}
                  onChange={(e) => setPost({ ...post, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nombre del autor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol del Autor
                </label>
                <input
                  type="text"
                  value={post.author_role}
                  onChange={(e) => setPost({ ...post, author_role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ej: Editor Principal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={post.category}
                  onChange={(e) => setPost({ ...post, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiempo de Lectura (min)
                </label>
                <input
                  type="number"
                  value={post.read_time}
                  onChange={(e) => setPost({ ...post, read_time: parseInt(e.target.value) || 5 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas</h2>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Añadir etiqueta"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Añadir
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título SEO
                </label>
                <input
                  type="text"
                  value={post.seo_title}
                  onChange={(e) => setPost({ ...post, seo_title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Título para buscadores"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción SEO
                </label>
                <textarea
                  value={post.seo_description}
                  onChange={(e) => setPost({ ...post, seo_description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Descripción para buscadores"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Palabras Clave
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Añadir palabra clave"
                  />
                  <button
                    onClick={addKeyword}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Añadir
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.seo_keywords.map(keyword => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}