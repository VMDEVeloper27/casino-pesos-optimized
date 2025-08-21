'use client';

import { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check,
  Folder,
  Search,
  Loader2
} from 'lucide-react';

interface ImageFile {
  name: string;
  url: string;
  size?: number;
  created?: string;
  bucket?: string;
}

interface ImageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  acceptedFormats?: string;
}

export default function ImageSelector({ 
  value, 
  onChange, 
  label = 'Image',
  placeholder = 'Select or upload an image',
  acceptedFormats = 'image/*'
}: ImageSelectorProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/media?type=all');
      if (response.ok) {
        const data = await response.json();
        setGalleryImages(data.files || []);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'image');

    try {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.url);
        setShowGallery(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const openGallery = () => {
    setShowGallery(true);
    if (galleryImages.length === 0) {
      loadGalleryImages();
    }
  };

  const selectFromGallery = (imageUrl: string) => {
    onChange(imageUrl);
    setShowGallery(false);
  };

  const filteredImages = galleryImages.filter(img => 
    img.url?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    img.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      
      <div className="relative">
        {value ? (
          <div className="relative w-full h-48 bg-neutral-800 rounded-lg overflow-hidden">
            <img 
              src={value} 
              alt="Selected" 
              className="w-full h-full object-contain p-2"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <div className="w-full h-48 bg-neutral-800 border-2 border-dashed border-neutral-600 rounded-lg flex flex-col items-center justify-center">
            <ImageIcon className="w-12 h-12 text-neutral-500 mb-2" />
            <p className="text-neutral-400 text-sm">{placeholder}</p>
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload New
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={openGallery}
            className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Folder className="w-4 h-4" />
            Media Gallery
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 rounded-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Media Gallery</h3>
                <button
                  onClick={() => setShowGallery(false)}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search images..."
                  className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : filteredImages.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
                  <p className="text-neutral-400">No images found</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => selectFromGallery(image.url)}
                      className="relative aspect-square bg-neutral-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all group"
                    >
                      <img 
                        src={image.url} 
                        alt={image.name || `Gallery image ${index + 1}`}
                        className="w-full h-full object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-700">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload New Image
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setShowGallery(false)}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}