'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Archive,
  Globe,
  Calendar,
  RefreshCw
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'article' | 'review' | 'guide';
  status: 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';
  author: string;
  lastModified: string;
  publishedAt?: string;
  locale: string;
  slug?: string;
  content?: string;
  metaDescription?: string;
  category?: string;
  tags?: string[];
}

export default function ContentManagement() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: 'all',
    type: 'all',
    locale: 'all',
    search: ''
  });
  
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  useEffect(() => {
    fetchContent();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [content, filter]);
  
  const fetchContent = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.type !== 'all') params.append('type', filter.type);
      if (filter.status !== 'all') params.append('status', filter.status);
      if (filter.locale !== 'all') params.append('locale', filter.locale);
      
      const response = await fetch(`/api/admin/content?${params}`);
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...content];
    
    // Apply search filter
    if (filter.search) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.slug?.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.author.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filter.type !== 'all') {
      filtered = filtered.filter(item => item.type === filter.type);
    }
    
    // Apply status filter
    if (filter.status !== 'all') {
      filtered = filtered.filter(item => item.status === filter.status);
    }
    
    // Apply locale filter
    if (filter.locale !== 'all') {
      filtered = filtered.filter(item => item.locale === filter.locale);
    }
    
    setFilteredContent(filtered);
  };
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    
    try {
      const response = await fetch(`/api/admin/content/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchContent();
        alert('Content deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content');
    }
  };
  
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus,
          publishedAt: newStatus === 'published' ? new Date().toISOString() : undefined
        })
      });
      
      if (response.ok) {
        await fetchContent();
      }
    } catch (error) {
      console.error('Error updating content status:', error);
    }
  };
  
  const handleBulkAction = async (action: string) => {
    if (selectedItems.length === 0) {
      alert('Please select items first');
      return;
    }
    
    if (action === 'delete') {
      if (!confirm(`Delete ${selectedItems.length} items?`)) return;
      
      for (const id of selectedItems) {
        await handleDelete(id);
      }
      setSelectedItems([]);
    } else if (action === 'publish' || action === 'archive') {
      for (const id of selectedItems) {
        await handleStatusChange(id, action === 'publish' ? 'published' : 'archived');
      }
      setSelectedItems([]);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Published
        </span>;
      case 'draft':
        return <span className="px-2 py-1 bg-neutral-500/20 text-neutral-400 rounded-full text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Draft
        </span>;
      case 'pending_review':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Pending
        </span>;
      case 'approved':
        return <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full text-xs flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Approved
        </span>;
      case 'archived':
        return <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded-full text-xs flex items-center gap-1">
          <Archive className="w-3 h-3" />
          Archived
        </span>;
      default:
        return null;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return '📄';
      case 'article': return '📰';
      case 'review': return '⭐';
      case 'guide': return '📖';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading content...</div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Content Management</h1>
            <p className="text-neutral-400">Manage all content across your site</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchContent}
              className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <Link
              href="/admin/content/new"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Content
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="text-2xl font-bold text-white">{content.length}</div>
          <div className="text-sm text-neutral-400">Total Items</div>
        </div>
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="text-2xl font-bold text-white">
            {content.filter(i => i.status === 'published').length}
          </div>
          <div className="text-sm text-neutral-400">Published</div>
        </div>
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="text-2xl font-bold text-white">
            {content.filter(i => i.status === 'draft').length}
          </div>
          <div className="text-sm text-neutral-400">Drafts</div>
        </div>
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="text-2xl font-bold text-white">
            {content.filter(i => i.status === 'pending_review').length}
          </div>
          <div className="text-sm text-neutral-400">Pending Review</div>
        </div>
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="text-2xl font-bold text-white">
            {content.filter(i => i.locale === 'es').length}
          </div>
          <div className="text-sm text-neutral-400">Spanish</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 rounded-xl p-4 mb-6 border border-neutral-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary"
            />
          </div>
          
          <select
            value={filter.status}
            onChange={(e) => setFilter({...filter, status: e.target.value})}
            className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="pending_review">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="archived">Archived</option>
          </select>
          
          <select
            value={filter.type}
            onChange={(e) => setFilter({...filter, type: e.target.value})}
            className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Types</option>
            <option value="page">Pages</option>
            <option value="article">Articles</option>
            <option value="review">Reviews</option>
            <option value="guide">Guides</option>
          </select>
          
          <select
            value={filter.locale}
            onChange={(e) => setFilter({...filter, locale: e.target.value})}
            className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Languages</option>
            <option value="es">Spanish</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-primary/20 border border-primary/30 rounded-lg p-4 mb-6 flex items-center justify-between">
          <span className="text-white">
            {selectedItems.length} items selected
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => handleBulkAction('publish')}
              className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg transition-colors"
            >
              Publish
            </button>
            <button 
              onClick={() => handleBulkAction('archive')}
              className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 rounded-lg transition-colors"
            >
              Archive
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Content Table */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredContent.length && filteredContent.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredContent.map(i => i.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    className="rounded border-neutral-600"
                  />
                </th>
                <th className="text-left p-4 text-neutral-400 font-medium">Content</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Type</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Status</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Author</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Locale</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Modified</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map((item) => (
                <tr key={item.id} className="border-b border-neutral-700 hover:bg-neutral-700/50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, item.id]);
                        } else {
                          setSelectedItems(selectedItems.filter(id => id !== item.id));
                        }
                      }}
                      className="rounded border-neutral-600"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      <div>
                        <div className="text-white font-medium">{item.title}</div>
                        <div className="text-neutral-400 text-sm">{item.slug || 'No slug'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-neutral-300 capitalize">{item.type}</span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="p-4">
                    <span className="text-neutral-300 text-sm">{item.author}</span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-neutral-300">
                      <Globe className="w-3 h-3" />
                      {item.locale.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-neutral-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.lastModified).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/content/${item.id}/edit`}
                        className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-white" />
                      </Link>
                      <button className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-white" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">No content found</p>
        </div>
      )}
    </div>
  );
}