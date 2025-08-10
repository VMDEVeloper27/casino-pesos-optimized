#!/bin/bash

# Create directory if it doesn't exist
mkdir -p public/uploads/casino-logos

echo "Downloading casino logos with curl..."

# User agent to bypass 403 errors
USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Function to download with curl
download_logo() {
    local name=$1
    local url=$2
    local ext=$3
    
    echo "Downloading $name..."
    curl -L -k -H "User-Agent: $USER_AGENT" \
         -H "Accept: image/*" \
         -H "Referer: https://www.google.com" \
         "$url" -o "public/uploads/casino-logos/${name}-logo.${ext}" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✓ Downloaded $name"
    else
        echo "✗ Failed to download $name"
    fi
}

# Download logos from alternative sources
download_logo "caliente" "https://www.caliente.mx/sportsbook/favicon/apple-touch-icon.png" "png"
download_logo "winpot" "https://winpot.mx/favicon.ico" "ico"
download_logo "betano" "https://www.betano.com/favicon.ico" "ico"
download_logo "1xbet" "https://1xbet.com/favicon.ico" "ico"
download_logo "parimatch" "https://www.parimatch.com/favicon.ico" "ico"
download_logo "novibet" "https://www.novibet.mx/favicon.ico" "ico"
download_logo "megapari" "https://megapari.com/favicon.ico" "ico"
download_logo "leon" "https://leon.bet/favicon.ico" "ico"
download_logo "melbet" "https://melbet.com/favicon.ico" "ico"
download_logo "vulkanbet" "https://vulkanbet.com/favicon.ico" "ico"
download_logo "pin-up" "https://pin-up.bet/favicon.ico" "ico"

echo ""
echo "Download complete. Now converting to WebP..."