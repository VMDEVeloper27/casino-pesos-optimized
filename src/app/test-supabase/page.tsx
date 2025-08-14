'use client'

import { useState, useEffect } from 'react'

export default function TestSupabasePage() {
  const [casinos, setCasinos] = useState<any[]>([])
  const [games, setGames] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        // Тест API казино
        const casinosRes = await fetch('/api/v2/casinos?limit=5')
        if (!casinosRes.ok) throw new Error('Failed to fetch casinos')
        const casinosData = await casinosRes.json()
        setCasinos(casinosData)

        // Тест API игр
        const gamesRes = await fetch('/api/v2/games?limit=5&type=slot')
        if (!gamesRes.ok) throw new Error('Failed to fetch games')
        const gamesData = await gamesRes.json()
        setGames(gamesData)

        // Тест API блога
        const blogRes = await fetch('/api/v2/blog?limit=3')
        if (!blogRes.ok) throw new Error('Failed to fetch blog posts')
        const blogData = await blogRes.json()
        setBlogPosts(blogData)

        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Testing Supabase API...</h1>
        <p>Loading data from Supabase...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error!</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">✅ Supabase API Test Page</h1>
      
      <div className="space-y-8">
        {/* Казино */}
        <section className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            📎 Casinos from Supabase ({casinos.length} loaded)
          </h2>
          <div className="grid gap-2">
            {casinos.map((casino) => (
              <div key={casino.id} className="bg-gray-100 p-3 rounded">
                <strong>{casino.name}</strong> - Rating: {casino.rating}/5
                {casino.is_featured && <span className="ml-2 text-green-600">⭐ Featured</span>}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">API: /api/v2/casinos</p>
        </section>

        {/* Игры */}
        <section className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            🎮 Games from Supabase ({games.length} loaded)
          </h2>
          <div className="grid gap-2">
            {games.map((game) => (
              <div key={game.id} className="bg-gray-100 p-3 rounded">
                <strong>{game.name}</strong> - Provider: {game.provider || 'Unknown'}
                {game.is_featured && <span className="ml-2 text-green-600">⭐ Featured</span>}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">API: /api/v2/games</p>
        </section>

        {/* Блог */}
        <section className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            📝 Blog Posts from Supabase ({blogPosts.length} loaded)
          </h2>
          <div className="grid gap-2">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-gray-100 p-3 rounded">
                <strong>{post.title}</strong>
                <p className="text-sm text-gray-600">Category: {post.category}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">API: /api/v2/blog</p>
        </section>

        {/* Статус */}
        <section className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-green-800">
            🚀 Status: All APIs Working!
          </h2>
          <p className="text-green-700">
            New Supabase APIs are ready. Old JSON-based endpoints still work at /api/casinos
          </p>
        </section>
      </div>
    </div>
  )
}