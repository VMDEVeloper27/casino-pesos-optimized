import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'

// Инициализация Supabase клиента
const supabaseUrl = 'https://zwtadapqdlthqafdsloi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dGFkYXBxZGx0aHFhZmRzbG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzE4NjIsImV4cCI6MjA3MDc0Nzg2Mn0.wZ-QRC2OTGOleS0gv-Xfa7t4okpJAFnXbXcW5uziyjU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function migrateData() {
  console.log('🚀 Starting migration to Supabase...')
  
  try {
    // 1. Создаем таблицы в Supabase (если не существуют)
    console.log('📋 Creating tables in Supabase...')
    
    // Создание таблицы casinos
    const { error: casinosTableError } = await supabase.rpc('create_casinos_table_if_not_exists')
    if (casinosTableError && !casinosTableError.message.includes('already exists')) {
      console.log('Creating casinos table manually...')
      // Таблица будет создана через Supabase Dashboard или SQL Editor
    }

    // 2. Migrate Casinos
    console.log('📦 Migrating casinos...')
    const casinosPath = path.join(process.cwd(), 'data', 'casinos.json')
    const casinosData = JSON.parse(await fs.readFile(casinosPath, 'utf-8'))
    
    // Очищаем существующие данные
    const { error: deleteError } = await supabase
      .from('casinos')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Удаляем все кроме несуществующего ID
    
    if (deleteError) {
      console.log('Note: casinos table might be empty or not exist yet')
    }

    // Вставляем данные казино
    for (const casino of casinosData) {
      const casinoData = {
        id: casino.id,
        name: casino.name,
        slug: casino.slug,
        logo: casino.logo || null,
        rating: casino.rating || 0,
        established: casino.established || null,
        affiliate_link: casino.affiliateLink || '',
        features: casino.features || [],
        bonus_type: casino.bonus?.type || null,
        bonus_amount: casino.bonus?.amount || 0,
        bonus_percentage: casino.bonus?.percentage || 0,
        bonus_free_spins: casino.bonus?.freeSpins || 0,
        bonus_min_deposit: casino.bonus?.minDeposit || 0,
        bonus_wagering: casino.bonus?.wageringRequirement || 0,
        bonus_code: casino.bonus?.code || null,
        games_total: casino.games?.total || 0,
        games_slots: casino.games?.slots || 0,
        games_live: casino.games?.live || 0,
        games_table: casino.games?.table || 0,
        payment_methods: casino.paymentMethods || [],
        withdrawal_time: casino.withdrawalTime || null,
        licenses: casino.licenses || [],
        currencies: casino.currencies || [],
        pros: casino.pros || [],
        cons: casino.cons || [],
        status: casino.status || 'active',
        is_featured: casino.isFeatured || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('casinos')
        .insert(casinoData)
      
      if (error) {
        console.error(`Failed to insert casino ${casino.name}:`, error)
      } else {
        console.log(`✅ Migrated casino: ${casino.name}`)
      }
    }
    
    console.log(`✅ Migrated ${casinosData.length} casinos`)
    
    // 3. Migrate Games
    console.log('🎮 Migrating games...')
    const gamesPath = path.join(process.cwd(), 'data', 'games.json')
    
    try {
      const gamesData = JSON.parse(await fs.readFile(gamesPath, 'utf-8'))
      
      // Очищаем существующие игры
      await supabase
        .from('games')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
      
      for (const game of gamesData) {
        const gameData = {
          id: game.id || crypto.randomUUID(),
          name: game.name,
          slug: game.slug,
          provider: game.provider || null,
          type: game.type || 'slot',
          rtp: game.rtp || null,
          volatility: game.volatility || null,
          max_win: game.maxWin || null,
          min_bet: game.minBet || null,
          max_bet: game.maxBet || null,
          features: game.features || [],
          theme: game.theme || null,
          image: game.image || null,
          is_featured: game.isFeatured || false,
          is_new: game.isNew || false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        const { error } = await supabase
          .from('games')
          .insert(gameData)
        
        if (error) {
          console.error(`Failed to insert game ${game.name}:`, error)
        }
      }
      
      console.log(`✅ Migrated ${gamesData.length} games`)
    } catch (gamesError) {
      console.log('Games file not found or error reading:', gamesError)
    }
    
    // 4. Migrate Blog Posts
    console.log('📝 Migrating blog posts...')
    const blogPath = path.join(process.cwd(), 'data', 'blog-posts.json')
    
    try {
      const blogData = JSON.parse(await fs.readFile(blogPath, 'utf-8'))
      
      // Очищаем существующие посты
      await supabase
        .from('blog_posts')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
      
      for (const post of blogData) {
        const postData = {
          id: post.id || crypto.randomUUID(),
          title: post.title,
          slug: post.slug,
          content: post.content || '',
          excerpt: post.excerpt || null,
          author: post.author || 'Admin',
          category: post.category || 'general',
          tags: post.tags || [],
          featured_image: post.featuredImage || null,
          status: post.status || 'published',
          published_at: post.publishedAt || new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        const { error } = await supabase
          .from('blog_posts')
          .insert(postData)
        
        if (error) {
          console.error(`Failed to insert blog post ${post.title}:`, error)
        }
      }
      
      console.log(`✅ Migrated ${blogData.length} blog posts`)
    } catch (blogError) {
      console.log('Blog posts file not found or error reading:', blogError)
    }
    
    console.log('🎉 Migration completed successfully!')
    console.log('📊 Check your data at: https://supabase.com/dashboard/project/zwtadapqdlthqafdsloi/editor')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Запуск миграции
migrateData()