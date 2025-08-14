# CasinosPesos - Casino Comparison Platform

A modern, SEO-optimized casino comparison website built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎰 **Casino Comparison**: Compare multiple casinos side-by-side
- 💰 **Bonus Tracking**: Track and display casino bonuses and promotions
- 🎮 **Game Catalogs**: Comprehensive game listings for each casino (99+ games)
- 💳 **Payment Methods**: Detailed payment method information (OXXO, SPEI, PayPal, etc.)
- 📱 **Responsive Design**: Mobile-first, fully responsive design
- 🌍 **Multi-language**: Support for Spanish and English
- 🔍 **SEO Optimized**: Built with SEO best practices
- ⚡ **Fast Performance**: Optimized with Next.js 15 and WebP images
- 🛡️ **Admin Panel**: Full-featured admin panel for content management
- 🗄️ **Database Integration**: PostgreSQL via Supabase with real-time capabilities
- 🤖 **MCP Servers**: 6 integrated MCP servers for enhanced development

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Framer Motion
- **Image Optimization**: Sharp for WebP conversion
- **Icons**: Lucide React
- **Backend**: Supabase with Row Level Security

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sobakavbarake/casinospesos.git -b vm
cd casinospesos
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migration (optional - data already migrated):
```bash
npm run migrate
```

5. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
casinospesos/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── [locale]/        # Localized pages
│   │   ├── admin/           # Admin panel
│   │   └── api/             # API routes
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   └── styles/             # Global styles
├── public/                  # Static assets
│   └── uploads/            # Uploaded images
├── data/                   # Legacy JSON files (migrated to Supabase)
└── scripts/                # Utility scripts
\`\`\`

## Database

The project uses **Supabase** (PostgreSQL) for data storage:

- **Casinos**: 13 casinos with full information
- **Games**: 99+ casino games
- **Blog Posts**: 6 SEO-optimized articles
- **Real-time updates**: Instant data synchronization
- **Row Level Security**: Secure data access

### Database Schema

- `casinos` - Casino information, bonuses, features
- `games` - Game catalog with providers and details
- `blog_posts` - Blog articles and SEO content

## Features Overview

### Admin Panel (`/admin`)
- Casino management (CRUD operations)
- Media library for image uploads
- Content management
- Blog system
- Real-time database updates

### Public Website
- Homepage with featured casinos
- Casino listing with filtering
- Individual casino pages
- Casino comparison tool
- Bonus categories
- Payment methods guide (OXXO, SPEI, PayPal)
- Blog section with SEO-optimized content

### Image Optimization
- Automatic WebP conversion
- Responsive image sizing
- Lazy loading

## Environment Variables

Create a \`.env.local\` file:

\`\`\`env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.
EOF < /dev/null