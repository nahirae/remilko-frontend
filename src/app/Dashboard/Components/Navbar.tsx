'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <Link href="/dashboard">
        <h1 className="text-2xl font-bold text-gray-900">
          Remilko<span className="text-orange-500">.</span>
        </h1>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/dashboard">Home</Link>
        <Link href="/Recipes">Recipes</Link>
        <Link href="/Contact">Contact</Link>
        <Link href="/AboutUs">About us</Link>
      </div>

      <div className="flex items-center justify-center text-center">
        <form onSubmit={handleSearch}>
          <div className="flex bg-white w-lg p-1 border border-gray-200 rounded-xl justify-between">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Resep, Bahan Masakan, Konten Kreator..."
              className="text-sm ml-4 w-96 focus:outline-none"
            />
            <button className="bg-[#608BC1] text-white px-6 py-2 rounded-xl hover:bg-[#6282a9]">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Link href="/Profile">
            <img
              src="/asset/profile.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border cursor-pointer"
            />
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-900"
            >
              Log in
            </Link>

            <Link
              href="/regis"
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
