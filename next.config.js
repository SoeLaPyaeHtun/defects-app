// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true,
    },
  };
  
  module.exports = nextConfig;