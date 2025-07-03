// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State baru untuk melacak status login

  // Tentukan apakah sedang di halaman dashboard atau bukan
  const isDashboardPage = pathname.startsWith('/sidebar/dashboard'); // Menggunakan /sidebar/dashboard
  // Tentukan apakah sedang di halaman login ATAU register
  const isAuthPage = pathname === '/login' || pathname === '/regis';

  // Periksa status login saat komponen di-mount dan saat ada perubahan di localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        // Set true jika token ada, false jika tidak ada
        setIsLoggedIn(!!token);
      }
    };

    checkLoginStatus(); // Pemeriksaan awal saat komponen dimuat

    // Event listener untuk melacak perubahan localStorage (misalnya, logout dari tab lain)
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      // Pastikan menghapus event listener yang benar saat komponen unmount
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []); // Hanya berjalan sekali saat komponen di-mount

  // Item navigasi untuk halaman publik
  const publicNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/kontak-kami' },
    { label: 'About us', href: '/tentang-kami' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Efek untuk menutup dropdown jika klik di luar area dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token dari localStorage
    setIsLoggedIn(false); // Perbarui status login lokal
    router.push('/login'); // Arahkan ke halaman login
    setIsDropdownOpen(false); // Tutup dropdown
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Remilko. Selalu tampil */}
        <div className="text-xl font-bold italic text-black">
          <Link href={isDashboardPage ? "/sidebar/dashboard" : "/"}>Remilko.</Link>
        </div>

        {/* Bagian Kanan Navbar: Konten dinamis berdasarkan status login dan halaman */}
        <div className="flex items-center space-x-4">
          {/* PERUBAHAN DI SINI: Baik di Dashboard maupun setelah Login (halaman publik), gunakan dropdown profil */}
          {(isDashboardPage || isLoggedIn) ? (
            // Skenario 2 & 4: Pengguna SUDAH Login (halaman publik) ATAU di Halaman Dashboard Admin - Tampilkan Icon Profil dengan Dropdown
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-2xl text-gray-600 hover:text-yellow-600 focus:outline-none"
              >
                <FaUserCircle />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                  {/* Tampilkan "Profil", "Contact", "About us" selalu jika sudah login */}
                  <Link
                    href="/profil"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                  <Link
                    href="/kontak-kami"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/tentang-kami"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    About us
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {isDashboardPage ? "Logout Admin" : "Logout"} {/* Ubah teks logout sesuai halaman */}
                  </button>
                </div>
              )}
            </div>
          ) : isAuthPage && !isLoggedIn ? (
            // Skenario 1: Halaman Login/Register DAN pengguna BELUM login - Tidak ada apa-apa kecuali logo
            // Biarkan kosong, karena logo sudah di render di sisi kiri.
            null
          ) : (
            // Skenario 3: Pengguna BELUM Login (di halaman publik non-login/register) - Tampilkan Navigasi, Search, Login/Register
            <>
              {/* Navigasi Publik */}
              <nav className="hidden md:flex space-x-8 text-sm font-medium text-black">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-yellow-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Search bar dinonaktifkan sementara (false &&) */}
              {false && (
                <div className="relative w-96 hidden sm:block">
                  <input
                    type="text"
                    placeholder="Cari Resep, Bahan Masakan, Pengguna..."
                    className="w-full pl-4 pr-24 py-2 text-sm border border-gray-300 text-black placeholder:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-full text-sm font-medium">
                    Search
                  </button>
                </div>
              )}

              {/* Tombol Login & Register */}
              <Link
                href="/login"
                className="px-4 py-2 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 text-sm font-medium transition hidden sm:block"
              >
                Login
              </Link>
              <Link
                href="/regis"
                className="px-4 py-2 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 text-sm font-medium transition hidden sm:block"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
