/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export so it can be served from GitHub Pages (this repo).
  // The export root IS the site root: / is the homepage, /brain-dump/ the app.
  output: 'export',
  // Emit each route as a directory with index.html (GitHub Pages friendly).
  trailingSlash: true,
  // No Next.js image optimization server in a static export.
  images: { unoptimized: true },
};

export default nextConfig;
