/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export so it can be served from GitHub Pages (this repo).
  output: 'export',
  // Served at https://jonwlin.github.io/brain-dump/
  basePath: '/brain-dump',
  // Emit each route as a directory with index.html (GitHub Pages friendly).
  trailingSlash: true,
  // No Next.js image optimization server in a static export.
  images: { unoptimized: true },
};

export default nextConfig;
