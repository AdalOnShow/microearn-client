/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongodb'],
  // Add empty turbopack config to silence the warning
  turbopack: {},
};

export default nextConfig;
