'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  Upload, 
  Grid, 
  List, 
  Search, 
  Filter,
  X,
  Download,
  Eye,
  Trash2,
  Edit,
  FolderOpen,
  FileImage,
  FileText,
  File,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  uploadedBy: string;
  createdAt: string;
  directory?: string;
}

export default function MediaLibrary() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch real files from filesystem
  useEffect(() => {
    fetchFiles();
  }, []);
  
  const fetchFiles = async () => {
    try {
      setLoading(true);
      
      // Fetch from both buckets via our API
      const response = await fetch('/api/admin/media?type=all');
      if (response.ok) {
        const data = await response.json();
        
        // Transform the data to match MediaFile interface
        const transformedFiles: MediaFile[] = data.files.map((file: any, index: number) => ({
          id: file.name || `file-${index}`,
          filename: file.name,
          originalName: file.name,
          mimeType: file.name.endsWith('.svg') ? 'image/svg+xml' : 
                   file.name.endsWith('.webp') ? 'image/webp' :
                   file.name.endsWith('.png') ? 'image/png' : 
                   file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') ? 'image/jpeg' : 'image/unknown',
          size: file.size || 0,
          url: file.url,
          thumbnailUrl: file.url,
          uploadedBy: 'admin',
          createdAt: file.created || new Date().toISOString(),
          directory: file.bucket || 'unknown'
        }));
        
        setFiles(transformedFiles);
      } else {
        console.error('Failed to fetch files from Supabase Storage');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    
    for (const file of droppedFiles) {
      // Show upload progress
      setUploadProgress(0);
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        // Simulate upload progress
        for (let i = 0; i <= 90; i += 10) {
          setUploadProgress(i);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        // Upload to API
        const response = await fetch('/api/admin/media/files', {
          method: 'POST',
          body: formData,
        });
        
        setUploadProgress(100);
        
        if (response.ok) {
          const newFile = await response.json();
          setFiles(prev => [newFile, ...prev]);
        } else {
          console.error('Upload failed');
        }
        
        setUploadProgress(null);
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadProgress(null);
      }
    }
  }, []);

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) return;
    
    if (confirm(`Delete ${selectedFiles.length} file(s)?`)) {
      // In production, call delete API
      setFiles(prev => prev.filter(f => !selectedFiles.includes(f.id)));
      setSelectedFiles([]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <FileImage className="w-5 h-5" />;
    if (mimeType === 'application/pdf') return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const filteredFiles = files.filter(file =>
    file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Media Library</h1>
        <p className="text-neutral-400">Manage your images, documents, and other media files</p>
      </div>

      {/* Toolbar */}
      <div className="bg-neutral-800 rounded-xl p-4 mb-6 border border-neutral-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary"
              />
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex bg-neutral-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={fetchFiles}
              className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 text-neutral-400 hover:text-white ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3">
            {selectedFiles.length > 0 && (
              <>
                <button
                  onClick={handleDeleteSelected}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete ({selectedFiles.length})
                </button>
                <button
                  onClick={() => setSelectedFiles([])}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
                >
                  Clear Selection
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`mb-6 border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging 
            ? 'border-primary bg-primary/10' 
            : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
        <p className="text-white mb-2">Drop files here to upload</p>
        <p className="text-sm text-neutral-400 mb-4">or</p>
        <label className="inline-block">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={async (e) => {
              if (e.target.files) {
                const filesArray = Array.from(e.target.files);
                for (const file of filesArray) {
                  const formData = new FormData();
                  formData.append('file', file);
                  
                  try {
                    setUploadProgress(0);
                    
                    // Simulate progress
                    for (let i = 0; i <= 90; i += 10) {
                      setUploadProgress(i);
                      await new Promise(resolve => setTimeout(resolve, 50));
                    }
                    
                    const response = await fetch('/api/admin/media/files', {
                      method: 'POST',
                      body: formData,
                    });
                    
                    setUploadProgress(100);
                    
                    if (response.ok) {
                      const newFile = await response.json();
                      setFiles(prev => [newFile, ...prev]);
                    }
                    
                    setUploadProgress(null);
                  } catch (error) {
                    console.error('Upload failed:', error);
                    setUploadProgress(null);
                  }
                }
              }
            }}
          />
          <span className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg cursor-pointer transition-colors">
            Browse Files
          </span>
        </label>
        <p className="text-xs text-neutral-500 mt-4">
          Supported: JPG, PNG, GIF, WebP, PDF (Max 10MB)
        </p>
        
        {/* Upload Progress */}
        {uploadProgress !== null && (
          <div className="mt-4">
            <div className="w-full max-w-xs mx-auto bg-neutral-700 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-neutral-400 mt-2">Uploading... {uploadProgress}%</p>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
          <span className="ml-3 text-white">Loading media files...</span>
        </div>
      )}
      
      {/* Files Grid/List */}
      {!loading && viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => handleFileSelect(file.id)}
              className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                selectedFiles.includes(file.id)
                  ? 'border-primary bg-primary/10'
                  : 'border-neutral-700 hover:border-neutral-600 bg-neutral-800'
              }`}
            >
              {/* Thumbnail */}
              <div className="aspect-square bg-neutral-900 flex items-center justify-center">
                {file.mimeType.startsWith('image/') ? (
                  <img
                    src={file.thumbnailUrl || file.url}
                    alt={file.originalName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-neutral-400">
                    {getFileIcon(file.mimeType)}
                  </div>
                )}
                
                {/* Selection Indicator */}
                {selectedFiles.includes(file.id) && (
                  <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              {/* File Info */}
              <div className="p-2">
                <p className="text-xs text-white truncate">{file.originalName}</p>
                <p className="text-xs text-neutral-400">{formatFileSize(file.size)}</p>
              </div>
              
              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white/20 rounded hover:bg-white/30 transition-colors">
                  <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded hover:bg-white/30 transition-colors">
                  <Download className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="bg-neutral-800 rounded-xl border border-neutral-700">
          <table className="w-full">
            <thead className="border-b border-neutral-700">
              <tr>
                <th className="text-left p-4 text-neutral-400 font-medium">
                  <input
                    type="checkbox"
                    checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(filteredFiles.map(f => f.id));
                      } else {
                        setSelectedFiles([]);
                      }
                    }}
                    className="rounded border-neutral-600"
                  />
                </th>
                <th className="text-left p-4 text-neutral-400 font-medium">File</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Size</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Uploaded By</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Date</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id} className="border-b border-neutral-700 hover:bg-neutral-700/50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleFileSelect(file.id)}
                      className="rounded border-neutral-600"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-neutral-400">
                        {getFileIcon(file.mimeType)}
                      </div>
                      <div>
                        <p className="text-white">{file.originalName}</p>
                        {file.width && file.height && (
                          <p className="text-xs text-neutral-400">{file.width} × {file.height}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-400">{formatFileSize(file.size)}</td>
                  <td className="p-4 text-neutral-400">{file.uploadedBy}</td>
                  <td className="p-4 text-neutral-400">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-neutral-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-neutral-400 hover:text-white">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-neutral-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      
      {/* No files message */}
      {!loading && filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <FileImage className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">No media files found</p>
          <p className="text-sm text-neutral-500 mt-2">Upload some files to get started</p>
        </div>
      )}
    </div>
  );
}