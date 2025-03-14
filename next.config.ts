import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'etfemzvydvqmmumoyyki.supabase.co',
        port: '',
        search: '',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'shiny-space-telegram-r444646qvrxr35w77-3000.app.github.dev'
      ],
    },
  },
};

export default nextConfig;
