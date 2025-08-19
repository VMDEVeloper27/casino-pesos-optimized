'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Calendar,
  User,
  Tag,
  MoreVertical,
  Send,
  Archive,
  FileText
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  views: number;
  likes: number;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, statusFilter, categoryFilter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Try admin API first
      try {
        const response = await fetch('/api/admin/blog');
        if (response.ok) {
          const data = await response.json();
          // Ensure posts is always an array
          const postsArray = Array.isArray(data.posts) 
            ? data.posts 
            : data.posts 
              ? [data.posts]
              : [];
          setPosts(postsArray);
          setLoading(false);
          return;
        }
      } catch (adminError) {
        console.log('Admin API failed, trying public API');
      }
      
      // Fallback to public API
      const fallbackResponse = await fetch('/api/public/blog?limit=100');
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        // Ensure posts is always an array
        const postsArray = Array.isArray(fallbackData.posts) 
          ? fallbackData.posts 
          : fallbackData.posts 
            ? [fallbackData.posts]
            : [];
        setPosts(postsArray);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    if (!Array.isArray(posts)) {
      setFilteredPosts([]);
      return;
    }
    
    let filtered = [...posts];
    
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }
    
    setFilteredPosts(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return;
    
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id));
        alert('Post eliminado exitosamente');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error al eliminar el post');
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blog/${id}/publish`, {
        method: 'POST'
      });
      
      if (response.ok) {
        fetchPosts();
        alert('Post publicado exitosamente. Se enviará notificación a los suscriptores.');
      }
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Error al publicar el post');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blog/${id}/archive`, {
        method: 'POST'
      });
      
      if (response.ok) {
        fetchPosts();
        alert('Post archivado exitosamente');
      }
    } catch (error) {
      console.error('Error archiving post:', error);
      alert('Error al archivar el post');
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedPosts.length) return;
    if (!confirm(`¿Eliminar ${selectedPosts.length} posts seleccionados?`)) return;
    
    try {
      await Promise.all(
        selectedPosts.map(id =>
          fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
        )
      );
      
      fetchPosts();
      setSelectedPosts([]);
      alert('Posts eliminados exitosamente');
    } catch (error) {
      console.error('Error deleting posts:', error);
      alert('Error al eliminar los posts');
    }
  };

  const categories = ['Noticias', 'Guías', 'Bonos', 'Juegos', 'Legal'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Publicado</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Borrador</span>;
      case 'archived':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Archivado</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">Gestiona todos los artículos del blog</p>
        </div>
        <Link
          href="/es/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Todos los estados</option>
            <option value="published">Publicados</option>
            <option value="draft">Borradores</option>
            <option value="archived">Archivados</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Bulk Actions */}
          {selectedPosts.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Eliminar ({selectedPosts.length})
            </button>
          )}
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron posts</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedPosts.length === filteredPosts.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPosts(filteredPosts.map(p => p.id));
                      } else {
                        setSelectedPosts([]);
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estadísticas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPosts([...selectedPosts, post.id]);
                        } else {
                          setSelectedPosts(selectedPosts.filter(id => id !== post.id));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                        {post.excerpt}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          ❤️ {post.likes || 0}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.published_at).toLocaleDateString('es-ES')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setShowActions(showActions === post.id ? null : post.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                      
                      {showActions === post.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <Link
                            href={`/es/admin/blog/${post.id}/edit`}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </Link>
                          <Link
                            href={`/es/blog/${post.slug}`}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                          >
                            <Eye className="w-4 h-4" />
                            Ver
                          </Link>
                          {post.status === 'draft' && (
                            <button
                              onClick={() => handlePublish(post.id)}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-green-600 w-full text-left"
                            >
                              <Send className="w-4 h-4" />
                              Publicar
                            </button>
                          )}
                          {post.status === 'published' && (
                            <button
                              onClick={() => handleArchive(post.id)}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-yellow-600 w-full text-left"
                            >
                              <Archive className="w-4 h-4" />
                              Archivar
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-red-600 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}