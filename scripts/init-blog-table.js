const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Supabase configuration
const supabaseUrl = 'https://oojggdhhcnhvspdkjmnx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vamdnZGhoY25odnNwZGtqbW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NDEzNzMsImV4cCI6MjA1MzAxNzM3M30._sUqZ5kqvCThmNiPiF5xb2DZa5HLcvwPr-bHdYcCXdA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Sample blog posts
const samplePosts = [
  {
    slug: 'nuevos-casinos-mexico-enero-2024',
    title: 'Los 5 Nuevos Casinos Online que Llegan a México en Enero 2024',
    excerpt: 'Descubre las últimas plataformas de casino que han llegado al mercado mexicano con licencias internacionales, bonos exclusivos y métodos de pago locales como OXXO y SPEI.',
    content: `El mercado de casinos online en México continúa expandiéndose con nuevas opciones para los jugadores. En enero de 2024, cinco nuevas plataformas han llegado al país con ofertas competitivas y características innovadoras.

## ¿Por qué elegir un casino nuevo?
Los nuevos casinos online suelen ofrecer bonos más generosos para atraer jugadores, tecnología más moderna y mejores experiencias de usuario. Además, muchos han adaptado sus plataformas específicamente para el mercado mexicano, incluyendo métodos de pago locales y soporte en español 24/7.

## Los 5 mejores nuevos casinos

### 1. **LuckyPesos Casino**
- Bono de bienvenida: 200% hasta $10,000 MXN
- Más de 3,000 juegos
- Retiros en menos de 24 horas

### 2. **MexiWin**
- 150 giros gratis sin depósito
- Acepta OXXO y SPEI
- Casino en vivo con dealers mexicanos

### 3. **Aztec Fortune**
- Bono del 300% en el primer depósito
- Jackpots progresivos exclusivos
- App móvil nativa para iOS y Android

### 4. **Fiesta Slots**
- Programa VIP con beneficios desde el día 1
- Torneos diarios con premios en efectivo
- Criptomonedas aceptadas

### 5. **El Dorado Casino**
- Cashback del 20% semanal
- Más de 100 proveedores de juegos
- Licencia de Curazao

## Conclusión
Estos nuevos casinos representan excelentes opciones para jugadores mexicanos que buscan experiencias frescas y bonos generosos. Recuerda siempre jugar de manera responsable y verificar las licencias antes de registrarte.`,
    author: 'Carlos Mendoza',
    author_role: 'Editor Principal',
    category: 'Noticias',
    tags: ['nuevos casinos', 'méxico', '2024', 'licencias', 'bonos'],
    featured_image: '/images/blog/nuevos-casinos-2024.jpg',
    published_at: new Date('2024-01-15').toISOString(),
    read_time: 5,
    views: 2547,
    likes: 187,
    status: 'published',
    seo_title: 'Nuevos Casinos Online México 2024 | Top 5 Mejores Opciones',
    seo_description: 'Descubre los 5 mejores nuevos casinos online en México para 2024. Bonos exclusivos, métodos de pago locales y licencias verificadas.',
    seo_keywords: ['nuevos casinos méxico', 'casinos online 2024', 'mejores casinos nuevos', 'bonos casino méxico']
  },
  {
    slug: 'estrategias-blackjack-mexico',
    title: 'Estrategias de Blackjack para Jugadores Mexicanos: Guía Completa 2024',
    excerpt: 'Aprende las mejores estrategias básicas de blackjack adaptadas al mercado mexicano. Incluye tablas de probabilidades y consejos para maximizar tus ganancias.',
    content: `El blackjack es uno de los juegos de casino más populares en México, y con razón: ofrece algunas de las mejores probabilidades para el jugador cuando se juega con la estrategia correcta. En esta guía completa, te enseñaremos todo lo que necesitas saber para mejorar tu juego.

## Estrategia Básica del Blackjack

La estrategia básica es un conjunto de reglas matemáticamente probadas que te dicen la mejor jugada en cada situación. Siguiendo estas reglas, puedes reducir la ventaja de la casa a menos del 1%.

### Cuándo Pedir Carta (Hit)
- Con 11 o menos: siempre pide
- Con 12-16: pide si el dealer muestra 7 o más
- Con 17+: nunca pidas

### Cuándo Plantarse (Stand)
- Con 17 o más: siempre plántate
- Con 12-16: plántate si el dealer muestra 2-6
- Con 11 o menos: nunca te plantes

### Cuándo Doblar (Double Down)
- Con 11: dobla siempre (excepto contra As del dealer)
- Con 10: dobla si el dealer muestra 9 o menos
- Con 9: dobla si el dealer muestra 3-6

### Cuándo Dividir (Split)
- Ases y 8s: siempre divide
- 10s y 5s: nunca dividas
- 2s, 3s, 7s: divide si el dealer muestra 2-7
- 4s: divide si el dealer muestra 5-6
- 6s: divide si el dealer muestra 2-6
- 9s: divide excepto contra 7, 10 o As

## Gestión de Bankroll

La gestión adecuada de tu dinero es tan importante como conocer la estrategia básica:

1. **Establece un presupuesto**: Nunca juegues con dinero que no puedes permitirte perder
2. **Usa la regla del 5%**: No apuestes más del 5% de tu bankroll en una sola mano
3. **Establece límites de pérdida y ganancia**: Sal cuando alcances cualquiera de ellos
4. **Evita las apuestas secundarias**: Tienen mayor ventaja para la casa

## Variantes Populares en México

### Blackjack Clásico
- 6-8 barajas
- Dealer se planta en 17 suave
- Blackjack paga 3:2

### Spanish 21
- Sin 10s en la baraja
- Bonos especiales por ciertas manos
- Mayor flexibilidad en las reglas

### Blackjack en Vivo
- Dealers reales mexicanos
- Interacción social
- Límites más altos disponibles

## Errores Comunes a Evitar

1. **Tomar seguro**: Nunca es rentable a largo plazo
2. **Imitar al dealer**: Plantarse siempre en 17 reduce tus ganancias
3. **Jugar por corazonadas**: Sigue siempre la estrategia básica
4. **No dividir ases**: Siempre divide los ases

## Conclusión

Dominar el blackjack requiere práctica y disciplina. Empieza practicando en modo demo, aprende la estrategia básica de memoria y gestiona tu bankroll responsablemente. Con estos conocimientos, estarás listo para enfrentar las mesas con confianza.`,
    author: 'Ana Rodríguez',
    author_role: 'Experta en Juegos de Mesa',
    category: 'Guías',
    tags: ['blackjack', 'estrategias', 'guía', 'méxico', 'casino'],
    featured_image: '/images/blog/blackjack-estrategias.jpg',
    published_at: new Date('2024-01-12').toISOString(),
    read_time: 8,
    views: 3892,
    likes: 298,
    status: 'published',
    seo_title: 'Estrategias Blackjack México 2024 | Guía Completa para Ganar',
    seo_description: 'Aprende las mejores estrategias de blackjack para jugadores mexicanos. Guía completa con tablas, consejos y gestión de bankroll.',
    seo_keywords: ['estrategias blackjack', 'blackjack méxico', 'cómo ganar blackjack', 'guía blackjack']
  },
  {
    slug: 'depositar-oxxo-casinos-online',
    title: 'Cómo Depositar en Casinos Online usando OXXO: Guía Paso a Paso',
    excerpt: 'Tutorial completo para depositar dinero en casinos online mexicanos usando OXXO. Ventajas, límites, tiempos de procesamiento y casinos recomendados.',
    content: `OXXO se ha convertido en el método de pago preferido por millones de mexicanos para sus transacciones en línea, incluyendo depósitos en casinos online. Esta guía te explicará todo lo que necesitas saber para usar OXXO de manera segura y eficiente.

## ¿Por qué usar OXXO para casinos online?

### Ventajas
- **Sin tarjeta de crédito**: No necesitas cuenta bancaria ni tarjeta
- **Anónimo**: Tus datos bancarios permanecen privados
- **Seguro**: Sin riesgo de fraude online
- **Accesible**: Más de 19,000 tiendas en todo México
- **Inmediato**: Fondos disponibles en minutos

### Desventajas
- Solo para depósitos (no retiros)
- Comisión del 3-5% en algunos casinos
- Límite diario de $10,000 MXN en la mayoría de tiendas

## Guía Paso a Paso

### Paso 1: Elige un Casino que Acepte OXXO
Verifica que el casino online acepte OXXO como método de pago. Los mejores casinos con OXXO en 2024 son:
- Caliente.mx
- Codere
- Betway
- 888 Casino
- LeoVegas

### Paso 2: Registra tu Cuenta
1. Completa el formulario de registro
2. Verifica tu email
3. Ingresa tus datos personales

### Paso 3: Selecciona OXXO como Método de Depósito
1. Ve a la sección de Cajero/Depósitos
2. Selecciona OXXO de la lista
3. Ingresa el monto a depositar

### Paso 4: Genera tu Referencia de Pago
El casino generará:
- Un código de barras único
- Un número de referencia de 14 dígitos
- El monto exacto a pagar

### Paso 5: Realiza el Pago en OXXO
1. Presenta el código o referencia en cualquier OXXO
2. Paga en efectivo el monto exacto
3. Guarda tu comprobante

### Paso 6: Confirmación
- El depósito se acredita en 15-30 minutos
- Recibirás un email de confirmación
- Los fondos estarán disponibles para jugar

## Límites y Tiempos

### Límites de Depósito
- Mínimo: $100-200 MXN (varía por casino)
- Máximo: $10,000 MXN por transacción
- Diario: $30,000 MXN (3 transacciones)

### Tiempos de Procesamiento
- Generación de referencia: Instantáneo
- Acreditación tras pago: 15-30 minutos
- Horario: 24/7 en todas las tiendas

## Consejos de Seguridad

1. **Verifica la licencia del casino**: Solo usa casinos regulados
2. **Guarda los comprobantes**: Por si necesitas hacer reclamaciones
3. **Revisa las comisiones**: Algunos casinos cobran extra
4. **Usa referencias antes de 48 horas**: Después expiran
5. **Verifica el monto**: Paga exactamente lo indicado

## Alternativas a OXXO

Si OXXO no está disponible, considera:
- **SPEI**: Transferencias bancarias instantáneas
- **Tarjetas de débito/crédito**: Visa, Mastercard
- **E-wallets**: PayPal, Skrill, Neteller
- **Criptomonedas**: Bitcoin, Ethereum
- **7-Eleven**: Similar a OXXO

## Preguntas Frecuentes

**¿Puedo retirar a OXXO?**
No, OXXO solo funciona para depósitos. Para retiros usa transferencia bancaria o e-wallets.

**¿Hay comisiones?**
OXXO no cobra, pero algunos casinos añaden 3-5% de comisión.

**¿Es seguro?**
Sí, es uno de los métodos más seguros ya que no compartes datos bancarios.

**¿Qué pasa si pierdo el comprobante?**
Contacta al soporte del casino con fecha y hora del pago.

## Conclusión

OXXO es ideal para jugadores mexicanos que valoran la privacidad y no tienen acceso a métodos de pago tradicionales. Su facilidad de uso y amplia disponibilidad lo convierten en una excelente opción para comenzar en los casinos online.`,
    author: 'Miguel Torres',
    author_role: 'Especialista en Pagos',
    category: 'Guías',
    tags: ['OXXO', 'depósitos', 'métodos pago', 'tutorial', 'méxico'],
    featured_image: '/images/blog/depositar-oxxo.jpg',
    published_at: new Date('2024-01-10').toISOString(),
    read_time: 6,
    views: 5234,
    likes: 412,
    status: 'published',
    seo_title: 'Depositar con OXXO en Casinos Online 2024 | Guía Completa',
    seo_description: 'Aprende cómo depositar en casinos online usando OXXO. Guía paso a paso, límites, tiempos y los mejores casinos que aceptan OXXO.',
    seo_keywords: ['depositar oxxo', 'casinos oxxo', 'pagar con oxxo', 'métodos de pago méxico']
  }
];

