import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zwtadapqdlthqafdsloi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dGFkYXBxZGx0aHFhZmRzbG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzE4NjIsImV4cCI6MjA3MDc0Nzg2Mn0.wZ-QRC2OTGOleS0gv-Xfa7t4okpJAFnXbXcW5uziyjU'

// Create client for direct SQL execution
export const supabaseDirect = createClient(supabaseUrl, supabaseKey)

// Direct update function that bypasses RLS check on return
export async function updateBlogPostDirect(id: string, updateData: any) {
  // First perform the update
  const { error: updateError } = await supabaseDirect
    .from('blog_posts')
    .update(updateData)
    .eq('id', id);
  
  if (updateError) {
    throw updateError;
  }
  
  // Then fetch the updated post separately
  const { data: updatedPost, error: fetchError } = await supabaseDirect
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (fetchError) {
    throw fetchError;
  }
  
  return updatedPost;
}