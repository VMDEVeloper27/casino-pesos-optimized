#!/bin/bash

# Fix dark theme colors in all pages

echo "Fixing dark theme colors in all pages..."

# Define the files to fix
FILES=(
  "src/app/[locale]/bonos/page.tsx"
  "src/app/[locale]/guias/page.tsx"
  "src/app/[locale]/comparar/page.tsx"
  "src/app/[locale]/blog/page.tsx"
  "src/app/[locale]/bonos/[category]/page.tsx"
  "src/app/[locale]/metodos-pago/page.tsx"
  "src/app/[locale]/metodos-pago/[method]/page.tsx"
  "src/app/[locale]/contacto/page.tsx"
  "src/app/[locale]/sobre-nosotros/page.tsx"
  "src/app/[locale]/juego-responsable/page.tsx"
  "src/app/[locale]/casinos/[id]/page.tsx"
  "src/app/[locale]/blog/[slug]/page.tsx"
)

# Common replacements
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Background colors
    sed -i '' 's/bg-neutral-900/bg-gray-50/g' "$file"
    sed -i '' 's/bg-neutral-800/bg-white/g' "$file"
    sed -i '' 's/bg-neutral-700/bg-gray-100/g' "$file"
    sed -i '' 's/bg-neutral-600/bg-gray-200/g' "$file"
    sed -i '' 's/bg-slate-900/bg-gray-50/g' "$file"
    sed -i '' 's/bg-slate-800/bg-white/g' "$file"
    sed -i '' 's/bg-slate-700/bg-gray-100/g' "$file"
    
    # Text colors
    sed -i '' 's/text-white/text-gray-900/g' "$file"
    sed -i '' 's/text-neutral-300/text-gray-600/g' "$file"
    sed -i '' 's/text-neutral-400/text-gray-500/g' "$file"
    sed -i '' 's/text-neutral-500/text-gray-400/g' "$file"
    sed -i '' 's/text-slate-300/text-gray-600/g' "$file"
    sed -i '' 's/text-slate-400/text-gray-500/g' "$file"
    sed -i '' 's/text-slate-500/text-gray-400/g' "$file"
    
    # Border colors
    sed -i '' 's/border-neutral-700/border-gray-200/g' "$file"
    sed -i '' 's/border-neutral-600/border-gray-300/g' "$file"
    sed -i '' 's/border-slate-700/border-gray-200/g' "$file"
    sed -i '' 's/border-slate-600/border-gray-300/g' "$file"
    
    # Hover states
    sed -i '' 's/hover:bg-neutral-700/hover:bg-gray-50/g' "$file"
    sed -i '' 's/hover:bg-neutral-600/hover:bg-gray-100/g' "$file"
    sed -i '' 's/hover:bg-slate-700/hover:bg-gray-50/g' "$file"
    sed -i '' 's/hover:bg-slate-600/hover:bg-gray-100/g' "$file"
    
    # Primary colors
    sed -i '' 's/text-primary\">/text-primary-600\">/g' "$file"
    sed -i '' 's/text-accent\">/text-green-600\">/g' "$file"
    sed -i '' 's/bg-primary\">/bg-primary-600\">/g' "$file"
    sed -i '' 's/bg-accent\">/bg-green-600\">/g' "$file"
    
    echo "  Fixed $file"
  fi
done

echo "Dark theme fix complete!"