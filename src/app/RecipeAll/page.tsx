'use client';

import { useEffect, useState } from 'react';
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import RecipeCard from "../dashboard/components/RecipeCard";
import { getRecipes } from "@/lib/recipes";
import type { Recipe } from "@/lib/recipes";

export default function RecipeAll() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { recipes } = await getRecipes();
        setRecipes(recipes);
      } catch (err: any) {
        setError(err.message || "Gagal memuat resep.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <h2 className="text-3xl font-bold pl-10 pt-10 pb-5">Semua Resep</h2>

      {loading && (
        <div className="text-center py-10 text-gray-500">Memuat resep...</div>
      )}

      {error && (
        <div className="text-center text-red-500 py-10">{error}</div>
      )}

      <div className="flex flex-wrap gap-10 justify-center">
        {recipes.map((r, i) => (
          <RecipeCard
            key={r.id}
            title={r.title}
            image={r.photo}
            user={r.user || "Konten Kreator"}
            profile={r.profile || "/asset/profile.png"} // default klo belum ada dari be
            cook_time={r.cook_time}
            category={r.category || "Umum"}
            rating={r.rating}
            calories={0} // sementara, bisa fetch dari /recipes/:id/nutritions kalau butuh
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
