"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "@/app/Dashboard/Components/Navbar";
import Footer from "@/app/Dashboard/Components/Footer";
import CookingSteps from "./CookingSteps";
import PreviewRecook from "./PreviewRecook";
import Comentar from "./Comentar";

import { Timer, Utensils, Bookmark, BookmarkCheck } from "lucide-react";
import { getRecipeById, type Recipe } from "@/lib/recipes";
// import { addFavorite, removeFavorite } from "@/lib/favorites";
// import { postAuth } from "@/lib/api";

export default function ReceiptInformation({ recipeId }: { recipeId: string }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false); // dummy toggle
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!recipeId) {
      setLoading(false);
      setError("ID Resep tidak valid.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const recipeResponse = await getRecipeById(recipeId);
        setRecipe(recipeResponse.recipe);

        // ❌ Khusus kreator: belum ada endpoint check bookmark
        // const favoriteCheck = await postAuth(`/user/favorites/check`, { recipe_id: recipeId });
        // setIsBookmarked(favoriteCheck.is_favorited);

      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err.message || "Gagal memuat detail resep.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  // Fitur bookmark hanya dummy untuk kreator (karena route belum disediakan)
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      !isBookmarked ? "Ditandai (dummy - kreator)" : "Dihapus dari bookmark (dummy)"
    );

    // ❌ Belum tersedia untuk kreator
    // try {
    //   if (!isBookmarked) {
    //     await addFavorite(recipe.id);
    //     toast.success("Resep ditambahkan ke favorit.");
    //   } else {
    //     await removeFavorite(recipe.id);
    //     toast.success("Resep dihapus dari favorit.");
    //   }
    // } catch (err) {
    //   setIsBookmarked(!isBookmarked);
    //   toast.error("Gagal memperbarui favorit.");
    // }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg bg-white text-gray-600">
        Memuat...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 p-4">
        {error}
      </div>
    );

  if (!recipe)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Resep tidak ditemukan.
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Toaster position="top-center" />
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{recipe.title}</h1>

        <div className="flex flex-wrap items-center justify-between mt-4 text-gray-700 text-sm gap-y-4 gap-x-6">
          <div className="flex items-center gap-3">
            <img
              src={recipe.user?.photo_user || "/asset/profile.png"}
              alt={recipe.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>
              <p className="font-bold text-gray-900">{recipe.user?.name || "User"}</p>
              <p className="text-xs text-gray-500">
                {new Date(recipe.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-gray-500" />
            <span>
              <p className="text-xs font-bold">Waktu Masak</p>
              <p>{recipe.cook_time || 0} Menit</p>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-gray-500" />
            <span>
              <p className="text-xs font-bold">Kategori</p>
              <p>{recipe.category || "Umum"}</p>
            </span>
          </div>

          <button
            onClick={toggleBookmark}
            className="flex items-center justify-center rounded-full w-12 h-12 bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Bookmark"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-6 h-6 text-orange-600" />
            ) : (
              <Bookmark className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full lg:w-2/3">
            <img
              className="rounded-xl w-full h-auto object-cover aspect-video shadow-lg"
              src={recipe.photo || "/asset/placeholder.png"}
              alt={recipe.title}
            />
            <p className="mt-8 text-gray-600 leading-relaxed">{recipe.description}</p>
          </div>

          <div className="w-full lg:w-1/3 rounded-xl bg-blue-50 p-6 border border-blue-100">
            <h3 className="font-bold text-xl mb-4 text-gray-900">Informasi Nutrisi</h3>
            {recipe.nutrition && recipe.nutrition.length > 0 ? (
              <div className="space-y-2">
                {recipe.nutrition.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b border-gray-200 py-2 text-sm"
                  >
                    <p className="text-gray-600">{item.nutrition_name}</p>
                    <p className="font-bold text-gray-800">
                      {item.nutrition_value} {item.nutrition_unit}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Informasi nutrisi tidak tersedia.
              </p>
            )}
          </div>
        </div>

        <CookingSteps
          steps={recipe.steps || []}
          ingredients={recipe.ingredients || []}
          tools={recipe.tools || []}
        />

        <PreviewRecook recooks={recipe.recooks || []} />

        <Comentar
          recipeId={recipeId}
          initialComments={recipe.recipeComment || []}
        />
      </main>

      <Footer />
    </div>
  );
}
