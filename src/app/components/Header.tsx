'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Recipes', href: '/resep' },
    { label: 'Contact', href: '/kontak-kami' },
    { label: 'About us', href: '/tentang-kami' },
  ];

  const isPublicPage = !pathname.startsWith('/dashboard');
  if (!isPublicPage) return null;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center space-x-10">
          <div className="text-xl font-bold italic text-black">
            <Link href="/">Remilko.</Link>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-medium text-black">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-yellow-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search + Buttons */}
        <div className="flex items-center space-x-4">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Cari Resep, Bahan Masakan, Pengguna..."
              className="w-full pl-4 pr-24 py-2 text-sm border border-gray-300 text-black placeholder:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-full text-sm font-medium">
              Search
            </button>
          </div>

          {/* Tombol Login & Register */}
          <Link
            href="/sign-in"
            className="px-4 py-2 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 text-sm font-medium transition"
          >
            Login
          </Link>
          <Link
            href="/regis"
            className="px-4 py-2 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 text-sm font-medium transition"
          >
            Register
          </Link>

          {/* Icon Profil */}
          <button className="text-2xl text-gray-600 hover:text-yellow-600">
            <FaUserCircle />
          </button>
        </div>
      </div>
    </header>
  );
}
