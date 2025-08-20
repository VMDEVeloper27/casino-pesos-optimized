'use client';

import { useState } from 'react';
import { initializeStorageBuckets } from '@/lib/supabase-storage';

export default function InitStoragePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInit = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      await initializeStorageBuckets();
      setMessage('Storage buckets initialized successfully! You can now upload images.');
    } catch (err) {
      setError('Failed to initialize storage buckets. Check console for details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Initialize Supabase Storage</h1>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <p className="mb-4 text-gray-600">
          This will create the necessary storage buckets in Supabase for casino logos and game images.
        </p>
        
        <p className="mb-6 text-sm text-gray-500">
          Buckets to be created:
          <ul className="list-disc ml-6 mt-2">
            <li>casino-logos (public, for casino images)</li>
            <li>game-images (public, for game screenshots)</li>
          </ul>
        </p>
        
        <button
          onClick={handleInit}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Initializing...' : 'Initialize Storage Buckets'}
        </button>
        
        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mt-8 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
          <ol className="list-decimal ml-6 text-sm text-blue-800">
            <li>Click the button above to create storage buckets</li>
            <li>Go to Supabase Dashboard → Storage to verify buckets were created</li>
            <li>Set bucket policies if needed (default is public read)</li>
            <li>Upload casino logos through the admin panel</li>
          </ol>
        </div>
      </div>
    </div>
  );
}