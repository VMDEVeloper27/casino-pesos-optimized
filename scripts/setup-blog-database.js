const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://oojggdhhcnhvspdkjmnx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vamdnZGhoY25odnNwZGtqbW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NDEzNzMsImV4cCI6MjA1MzAxNzM3M30._sUqZ5kqvCThmNiPiF5xb2DZa5HLcvwPr-bHdYcCXdA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupBlogDatabase() {
  console.log('🚀 Setting up blog database...\n');
  
  // 1. Check if table exists
  console.log('1️⃣ Checking if blog_posts table exists...');
  
  const { data: existingPosts, error: checkError } = await supabase
    .from('blog_posts')
    .select('id')
    .limit(1);
  
  if (checkError && checkError.message.includes('relation') && checkError.message.includes('does not exist')) {
    console.log('❌ Table blog_posts does not exist');
    console.log('\n📋 Please run this SQL in Supabase SQL Editor:\n');
    
    const createTableSQL = `
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  author_role TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time INTEGER DEFAULT 5,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}'
);

-- Create indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Create policy for authenticated users to manage posts
CREATE POLICY "Authenticated users can manage posts" ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);
    `;
    
    console.log('```sql');
    console.log(createTableSQL);
    console.log('```\n');
    
    console.log('After creating the table, run this script again to import posts.');
    return;
  }
  
  if (checkError) {
    console.error('Error checking table:', checkError);
    return;
  }
  
  console.log('✅ Table blog_posts exists');
  
  // 2. Check current posts
  const { data: currentPosts, error: countError } = await supabase
    .from('blog_posts')
    .select('id, title, slug');
  
  if (countError) {
    console.error('Error counting posts:', countError);
    return;
  }
  
  console.log(`📊 Current posts in database: ${currentPosts?.length || 0}`);
  
  // 3. Import posts from JSON
  console.log('\n2️⃣ Importing posts from JSON file...');
  
  const jsonPath = path.join(__dirname, '../data/blog-posts.json');
  if (!fs.existsSync(jsonPath)) {
    console.log('❌ No blog-posts.json file found');
    return;
  }
  
  const blogData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const posts = blogData.posts || [];
  
  console.log(`📚 Found ${posts.length} posts in JSON file`);
  
  // Transform and import posts
  let imported = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const post of posts) {
    // Check if post already exists
    const existingPost = currentPosts?.find(p => p.slug === post.slug);
    if (existingPost) {
      console.log(`⏭️  Skipping existing post: ${post.title}`);
      skipped++;
      continue;
    }
    
    // Transform post data
    const postData = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || `# ${post.title}\n\n${post.excerpt}\n\n## Contenido\n\nEste es el contenido completo del artículo...`,
      author: post.author,
      author_role: post.author_role || post.authorRole || 'Editor',
      category: post.category,
      tags: post.tags || [],
      featured_image: post.featured_image || post.featuredImage || `/images/blog/${post.slug}.jpg`,
      published_at: post.published_at || post.publishedAt || new Date().toISOString(),
      read_time: post.read_time || post.readTime || 5,
      views: post.views || 0,
      likes: post.likes || 0,
      status: post.status || 'published',
      seo_title: post.seo_title || post.title,
      seo_description: post.seo_description || post.excerpt,
      seo_keywords: post.seo_keywords || post.tags || []
    };
    
    // Insert post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select();
    
    if (error) {
      console.error(`❌ Failed to import: ${post.title}`, error.message);
      failed++;
    } else {
      console.log(`✅ Imported: ${post.title}`);
      imported++;
    }
  }
  
  // 4. Add sample posts if database is empty
  if (currentPosts?.length === 0 && imported === 0) {
    console.log('\n3️⃣ Adding sample posts...');
    
    const samplePosts = [
      {
        slug: 'guia-completa-casino-online-mexico-2025',
        title: 'Guía Completa de Casinos Online en México 2025',
        excerpt: 'Todo lo que necesitas saber sobre los casinos online en México: regulación, mejores sitios, bonos y métodos de pago.',
        content: `# Guía Completa de Casinos Online en México 2025

## Introducción

El mercado de casinos online en México ha experimentado un crecimiento exponencial en los últimos años. Con la llegada de operadores internacionales y la adaptación de plataformas al mercado mexicano, los jugadores tienen más opciones que nunca.

## Estado Legal

Aunque México no tiene una regulación específica para casinos online, los operadores con licencias internacionales (Malta, Curazao, Gibraltar) operan de manera segura para jugadores mexicanos.

## Mejores Casinos 2025

1. **Caliente.mx** - El líder del mercado mexicano
2. **Codere** - Tradición y confianza
3. **Betway** - Excelentes bonos
4. **888 Casino** - Variedad de juegos
5. **LeoVegas** - Rey del casino móvil

## Métodos de Pago

Los casinos en México han adaptado sus métodos de pago:
- OXXO
- SPEI
- Tarjetas de crédito/débito
- E-wallets (PayPal, Skrill)
- Criptomonedas

## Bonos y Promociones

Los bonos típicos incluyen:
- Bono de bienvenida: 100-200% hasta $5,000 MXN
- Giros gratis
- Cashback semanal
- Programa VIP

## Conclusión

Jugar en casinos online en México es seguro y entretenido cuando eliges operadores confiables. Siempre verifica las licencias y juega responsablemente.`,
        author: 'Carlos Mendoza',
        author_role: 'Editor Principal',
        category: 'Guías',
        tags: ['casinos online', 'méxico', 'guía', 'regulación'],
        featured_image: '/images/blog/guia-casinos-mexico.jpg',
        published_at: new Date().toISOString(),
        read_time: 10,
        views: 5432,
        likes: 342,
        status: 'published',
        seo_title: 'Casinos Online México 2025 | Guía Completa y Actualizada',
        seo_description: 'Descubre todo sobre casinos online en México: mejores sitios, bonos, métodos de pago y regulación. Guía actualizada 2025.',
        seo_keywords: ['casinos online méxico', 'guía casinos', 'casinos 2025', 'jugar online méxico']
      },
      {
        slug: 'mejores-bonos-casino-sin-deposito-2025',
        title: 'Los Mejores Bonos de Casino Sin Depósito en 2025',
        excerpt: 'Descubre los mejores bonos sin depósito disponibles para jugadores mexicanos. Giros gratis, dinero gratis y más.',
        content: `# Los Mejores Bonos de Casino Sin Depósito en 2025

## ¿Qué son los bonos sin depósito?

Los bonos sin depósito son promociones que los casinos ofrecen a nuevos jugadores sin requerir un depósito inicial. Son perfectos para probar un casino sin riesgo.

## Top 5 Bonos Sin Depósito

### 1. Casino A - $500 MXN Gratis
- Sin depósito requerido
- Requisito de apuesta: 30x
- Válido por 7 días

### 2. Casino B - 50 Giros Gratis
- Para Book of Dead
- Ganancias máximas: $1,000 MXN
- Requisito: 35x

### 3. Casino C - $300 MXN + 20 Giros
- Código: GRATIS2025
- Para nuevos usuarios
- Apuesta: 25x

## Cómo Reclamar

1. Regístrate en el casino
2. Verifica tu cuenta
3. El bono se acredita automáticamente
4. Cumple los requisitos de apuesta

## Términos Importantes

- Siempre lee los términos y condiciones
- Verifica los juegos elegibles
- Revisa los límites de retiro
- Cumple los plazos establecidos`,
        author: 'Ana Rodríguez',
        author_role: 'Especialista en Bonos',
        category: 'Bonos',
        tags: ['bonos sin depósito', 'bonos gratis', 'promociones'],
        featured_image: '/images/blog/bonos-sin-deposito.jpg',
        published_at: new Date().toISOString(),
        read_time: 5,
        views: 3210,
        likes: 234,
        status: 'published',
        seo_title: 'Bonos Sin Depósito 2025 | Mejores Ofertas México',
        seo_description: 'Los mejores bonos de casino sin depósito para jugadores mexicanos. Dinero y giros gratis sin depositar.',
        seo_keywords: ['bonos sin depósito', 'bonos gratis', 'casino sin depósito']
      }
    ];
    
    for (const samplePost of samplePosts) {
      const { error } = await supabase
        .from('blog_posts')
        .insert(samplePost);
      
      if (error) {
        console.error(`❌ Failed to add sample: ${samplePost.title}`, error.message);
      } else {
        console.log(`✅ Added sample: ${samplePost.title}`);
        imported++;
      }
    }
  }
  
  // 5. Summary
  console.log('\n📊 Import Summary:');
  console.log('─────────────────────────');
  console.log(`✅ Imported: ${imported} posts`);
  console.log(`⏭️  Skipped: ${skipped} posts (already exist)`);
  console.log(`❌ Failed: ${failed} posts`);
  
  // 6. Final check
  const { data: finalPosts, error: finalError } = await supabase
    .from('blog_posts')
    .select('id, title, status, slug')
    .order('created_at', { ascending: false })
    .limit(5);
  
  if (!finalError && finalPosts) {
    console.log('\n📚 Latest posts in database:');
    finalPosts.forEach(post => {
      console.log(`   - [${post.status}] ${post.title}`);
      console.log(`     URL: /blog/${post.slug}`);
    });
  }
  
  console.log('\n✨ Setup complete!');
  console.log('You can now:');
  console.log('1. View blogs at: http://localhost:3000/blog');
  console.log('2. Manage blogs at: http://localhost:3000/admin/blog (login as admin)');
}

// Run setup
setupBlogDatabase().catch(console.error);