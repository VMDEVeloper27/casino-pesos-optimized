// Скрипт для миграции постов блога из JSON в Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

// Инициализация Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hbkxgahzbxnpfkhfzebu.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhia3hnYWh6YnhucGZraGZ6ZWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0MDU0MzAsImV4cCI6MjA0Njk4MTQzMH0.dPdwY3s7kb0DPb3x-KF7nLqBqPNEomq5Nu1z_JTmKGw'
);

async function migrateBlogPosts() {
  try {
    console.log('🚀 Начинаем миграцию постов блога...\n');

    // Читаем существующие посты из JSON
    const jsonPath = path.join(__dirname, 'data', 'blog-posts.json');
    const jsonContent = await fs.readFile(jsonPath, 'utf-8');
    const posts = JSON.parse(jsonContent);

    console.log(`📚 Найдено ${posts.length} постов для миграции\n`);

    // Мигрируем каждый пост
    for (const post of posts) {
      console.log(`📝 Мигрируем пост: ${post.title}`);

      // Подготавливаем данные для вставки
      const dbPost = {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        author_role: post.authorRole,
        category: post.category,
        tags: post.tags,
        featured_image: post.featuredImage,
        published_at: post.publishedAt,
        updated_at: post.updatedAt || post.publishedAt,
        read_time: post.readTime,
        views: post.views || 0,
        likes: post.likes || 0,
        status: post.status || 'published',
        seo_title: post.seo?.metaTitle || post.title,
        seo_description: post.seo?.metaDescription || post.excerpt,
        seo_keywords: post.seo?.keywords || []
      };

      // Проверяем, существует ли уже пост с таким slug
      const { data: existing, error: checkError } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error(`   ❌ Ошибка при проверке: ${checkError.message}`);
        continue;
      }

      if (existing) {
        // Обновляем существующий пост
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(dbPost)
          .eq('slug', post.slug);

        if (updateError) {
          console.error(`   ❌ Ошибка обновления: ${updateError.message}`);
        } else {
          console.log(`   ✅ Пост обновлен`);
        }
      } else {
        // Вставляем новый пост
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert(dbPost);

        if (insertError) {
          console.error(`   ❌ Ошибка вставки: ${insertError.message}`);
        } else {
          console.log(`   ✅ Пост добавлен`);
        }
      }
    }

    console.log('\n✨ Миграция завершена!');

    // Показываем статистику
    const { data: stats, error: statsError } = await supabase
      .from('blog_posts')
      .select('status');

    if (!statsError && stats) {
      const published = stats.filter(p => p.status === 'published').length;
      const draft = stats.filter(p => p.status === 'draft').length;
      const archived = stats.filter(p => p.status === 'archived').length;

      console.log('\n📊 Статистика базы данных:');
      console.log(`   Опубликовано: ${published}`);
      console.log(`   Черновики: ${draft}`);
      console.log(`   В архиве: ${archived}`);
      console.log(`   Всего: ${stats.length}`);
    }

  } catch (error) {
    console.error('❌ Ошибка миграции:', error);
    process.exit(1);
  }
}

// Запускаем миграцию
migrateBlogPosts();