'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Calendar,
  User,
  Tag,
  TrendingUp,
  Heart,
  BarChart,
  Archive,
  CheckCircle,
  Clock
} from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  likes: number;
  status: 'draft' | 'published' | 'archived';
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, filterStatus, filterCategory]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/blog/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(post => post.status === filterStatus);
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(post => post.category === filterCategory);
    }

    setFilteredPosts(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'draft': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'archived': return 'bg-neutral-500/20 text-neutral-500 border-neutral-500/30';
      default: return 'bg-neutral-500/20 text-neutral-500 border-neutral-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-3 h-3" />;
      case 'draft': return <Clock className="w-3 h-3" />;
      case 'archived': return <Archive className="w-3 h-3" />;
      default: return null;
    }
  };

  const categories = stats?.categories || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Blog Management</h1>
            <p className="text-neutral-400">Create and manage blog posts</p>
          </div>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-xs text-neutral-400">Total</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-neutral-400">Total Posts</div>
          </div>

          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-xs text-green-400">Published</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.published}</div>
            <div className="text-sm text-neutral-400">Live Posts</div>
          </div>

          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-5 h-5 text-blue-500" />
              <span className="text-xs text-neutral-400">Views</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalViews?.toLocaleString()}</div>
            <div className="text-sm text-neutral-400">Total Views</div>
          </div>

          <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-xs text-neutral-400">Likes</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalLikes}</div>
            <div className="text-sm text-neutral-400">Total Likes</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-neutral-800 rounded-xl p-4 mb-6 border border-neutral-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Categories</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="text-left p-4 text-neutral-400 font-medium">Post</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Author</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Category</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Stats</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Status</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b border-neutral-700 hover:bg-neutral-700/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-12 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-neutral-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate">{post.title}</div>
                        <div className="text-sm text-neutral-400 line-clamp-2">{post.excerpt}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-neutral-500" />
                          <span className="text-xs text-neutral-500">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-400" />
                      <div>
                        <div className="text-white">{post.author}</div>
                        <div className="text-xs text-neutral-400">{post.authorRole}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-white">{post.category}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-700 rounded text-xs text-neutral-300">
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-neutral-500">+{post.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="w-3 h-3 text-neutral-400" />
                        <span className="text-white">{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Heart className="w-3 h-3 text-neutral-400" />
                        <span className="text-white">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span className="text-white">{post.readTime} min</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(post.status)}`}>
                      {getStatusIcon(post.status)}
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg transition-colors"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-primary" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPosts.length === 0 && (
            <div className="p-8 text-center text-neutral-400">
              No blog posts found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}