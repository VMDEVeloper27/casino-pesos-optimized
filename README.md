# CasinosPesos - Casino Comparison Platform

A modern, SEO-optimized casino comparison website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎰 **Casino Comparison**: Compare multiple casinos side-by-side
- 💰 **Bonus Tracking**: Track and display casino bonuses and promotions
- 🎮 **Game Catalogs**: Comprehensive game listings for each casino
- 💳 **Payment Methods**: Detailed payment method information
- 📱 **Responsive Design**: Mobile-first, fully responsive design
- 🌍 **Multi-language**: Support for Spanish and English
- 🔍 **SEO Optimized**: Built with SEO best practices
- ⚡ **Fast Performance**: Optimized with Next.js 15 and WebP images
- 🛡️ **Admin Panel**: Full-featured admin panel for content management

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Framer Motion
- **Database**: JSON file-based (easily replaceable with any database)
- **Image Optimization**: Sharp for WebP conversion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/casinospesos.git
cd casinospesos
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

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
├── data/                   # JSON database
└── scripts/                # Utility scripts
\`\`\`

## Features Overview

### Admin Panel
- Casino management (CRUD operations)
- Media library for image uploads
- Content management
- Blog system

### Public Website
- Homepage with featured casinos
- Casino listing with filtering
- Individual casino pages
- Casino comparison tool
- Bonus categories
- Payment methods guide
- Blog section

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