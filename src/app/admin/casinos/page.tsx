'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  Filter,
  Star,
  Image as ImageIcon,
  Folder,
  X,
  Check,
  Loader2
} from 'lucide-react';

interface Casino {
  id: string;
  name: string;
  logo: string;
  rating: number;
  established: number;
  licenses?: string[];
  license?: string;
  // Bonus fields from database
  bonus_type?: string;
  bonus_amount?: number;
  bonus_percentage?: number;
  bonus_free_spins?: number;
  bonus_min_deposit?: number;
  bonus_wagering?: number;
  bonus_code?: string;
  // Games fields from database
  games_total?: number;
  games_slots?: number;
  games_live?: number;
  games_table?: number;
  // Legacy format support
  bonus?: {
    type: string;
    amount: number;
    percentage: number;
    freeSpins?: number;
    minDeposit: number;
    wageringRequirement: number;
    code?: string;
  } | string;
  games?: {
    total: number;
    slots: number;
    live: number;
    table: number;
  } | number;
  status: 'active' | 'inactive' | 'pending';
  lastModified?: string;
  updated_at?: string;
  created_at?: string;
  features?: string[];
  paymentMethods?: string[];
  payment_methods?: string[];
  currencies?: string[];
}

export default function AdminCasinosList() {
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState<string | null>(null);
  const [showLogoMenu, setShowLogoMenu] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedCasinoForGallery, setSelectedCasinoForGallery] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [gallerySearchQuery, setGallerySearchQuery] = useState('');
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    fetchCasinos();
  }, []);


  const fetchCasinos = async () => {
    try {
      const response = await fetch('/api/admin/casinos');
      const data = await response.json();
      setCasinos(data);
    } catch (error) {
      console.error('Error fetching casinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this casino?')) return;
    
    try {
      const response = await fetch(`/api/admin/casinos/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setCasinos(casinos.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting casino:', error);
    }
  };

  const loadGalleryImages = async () => {
    setGalleryLoading(true);
    try {
      const response = await fetch('/api/admin/media?type=all');
      if (response.ok) {
        const data = await response.json();
        setGalleryImages(data.files || []);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setGalleryLoading(false);
    }
  };

  const openGallery = (casinoId: string) => {
    setSelectedCasinoForGallery(casinoId);
    setShowGallery(true);
    setShowLogoMenu(null);
    if (galleryImages.length === 0) {
      loadGalleryImages();
    }
  };

  const selectFromGallery = async (imageUrl: string) => {
    if (!selectedCasinoForGallery) return;
    
    try {
      // Update casino with new logo URL
      const updateResponse = await fetch(`/api/admin/casinos/${selectedCasinoForGallery}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logo: imageUrl }),
      });
      
      if (updateResponse.ok) {
        // Update local state
        setCasinos(casinos.map(c => 
          c.id === selectedCasinoForGallery ? { ...c, logo: imageUrl } : c
        ));
        setShowGallery(false);
        setSelectedCasinoForGallery(null);
      } else {
        throw new Error('Failed to update casino');
      }
    } catch (error) {
      console.error('Error updating logo:', error);
      alert('Failed to update logo. Please try again.');
    }
  };

  const handleLogoUpload = async (casinoId: string, file: File) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    
    setUploadingLogo(casinoId);
    
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('casinoId', casinoId);
      formData.append('type', 'casino-logo');
      
      // Upload to media API
      const uploadResponse = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Upload failed:', errorData);
        throw new Error(errorData.error || 'Failed to upload image');
      }
      
      const { url } = await uploadResponse.json();
      
      // Update casino with new logo URL
      const updateResponse = await fetch(`/api/admin/casinos/${casinoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logo: url }),
      });
      
      if (updateResponse.ok) {
        // Update local state
        setCasinos(casinos.map(c => 
          c.id === casinoId ? { ...c, logo: url } : c
        ));
        alert('Logo uploaded successfully');
      } else {
        throw new Error('Failed to update casino');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Failed to upload logo. Please try again.');
    } finally {
      setUploadingLogo(null);
      // Reset file input
      if (fileInputRefs.current[casinoId]) {
        fileInputRefs.current[casinoId]!.value = '';
      }
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(casinos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `casinos-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const filteredCasinos = casinos.filter(casino => {
    const matchesSearch = casino.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || casino.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading casinos...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Casinos</h1>
          <p className="text-neutral-400">Total: {casinos.length} casinos</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          <Link
            href="/admin/casinos/import"
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import
          </Link>
          
          <Link
            href="/admin/casinos/new"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Casino
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 rounded-xl p-4 mb-6 border border-neutral-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search casinos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Casinos Table */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="text-left p-4 text-neutral-400 font-medium">Casino</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Rating</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Bonus</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Games</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Status</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCasinos.map((casino) => (
                <tr key={casino.id} className="border-b border-neutral-700 hover:bg-neutral-700/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center overflow-hidden">
                          {casino.logo ? (
                            <img 
                              src={casino.logo} 
                              alt={casino.name}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  const iconElement = document.createElement('div');
                                  iconElement.className = 'flex items-center justify-center w-full h-full';
                                  iconElement.innerHTML = '<svg class="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                                  parent.innerHTML = '';
                                  parent.appendChild(iconElement);
                                }
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-neutral-400" />
                          )}
                        </div>
                        
                        {/* Upload overlay with icons */}
                        <div className="absolute inset-0 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label 
                            htmlFor={`logo-upload-${casino.id}`}
                            className="cursor-pointer p-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                            title="Upload Image"
                          >
                            {uploadingLogo === casino.id ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-white" />
                            )}
                          </label>
                          <button
                            onClick={() => openGallery(casino.id)}
                            className="p-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                            title="Select from Gallery"
                          >
                            <Folder className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        
                        <input
                          ref={(el) => {
                            if (el) {
                              fileInputRefs.current[casino.id] = el;
                            }
                          }}
                          type="file"
                          id={`logo-upload-${casino.id}`}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleLogoUpload(casino.id, file);
                            }
                          }}
                          disabled={uploadingLogo === casino.id}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{casino.name}</div>
                        <div className="text-xs text-slate-400">ID: {casino.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-white">{casino.rating}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white text-sm">
                      {casino.bonus_percentage && casino.bonus_amount 
                        ? `${casino.bonus_percentage}% up to $${casino.bonus_amount.toLocaleString()} MXN` 
                        : typeof casino.bonus === 'string' 
                          ? casino.bonus 
                          : casino.bonus?.percentage 
                            ? `${casino.bonus.percentage}% up to $${casino.bonus.amount?.toLocaleString()} MXN`
                            : 'N/A'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">
                      {casino.games_total 
                        ? `${casino.games_total}+`
                        : typeof casino.games === 'number' 
                          ? `${casino.games}+` 
                          : casino.games?.total 
                            ? `${casino.games.total}+`
                            : 'N/A'}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      casino.status === 'active' 
                        ? 'bg-green-400/20 text-green-400'
                        : casino.status === 'inactive'
                        ? 'bg-red-400/20 text-red-400'
                        : 'bg-yellow-400/20 text-yellow-400'
                    }`}>
                      {casino.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/casinos/${casino.id}`}
                        target="_blank"
                        className="p-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg transition-colors"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </Link>
                      <Link
                        href={`/admin/casinos/${casino.id}/edit`}
                        className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-primary" />
                      </Link>
                      <button
                        onClick={() => handleDelete(casino.id)}
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
          
          {filteredCasinos.length === 0 && (
            <div className="p-8 text-center text-neutral-400">
              No casinos found
            </div>
          )}
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 rounded-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Select logo from gallery</h3>
                <button
                  onClick={() => {
                    setShowGallery(false);
                    setSelectedCasinoForGallery(null);
                  }}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={gallerySearchQuery}
                  onChange={(e) => setGallerySearchQuery(e.target.value)}
                  placeholder="Search images..."
                  className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {galleryLoading ? (
                <div className="flex items-center justify-center h-48">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {galleryImages
                    .filter(img => {
                      const searchLower = gallerySearchQuery.toLowerCase();
                      return (img.url?.toLowerCase().includes(searchLower) || 
                              img.name?.toLowerCase().includes(searchLower));
                    })
                    .map((image, index) => (
                      <button
                        key={index}
                        onClick={() => selectFromGallery(image.url)}
                        className="relative aspect-square bg-neutral-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all group"
                      >
                        <img 
                          src={image.url} 
                          alt={image.name || `Gallery image ${index + 1}`}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg class="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Check className="w-8 h-8 text-white" />
                        </div>
                      </button>
                    ))
                  }
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-700">
              <button
                onClick={() => {
                  setShowGallery(false);
                  setSelectedCasinoForGallery(null);
                }}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}