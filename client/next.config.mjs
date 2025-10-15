/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  output: 'export', //  enables static export (replaces next export)
};

export default nextConfig;
