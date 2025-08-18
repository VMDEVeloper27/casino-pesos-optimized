import { supabase } from './supabase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  author_role?: string;
  category: string;
  tags: string[];
  featured_image?: string;
  published_at: string;
  updated_at: string;
  created_at: string;
  read_time: number;
  views: number;
  likes: number;
  status: 'draft' | 'published' | 'archived';
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

// Get all published blog posts
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts from DB:', error);
      return [];
    }

    // Преобразуем данные из БД в нужный формат
    const posts = (data || []).map(post => ({
      ...post,
      publishedAt: post.published_at,
      readTime: post.read_time,
      authorRole: post.author_role,
      featuredImage: post.featured_image,
      seo: {
        metaTitle: post.seo_title,
        metaDescription: post.seo_description,
        keywords: post.seo_keywords
      }
    }));

    return posts;
  } catch (error) {
    console.error('Error in getPublishedBlogPosts:', error);
    return [];
  }
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog post by slug:', error);
      
      // Fallback to JSON file
      const { default: getFromFile } = await import('./blog-database');
      return getFromFile.getBlogPostBySlug(slug);
    }

    return data;
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    
    // Fallback to JSON file
    const { default: getFromFile } = await import('./blog-database');
    return getFromFile.getBlogPostBySlug(slug);
  }
}

// Get posts by category
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .eq('category', category)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts by category:', error);
      return [];
    }

    // Преобразуем данные из БД в нужный формат
    const posts = (data || []).map(post => ({
      ...post,
      publishedAt: post.published_at,
      readTime: post.read_time,
      authorRole: post.author_role,
      featuredImage: post.featured_image
    }));

    return posts;
  } catch (error) {
    console.error('Error in getBlogPostsByCategory:', error);
    return [];
  }
}

// Get posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .contains('tags', [tag])
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts by tag:', error);
      return [];
    }

    // Преобразуем данные из БД в нужный формат
    const posts = (data || []).map(post => ({
      ...post,
      publishedAt: post.published_at,
      readTime: post.read_time,
      authorRole: post.author_role,
      featuredImage: post.featured_image
    }));

    return posts;
  } catch (error) {
    console.error('Error in getBlogPostsByTag:', error);
    return [];
  }
}

// Get related posts
export async function getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
  try {
    // First get the current post
    const { data: currentPost } = await supabase
      .from('blog_posts')
      .select('category, tags')
      .eq('id', postId)
      .single();

    if (!currentPost) return [];

    // Get posts from same category
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .eq('category', currentPost.category)
      .neq('id', postId)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related posts:', error);
      
      // Fallback to JSON file
      const { default: getFromFile } = await import('./blog-database');
      return getFromFile.getRelatedPosts(postId, limit);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getRelatedPosts:', error);
    
    // Fallback to JSON file
    const { default: getFromFile } = await import('./blog-database');
    return getFromFile.getRelatedPosts(postId, limit);
  }
}

// Increment view count
export async function incrementBlogViews(postId: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('increment_blog_views', {
      post_uuid: postId
    });

    if (error) {
      console.error('Error incrementing views:', error);
    }
  } catch (error) {
    console.error('Error in incrementBlogViews:', error);
  }
}

// Toggle like
export async function toggleBlogLike(postId: string, userEmail: string): Promise<number> {
  try {
    const { data, error } = await supabase.rpc('toggle_blog_like', {
      post_uuid: postId,
      user_email_param: userEmail
    });

    if (error) {
      console.error('Error toggling like:', error);
      return 0;
    }

    return data || 0;
  } catch (error) {
    console.error('Error in toggleBlogLike:', error);
    return 0;
  }
}

// Get blog stats
export async function getBlogStats() {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('status, views, likes, category, tags');

    if (error) {
      console.error('Error fetching blog stats:', error);
      
      // Fallback to JSON file
      const { default: getFromFile } = await import('./blog-database');
      return getFromFile.getBlogStats();
    }

    if (!posts) return {
      total: 0,
      published: 0,
      draft: 0,
      archived: 0,
      totalViews: 0,
      totalLikes: 0,
      categories: [],
      tags: []
    };

    const categories = new Set<string>();
    const tags = new Set<string>();
    let totalViews = 0;
    let totalLikes = 0;

    posts.forEach(post => {
      categories.add(post.category);
      post.tags?.forEach((tag: string) => tags.add(tag));
      totalViews += post.views || 0;
      totalLikes += post.likes || 0;
    });

    return {
      total: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      draft: posts.filter(p => p.status === 'draft').length,
      archived: posts.filter(p => p.status === 'archived').length,
      totalViews,
      totalLikes,
      categories: Array.from(categories),
      tags: Array.from(tags)
    };
  } catch (error) {
    console.error('Error in getBlogStats:', error);
    
    // Fallback to JSON file
    const { default: getFromFile } = await import('./blog-database');
    return getFromFile.getBlogStats();
  }
}

// Create new blog post (admin only)
export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views' | 'likes'>): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        ...post,
        views: 0,
        likes: 0,
        published_at: post.published_at || new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      return null;
    }

    // Send email notifications to subscribers if post is published
    if (data && post.status === 'published') {
      await sendNewPostNotifications(data);
    }

    return data;
  } catch (error) {
    console.error('Error in createBlogPost:', error);
    return null;
  }
}

