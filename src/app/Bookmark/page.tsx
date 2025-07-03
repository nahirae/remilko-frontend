"use client";

import { useState, useEffect } from "react";
import Navbar from "../dashboard/components/Navbar";
import Footer from "@/components/Footer";
import { getFavorites, FavoriteRecipe } from "@/lib/favorites";
import RecipeCard from "@/app/dashboard/components/RecipeCard";

export default function BookmarksPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoritesFromServer = async () => {
      setLoading(true);
      try {
        const data = await getFavorites();
        setFavoriteRecipes(data);
      } catch (err) {
        console.error("Gagal mengambil data favorit:", err);
        setError("Tidak dapat memuat resep favorit. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesFromServer();
  }, []);

  const handleToggleBookmark = (recipeId: string, isFavorited: boolean) => {
    if (!isFavorited) {
      setFavoriteRecipes((current) =>
        current.filter((fav) => fav.recipe.id !== recipeId)
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold pl-10 pt-10 pb-5">Resep Favorit</h2>
          <p className="text-center text-gray-500 mt-10">Memuat bookmark...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold pl-10 pt-10 pb-5">Resep Favorit</h2>

        {error && <p className="text-center text-red-500 mt-10">{error}</p>}

        {!error && favoriteRecipes.length > 0 ? (
          <div className="flex flex-wrap gap-10 justify-center">
            {favoriteRecipes
            .filter((favorite) => favorite.recipe !== null) // skip jika recipe sudah dihapus dari DB
            .map((favorite, idx) => (
              <RecipeCard
                key={`${favorite.recipe.id}-${idx}`}
                id={favorite.recipe.id}
                title={favorite.recipe.title}
                image={favorite.recipe.photo}
                cook_time={favorite.recipe.cook_time}
                label={favorite.recipe.label}
                rating={favorite.recipe.rating}
                user={favorite.recipe.user || "Konten Kreator"}
                profile={favorite.recipe.profile || "/asset/profile.png"}
                calories={0}
                initialIsBookmarked={true}
                onBookmarkToggle={(recipeId, isFavorited) =>
                  handleToggleBookmark(recipeId, isFavorited)
                }
              />
            ))}
          </div>
        ) : (
          !error && (
            <p className="text-center text-gray-500 mt-10">
              Anda belum memiliki resep favorit.
            </p>
          )
        )}
      </main>
      <Footer />
    </div>
  );
}
