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
  Gamepad2,
  TrendingUp,
  Users,
  Dices,
  Zap,
  Sparkles,
  Trophy,
  CreditCard,
  Image as ImageIcon
} from 'lucide-react';

interface Game {
  id: string;
  name: string;
  slug: string;
  provider: string;
  type: 'slot' | 'live' | 'table' | 'crash' | 'instant' | 'video-poker' | 'card' | 'jackpot';
  category?: string;
  rtp?: number;
  volatility?: 'low' | 'medium' | 'high' | 'very-high';
  maxWin?: number;
  popularity: number;
  playCount?: number;
  image: string;
  demoUrl?: string;
  embedUrl?: string;
  mobileOptimized?: boolean;
  availableAt: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isHot?: boolean;
}

const typeIcons: Record<string, React.ReactElement> = {
  slot: <Gamepad2 className="w-4 h-4" />,
  live: <Users className="w-4 h-4" />,
  table: <Dices className="w-4 h-4" />,
  crash: <Zap className="w-4 h-4" />,
  instant: <Sparkles className="w-4 h-4" />,
  'video-poker': <CreditCard className="w-4 h-4" />,
  card: <CreditCard className="w-4 h-4" />,
  jackpot: <Trophy className="w-4 h-4" />
};

export default function AdminGamesList() {
  const [games, setGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/admin/games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this game?')) return;
    
    try {
      const response = await fetch(`/api/admin/games/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setGames(games.filter(g => g.id !== id));
      }
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const handleImageUpload = async (gameId: string, file: File) => {
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
    
    setUploadingImage(gameId);
    
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('gameId', gameId);
      formData.append('type', 'game-image');
      
      // Upload to media API
      const uploadResponse = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }
      
      const { url } = await uploadResponse.json();
      
      // Update game with new image URL (use v2 API)
      const updateResponse = await fetch(`/api/v2/games/${gameId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: url }),
      });
      
      if (updateResponse.ok) {
        // Update local state
        setGames(games.map(g => 
          g.id === gameId ? { ...g, image: url } : g
        ));
        alert('Image uploaded successfully');
      } else {
        throw new Error('Failed to update game');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(null);
      // Reset file input
      if (fileInputRefs.current[gameId]) {
        fileInputRefs.current[gameId]!.value = '';
      }
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(games, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `games-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getUniqueProviders = () => {
    return [...new Set(games.map(game => game.provider))].sort();
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || game.type === filterType;
    const matchesProvider = filterProvider === 'all' || game.provider === filterProvider;
    return matchesSearch && matchesType && matchesProvider;
  });

  const getVolatilityColor = (volatility?: string) => {
    switch(volatility) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'very-high': return 'text-red-400';
      default: return 'text-neutral-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading games...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Games</h1>
          <p className="text-neutral-400">Total: {games.length} games</p>
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
            href="/admin/games/import"
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import
          </Link>
          
          <Link
            href="/admin/games/new"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Game
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
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="slot">Slots</option>
              <option value="live">Live Casino</option>
              <option value="table">Table Games</option>
              <option value="crash">Crash Games</option>
              <option value="instant">Instant Games</option>
              <option value="video-poker">Video Poker</option>
              <option value="card">Card Games</option>
              <option value="jackpot">Jackpot</option>
            </select>
            
            <select
              value={filterProvider}
              onChange={(e) => setFilterProvider(e.target.value)}
              className="bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Providers</option>
              {getUniqueProviders().map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="text-left p-4 text-neutral-400 font-medium">Game</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Type</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Provider</th>
                <th className="text-left p-4 text-neutral-400 font-medium">RTP</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Volatility</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Popularity</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Status</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((game) => (
                <tr key={game.id} className="border-b border-neutral-700 hover:bg-neutral-700/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                          {game.image && game.image.startsWith('http') ? (
                            <img 
                              src={game.image} 
                              alt={game.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<span class="text-xs font-bold text-white">${game.name.substring(0, 3).toUpperCase()}</span>`;
                                }
                              }}
                            />
                          ) : (
                            <Gamepad2 className="w-6 h-6 text-neutral-400" />
                          )}
                        </div>
                        
                        {/* Upload overlay */}
                        <div className="absolute inset-0 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label 
                            htmlFor={`image-upload-${game.id}`}
                            className="cursor-pointer"
                            title="Upload Image"
                          >
                            {uploadingImage === game.id ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-white" />
                            )}
                          </label>
                          <input
                            ref={(el) => {
                              if (el) {
                                fileInputRefs.current[game.id] = el;
                              }
                            }}
                            type="file"
                            id={`image-upload-${game.id}`}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(game.id, file);
                              }
                            }}
                            disabled={uploadingImage === game.id}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{game.name}</div>
                        <div className="text-xs text-slate-400">ID: {game.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {typeIcons[game.type]}
                      <span className="text-white capitalize">{game.type}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white">{game.provider}</td>
                  <td className="p-4 text-white">{game.rtp ? `${game.rtp}%` : '-'}</td>
                  <td className="p-4">
                    <span className={getVolatilityColor(game.volatility)}>
                      {game.volatility ? game.volatility.toUpperCase() : '-'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-white">{game.popularity}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {game.isNew && (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-blue-400/20 text-blue-400">
                          NEW
                        </span>
                      )}
                      {game.isHot && (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-red-400/20 text-red-400">
                          HOT
                        </span>
                      )}
                      {game.isFeatured && (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-purple-400/20 text-purple-400">
                          FEATURED
                        </span>
                      )}
                      {game.demoUrl || game.embedUrl ? (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-green-400/20 text-green-400">
                          DEMO
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/juegos/${game.slug}`}
                        target="_blank"
                        className="p-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg transition-colors"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </Link>
                      <Link
                        href={`/admin/games/${game.id}/edit`}
                        className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-primary" />
                      </Link>
                      <button
                        onClick={() => handleDelete(game.id)}
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
          
          {filteredGames.length === 0 && (
            <div className="p-8 text-center text-neutral-400">
              No games found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}