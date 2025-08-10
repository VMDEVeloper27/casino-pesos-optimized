import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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
  directory: string;
}

const getMimeType = (filename: string): string => {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.txt': 'text/plain',
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

async function scanDirectory(dirPath: string, baseUrl: string): Promise<MediaFile[]> {
  const files: MediaFile[] = [];
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory() && entry.name !== '.DS_Store') {
        // Recursively scan subdirectories
        const subFiles = await scanDirectory(fullPath, `${baseUrl}/${entry.name}`);
        files.push(...subFiles);
      } else if (entry.isFile() && !entry.name.startsWith('.')) {
        // Process file
        const stats = await fs.stat(fullPath);
        const relativePath = path.relative(path.join(process.cwd(), 'public'), fullPath);
        
        files.push({
          id: Buffer.from(relativePath).toString('base64'),
          filename: entry.name,
          originalName: entry.name,
          mimeType: getMimeType(entry.name),
          size: stats.size,
          url: `/${relativePath.replace(/\\/g, '/')}`,
          thumbnailUrl: getMimeType(entry.name).startsWith('image/') 
            ? `/${relativePath.replace(/\\/g, '/')}` 
            : undefined,
          uploadedBy: 'system',
          createdAt: stats.birthtime.toISOString(),
          directory: path.dirname(relativePath),
        });
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
  
  return files;
}

export async function GET(request: NextRequest) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const uploadsDir = path.join(publicDir, 'uploads');
    const imagesDir = path.join(publicDir, 'images');
    
    // Scan both uploads and images directories
    const uploadFiles = await scanDirectory(uploadsDir, '/uploads').catch(() => []);
    const imageFiles = await scanDirectory(imagesDir, '/images').catch(() => []);
    
    // Also get root public files (only specific image types)
    const rootFiles: MediaFile[] = [];
    try {
      const rootEntries = await fs.readdir(publicDir, { withFileTypes: true });
      for (const entry of rootEntries) {
        if (entry.isFile() && !entry.name.startsWith('.')) {
          const ext = path.extname(entry.name).toLowerCase();
          if (['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
            const fullPath = path.join(publicDir, entry.name);
            const stats = await fs.stat(fullPath);
            
            rootFiles.push({
              id: Buffer.from(entry.name).toString('base64'),
              filename: entry.name,
              originalName: entry.name,
              mimeType: getMimeType(entry.name),
              size: stats.size,
              url: `/${entry.name}`,
              thumbnailUrl: `/${entry.name}`,
              uploadedBy: 'system',
              createdAt: stats.birthtime.toISOString(),
              directory: '/',
            });
          }
        }
      }
    } catch (error) {
      console.error('Error reading root directory:', error);
    }
    
    // Combine all files and sort by creation date
    const allFiles = [...uploadFiles, ...imageFiles, ...rootFiles]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return NextResponse.json(allFiles);
  } catch (error) {
    console.error('Error fetching media files:', error);
    return NextResponse.json({ error: 'Failed to fetch media files' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    
    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.name);
    const nameWithoutExt = path.basename(file.name, ext);
    const filename = `${nameWithoutExt}-${timestamp}${ext}`;
    const filepath = path.join(uploadsDir, filename);
    
    // Save file
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filepath, buffer);
    
    // Get file stats
    const stats = await fs.stat(filepath);
    
    const mediaFile: MediaFile = {
      id: Buffer.from(filename).toString('base64'),
      filename: filename,
      originalName: file.name,
      mimeType: file.type || getMimeType(filename),
      size: stats.size,
      url: `/uploads/${filename}`,
      thumbnailUrl: file.type.startsWith('image/') ? `/uploads/${filename}` : undefined,
      uploadedBy: 'admin',
      createdAt: stats.birthtime.toISOString(),
      directory: 'uploads',
    };
    
    return NextResponse.json(mediaFile);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}