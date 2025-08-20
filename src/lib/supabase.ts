import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Создаем клиент только если есть ключи
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any

// Helper функции для работы с данными
export const supabaseAdmin = {
  // Получить все казино
  async getCasinos() {
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .order('priority', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Получить казино по slug
  async getCasinoBySlug(slug: string) {
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  },

  // Создать казино
  async createCasino(casino: any) {
    const { data, error } = await supabase
      .from('casinos')
      .insert(casino)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Обновить казино
  async updateCasino(id: string, updates: any) {
    const { data, error } = await supabase
      .from('casinos')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Удалить казино
  async deleteCasino(id: string) {
    const { error } = await supabase
      .from('casinos')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // Получить все игры
  async getGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Получить все блог посты
  async getBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('publishedAt', { ascending: false })
    
    if (error) throw error
    return data
  }
}