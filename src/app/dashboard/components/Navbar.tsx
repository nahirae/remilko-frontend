"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { globalSearch } from "@/lib/search";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>({
    recipes: [],
    ingredients: [],
    creators: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleSearchDebounced = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults({ recipes: [], ingredients: [], creators: [] });
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);
        const res = await globalSearch(query);
        setSearchResults(res.data);
      } catch (err) {
        console.error("Search Error", err);
      } finally {
        setIsSearching(false);
      }
    }, 400),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(true);
    handleSearchDebounced(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowDropdown(false);
    }
  };

  const handleItemClick = (url: string) => {
    router.push(url);
    setShowDropdown(false);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm relative">
      <Link href="/dashboard">
        <h1 className="text-2xl font-bold text-gray-900">
          Remilko<span className="text-orange-500">.</span>
        </h1>
      </Link>

      <div className="flex text-black items-center gap-6">
        <Link href="/dashboard">Home</Link>
        <Link href="/Recipes">Recipes</Link>
        <Link href="/Contact">Contact</Link>
        <Link href="/AboutUs">About us</Link>
      </div>

      <div className="flex items-center justify-center text-center relative">
        <form onSubmit={handleSubmit}>
          <div className="flex bg-white w-lg p-1 border border-gray-200 rounded-xl justify-between">
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Cari Resep, Bahan Masakan, Konten Kreator..."
              className="text-sm text-black ml-4 w-96 focus:outline-none"
            />
            <button className="bg-[#608BC1] text-white px-6 py-2 rounded-xl hover:bg-[#6282a9]">
              Search
            </button>
          </div>
        </form>

        {showDropdown && (
          <div className="absolute top-full left-0 z-50 mt-1 w-full bg-white border shadow-md rounded-lg p-4">
            {isSearching ? (
              <p className="text-sm text-gray-400">Mencari...</p>
            ) : searchResults.recipes.length === 0 &&
              searchResults.ingredients.length === 0 &&
              searchResults.creators.length === 0 ? (
              <p className="text-sm text-gray-500">Tidak ditemukan hasil</p>
            ) : (
              <ul>
                {searchResults.recipes.map((item: any) => (
                  <li
                    key={item.id}
                    className="text-sm py-1 cursor-pointer hover:text-blue-500"
                    onClick={() => handleItemClick(`/DetailResep/${item.id}`)}
                  >
                    Resep: {item.title}
                  </li>
                ))}
                {searchResults.ingredients.map((item: any, idx: number) => (
                  <li
                    key={`ing-${idx}`}
                    className="text-sm py-1 cursor-pointer hover:text-blue-500"
                    onClick={() => handleItemClick(`/DetailResep/${item.recipe_id}`)}
                  >
                    Bahan: {item.ingredient_name}
                  </li>
                ))}
                {searchResults.creators.map((item: any) => (
                  <li
                    key={item.id}
                    className="text-sm py-1 cursor-pointer hover:text-blue-500"
                    onClick={() => handleItemClick(`/Profile/${item.id}`)}
                  >
                    Kreator: {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
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
            <Link href="/login" className="text-gray-700 hover:text-blue-900">
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
