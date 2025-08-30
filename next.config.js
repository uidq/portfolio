/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    
    eslint: {
        ignoreDuringBuilds: true,
    },
    
    images: {
        unoptimized: true, // Required for static export
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
            },
            {
                protocol: 'https',
                hostname: 'r2.fivemanage.com',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000,
    },
    
    experimental: {
        // Disable CSS optimization to avoid critters dependency issue with static export
        // optimizeCss: true,
    },
    
    compress: true,
    
    poweredByHeader: false,
    
    swcMinify: true,
}

module.exports = nextConfig