async function initBlogTable() {
  try {
    console.log('🔍 Checking if blog_posts table exists...');
    
    // Try to fetch from the table
    const { data: existingPosts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);
    
    if (fetchError && fetchError.message.includes('relation') && fetchError.message.includes('does not exist')) {
      console.log('❌ Table blog_posts does not exist');
      console.log('⚠️  Please create the blog_posts table in Supabase first');
      console.log('\nSQL to create the table:');
      console.log(`
CREATE TABLE blog_posts (
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

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
      `);
      return;
    }
    
    if (fetchError) {
      console.error('Error checking table:', fetchError);
      return;
    }
    
    console.log('✅ Table blog_posts exists');
    
    // Check if there are any posts
    const { data: posts, error: countError } = await supabase
      .from('blog_posts')
      .select('id, title');
    
    if (countError) {
      console.error('Error counting posts:', countError);
      return;
    }
    
    console.log(`📊 Current posts in database: ${posts?.length || 0}`);
    
    if (!posts || posts.length === 0) {
      console.log('📝 Adding sample blog posts...');
      
      // Insert sample posts
      for (const post of samplePosts) {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(post)
          .select();
        
        if (error) {
          console.error(`❌ Error inserting post "${post.title}":`, error.message);
        } else {
          console.log(`✅ Added post: ${post.title}`);
        }
      }
      
      console.log('\n✅ Blog posts initialization complete!');
    } else {
      console.log('ℹ️  Blog posts already exist in the database');
      console.log('Sample posts:', posts.slice(0, 3).map(p => p.title));
    }
    
  } catch (error) {
    console.error('Error in initBlogTable:', error);
  }
}

// Run the initialization
initBlogTable();