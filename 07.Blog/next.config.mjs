/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '**',
      },
  ]
  //* correspond à un segment de chemin unique ou à un sous-domaine
  // ** correspond à n'importe quel nombre de segments de chemin à la fin ou de sous-domaines au début
}
};

export default nextConfig;
