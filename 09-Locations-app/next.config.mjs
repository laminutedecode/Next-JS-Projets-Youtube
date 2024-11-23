/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Protocole requis pour les images distantes (https)
        protocol: "https",
        hostname: 'lh3.googleusercontent.com',
        // Chemin autorisé pour toutes les images de Unsplash
        pathname: "**" // Le double astérisque (**) signifie que tous les chemins d'images sont autorisés
      },
      {
        // Protocole requis pour les images distantes (https)
        protocol: "https",
        hostname: 'githubusercontent.com',
        // Chemin autorisé pour toutes les images de Unsplash
        pathname: "**" // Le double astérisque (**) signifie que tous les chemins d'images sont autorisés
      },
    ],
   
  }
};

export default nextConfig;
