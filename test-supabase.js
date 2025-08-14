// Test Supabase connection
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

console.log('🔗 Connecting to Supabase...')
console.log('URL:', supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    // Test casinos table
    console.log('\n📊 Testing casinos table...')
    const { data: casinos, error: casinosError } = await supabase
      .from('casinos')
      .select('id, name, rating')
      .limit(3)
      .order('rating', { ascending: false })
    
    if (casinosError) throw casinosError
    console.log(`✅ Found ${casinos.length} casinos:`)
    casinos.forEach(c => console.log(`  - ${c.name} (Rating: ${c.rating})`))
    
    // Test games table
    console.log('\n🎮 Testing games table...')
    const { data: games, error: gamesError } = await supabase
      .from('games')
      .select('id, name')
      .limit(3)
    
    if (gamesError) throw gamesError
    console.log(`✅ Found ${games.length} games:`)
    games.forEach(g => console.log(`  - ${g.name}`))
    
    // Test blog_posts table
    console.log('\n📝 Testing blog_posts table...')
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('id, title')
      .limit(3)
    
    if (postsError) throw postsError
    console.log(`✅ Found ${posts.length} blog posts:`)
    posts.forEach(p => console.log(`  - ${p.title}`))
    
    console.log('\n✨ All tests passed! Supabase connection is working.')
    console.log('📌 The entire project is now using the database!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

testConnection()