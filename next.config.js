/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ['tmhljvjopcvshlnaztmq.supabase.co'],
    },
  };
  
  module.exports = nextConfig;