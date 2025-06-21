// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Gambar Recook dari public/images/recook/
      new URL('http://127.0.0.1:8000/images/recook/**'),
      new URL('http://localhost:8000/images/recook/**'),

      // Gambar Resep dari public/images/recipe/
      new URL('http://127.0.0.1:8000/images/recipe/**'),
      new URL('http://localhost:8000/images/recipe/**'),

      // Gambar Profile/User dari public/images/profile/ (jika ada)
      new URL('http://127.0.0.1:8000/images/profile/**'),
      new URL('http://localhost:8000/images/profile/**'),

      // Gambar Step dari public/images/recipe/step/ (jika ada)
      new URL('http://127.0.0.1:8000/images/recipe/step/**'),
      new URL('http://localhost:8000/images/recipe/step/**'),

      // Placeholder gambar yang mungkin ada di public/images/ (jika namanya generik)
      // new URL('http://127.0.0.1:8000/images/placeholder-**'),
      // new URL('http://localhost:8000/images/placeholder-**'),
    ],
  },
  // Konfigurasi Next.js lainnya
};

export default nextConfig;
