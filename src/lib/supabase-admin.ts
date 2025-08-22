import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zwtadapqdlthqafdsloi.supabase.co'
// Using anon key for now
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dGFkYXBxZGx0aHFhZmRzbG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzE4NjIsImV4cCI6MjA3MDc0Nzg2Mn0.wZ-QRC2OTGOleS0gv-Xfa7t4okpJAFnXbXcW5uziyjU'

// Create admin client with RLS bypass
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  }
})

// Helper to execute queries without RLS
export async function executeWithoutRLS<T>(
  query: () => Promise<{ data: T | null; error: any }>
): Promise<T | null> {
  try {
    const { data, error } = await query()
    if (error) {
      console.error('Supabase query error:', error)
      return null
    }
    return data
  } catch (err) {
    console.error('Query execution error:', err)
    return null
  }
}