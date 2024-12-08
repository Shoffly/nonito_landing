/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'nztwxdxvqncqwjmirasr.supabase.co', // Supabase storage domain
      'yourcdn.com', // Your CDN domain
      'nonito.link' // Your website domain
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