// Update blog post (admin only)
export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    // Check if post is being published for the first time
    const { data: oldPost } = await supabase
      .from('blog_posts')
      .select('status')
      .eq('id', id)
      .single();

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      return null;
    }

    // Send notifications if post is newly published
    if (data && oldPost?.status !== 'published' && updates.status === 'published') {
      await sendNewPostNotifications(data);
    }

    return data;
  } catch (error) {
    console.error('Error in updateBlogPost:', error);
    return null;
  }
}

// Send email notifications to subscribers via Gmail
async function sendNewPostNotifications(post: BlogPost) {
  try {
    console.log('📧 Starting email notifications for new blog post:', post.title);
    
    // Get active subscribers
    const { data: subscribers } = await supabase
      .from('newsletter_subscribers')
      .select('email, first_name, preferences')
      .eq('status', 'active');

    if (!subscribers || subscribers.length === 0) {
      console.log('No active subscribers found');
      return;
    }

    // Filter subscribers who want blog posts
    const blogSubscribers = subscribers.filter(sub => 
      sub.preferences?.blogPosts !== false
    );

    if (blogSubscribers.length === 0) {
      console.log('No subscribers want blog notifications');
      return;
    }

    console.log(`📨 Sending notifications to ${blogSubscribers.length} subscribers`);

    // Import Gmail sender
    const { sendEmail } = await import('./gmail-working.js');
    
    // Send emails to each subscriber
    let successCount = 0;
    let failCount = 0;
    
    for (const subscriber of blogSubscribers) {
      try {
        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
        
        // Create email HTML
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo Artículo en CasinosPesos</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                          🎰 CasinosPesos Blog
                        </h1>
                        <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                          Nuevo artículo disponible
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Greeting -->
                    <tr>
                      <td style="padding: 30px 30px 20px;">
                        <p style="margin: 0; color: #333333; font-size: 18px;">
                          Hola${subscriber.first_name ? ` ${subscriber.first_name}` : ''},
                        </p>
                        <p style="margin: 15px 0 0; color: #666666; font-size: 16px; line-height: 1.5;">
                          Tenemos un nuevo artículo que podría interesarte:
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Article Card -->
                    <tr>
                      <td style="padding: 0 30px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
                          ${post.featured_image ? `
                          <tr>
                            <td>
                              <img src="${post.featured_image}" alt="${post.title}" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                            </td>
                          </tr>
                          ` : ''}
                          <tr>
                            <td style="padding: 25px;">
                              <span style="display: inline-block; padding: 5px 12px; background-color: #10b981; color: #ffffff; font-size: 12px; font-weight: bold; border-radius: 4px; margin-bottom: 15px;">
                                ${post.category}
                              </span>
                              
                              <h2 style="margin: 15px 0; color: #333333; font-size: 22px; font-weight: bold; line-height: 1.3;">
                                ${post.title}
                              </h2>
                              
                              <p style="margin: 15px 0; color: #666666; font-size: 15px; line-height: 1.6;">
                                ${post.excerpt}
                              </p>
                              
                              <div style="margin: 20px 0; color: #999999; font-size: 14px;">
                                <span>✍️ ${post.author}</span>
                                <span style="margin-left: 15px;">⏱️ ${post.read_time} min de lectura</span>
                              </div>
                              
                              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/es/blog/${post.slug}" style="display: inline-block; padding: 12px 30px; background-color: #10b981; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px; margin-top: 10px;">
                                Leer Artículo Completo →
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e5e5;">
                        <p style="margin: 0 0 10px; color: #999999; font-size: 13px;">
                          Estás recibiendo este email porque te suscribiste a nuestro newsletter.
                        </p>
                        <a href="${unsubscribeUrl}" style="color: #10b981; text-decoration: none; font-size: 13px;">
                          Cancelar suscripción
                        </a>
                        <p style="margin: 15px 0 0; color: #999999; font-size: 12px;">
                          © 2024 CasinosPesos. Todos los derechos reservados.
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `;

        // Send email via Gmail
        const result = await sendEmail({
          to: subscriber.email,
          subject: `📚 Nuevo artículo: ${post.title}`,
          html: emailHtml
        });

        if (result.success) {
          successCount++;
          console.log(`✅ Email sent to ${subscriber.email}`);
          
          // Record successful notification
          await supabase
            .from('email_notifications')
            .insert({
              post_id: post.id,
              subscriber_email: subscriber.email,
              email_type: 'new_post',
              status: 'sent',
              sent_at: new Date().toISOString()
            });
        } else {
          failCount++;
          console.error(`❌ Failed to send to ${subscriber.email}:`, result.error);
        }
      } catch (error) {
        failCount++;
        console.error(`Error sending to ${subscriber.email}:`, error);
      }
    }
    
    console.log(`📊 Notification summary: ${successCount} sent, ${failCount} failed`);
    
    // Send admin notification
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>📮 Blog Notification Summary</h2>
        <p><strong>Post:</strong> ${post.title}</p>
        <p><strong>Author:</strong> ${post.author}</p>
        <p><strong>Category:</strong> ${post.category}</p>
        <p><strong>Emails sent:</strong> ${successCount}/${blogSubscribers.length}</p>
        <p><strong>Failed:</strong> ${failCount}</p>
      </div>
    `;
    
    await sendEmail({
      to: 'albertokiddi1992@gmail.com',
      subject: `[Admin] Blog notifications sent for: ${post.title}`,
      html: adminHtml
    });
    
  } catch (error) {
    console.error('Error in sendNewPostNotifications:', error);
  }
}

// Delete blog post (admin only)
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteBlogPost:', error);
    return false;
  }
}