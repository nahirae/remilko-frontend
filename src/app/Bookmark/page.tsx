"use client";
import { useEffect, useState } from "react";
import RecipeCard from "../dashboard/components/RecipeCard";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import { getFavorites } from "@/lib/favorites";

export default function Bookmark() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// useEffect(() => {
//   const fetchFavorites = async () => {
//     try {
//       const res = await getFavorites();
//     } catch (err) {
//       setError("Gagal mengambil data favorit");
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchFavorites();
// }, []);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedRecipes");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <h2 className="text-3xl font-bold pl-10 pt-10 pb-5">Resep Favorit</h2>
      <div className="flex flex-wrap gap-10 justify-center">
        {bookmarks.map((r, i) => (
          <RecipeCard
            key={r.id}
            id={r.id}
            title={r.title}
            image={r.image}
            user={r.user}
            profile={r.profile}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
