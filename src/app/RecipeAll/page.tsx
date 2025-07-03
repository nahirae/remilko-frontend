"use client";

import { useEffect, useState } from "react";
import Navbar from "../dashboard/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "../dashboard/components/RecipeCard";
import { getNutritions } from "@/lib/nutrition";
import { getFavorites } from "@/lib/favorites";
import { getRecipes, type Recipe } from "@/lib/recipes";
import { getAllCategoriesFromRecipes } from "@/lib/category";
import { useSearchParams, useRouter } from "next/navigation";
import CategoryFilter from "../dashboard/components/CategoryFilter";

export default function RecipeAll() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [nutritions, setNutritions] = useState<{ [key: string]: number }>({});
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  // Sync selectedCategory from URL
  useEffect(() => {
    const urlCategory = searchParams.get("category") || '';
    setSelectedCategory(urlCategory);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { recipes: allRecipes } = await getRecipes();

        const categories = await getAllCategoriesFromRecipes();
        setCategories(categories);

        const favorites = await getFavorites();
        const favoritedIds = new Set(favorites.map((fav: any) => fav.recipe_id.toString()));
        setFavoriteRecipeIds(favoritedIds);

        const nutritionPromises = allRecipes.map((recipe) =>
          getNutritions(recipe.id.toString()).then((nutritions) => {
            if (!Array.isArray(nutritions)) return { id: recipe.id.toString(), calorie: 0 };
            const calorie = nutritions.find((n) => n.nutrition_name === "Kalori")?.nutrition_value || 0;
            return { id: recipe.id.toString(), calorie };
          })
        );

        const nutritionResults = await Promise.all(nutritionPromises);
        const nutritionsMap: { [key: string]: number } = {};
        nutritionResults.forEach((result) => {
          nutritionsMap[result.id] = result.calorie;
        });
        setNutritions(nutritionsMap);

        setRecipes(allRecipes);
        setCurrentPage(1);
      } catch (err: any) {
        setError(err.message || "Gagal memuat resep.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = selectedCategory
      ? recipes.filter((r) =>
          r.categories?.some((cat) =>
            cat.category_name.toLowerCase() === selectedCategory.toLowerCase()
          )
        )
      : recipes;

    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [recipes, selectedCategory]);

  const handleFavoriteToggle = (recipeId: string, isFavorited: boolean) => {
    setFavoriteRecipeIds((prev) => {
      const newSet = new Set(prev);
      isFavorited ? newSet.add(recipeId) : newSet.delete(recipeId);
      return newSet;
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    const query = selected ? `?category=${selected}` : '';
    router.push(`/recipe${query}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="px-10 pt-10 pb-5 flex justify-between items-center">
        <h2 className="text-3xl font-bold">Semua Resep</h2>
        {/* <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="p-2 border rounded"
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select> */}
        {/* <CategoryFilter
        onSelectCategory={(selected) => {
          setSelectedCategory(selected);
          const query = selected ? `?category=${selected}` : "";
          router.push(`/RecipeAll${query}`);
        }}
        /> */}
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Memuat resep...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Belum ada resep sesuai kategori
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-10 justify-center">
            {currentRecipes.map((r) => (
              <RecipeCard
                key={r.id}
                id={r.id}
                title={r.title}
                image={r.photo}
                user={r.user || "Konten Kreator"}
                profile={r.profile || "/asset/profile.png"}
                cook_time={r.cook_time}
                label={r.label}
                rating={r.rating}
                calories={nutritions[r.id.toString()] || 0}
                initialIsBookmarked={favoriteRecipeIds.has(r.id.toString())}
                onBookmarkToggle={handleFavoriteToggle}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Sebelumnya
              </button>
              <span className="text-sm">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Selanjutnya
              </button>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}
