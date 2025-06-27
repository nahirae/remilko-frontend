"use client";

import { useEffect, useState } from "react";
import Navbar from "../Dashboard/Components/Navbar";
import Footer from "../Dashboard/Components/Footer";
import RecipeCard from "../Dashboard/Components/RecipeCard";
import { getNutritions } from "@/lib/nutrition";
import { getFavorites } from "@/lib/favorites";
import { getAllCategoriesFromRecipes } from "@/lib/category";
import { useSearchParams, useRouter } from "next/navigation";
import { getRecipes, getMyCreatorRecipes, getPublicRecipes, type Recipe } from "@/lib/recipes";
import { getProfile } from '@/lib/auth';

interface FormData {
  username: string;
  name: string;
  photo_user: '/asset/profile.png';
}


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
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [publicRecipes, setPublicRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState<FormData>({
    username: '',
    name: '',
    photo_user: '/asset/profile.png',
  });

    useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const user = await getProfile();
        console.log('Fetched user:', user);
        setFormData({
          username: user.name,
          name: user.name,
          photo_user: '/asset/profile.png'
        });
      } catch (err: any) {
        console.error('Fetch profile error:', err);
        if (err.response?.status === 401) {
          router.push('/login');
        } else {
          setMsg('Gagal mengambil profil. Silakan coba lagi.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const recipeResponse = await getMyCreatorRecipes();
        setRecipes(recipeResponse.recipes);

        const [
          myRecipesResponse, 
          publicRecipesResponse, 
        ] = await Promise.all([
          getMyCreatorRecipes(),
          getPublicRecipes({ page: 1 }),
        ]);

        setMyRecipes(myRecipesResponse.recipes);
        setPublicRecipes(publicRecipesResponse.recipes);
      } catch (err: any) {
        console.error("Gagal mengambil data kreator:", err);
        setError(err.message || "Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('bookmarked') || '[]');
      }
      return [];
    });

    const toggleBookmark = (id: string) => {
      const updated = bookmarkedIds.includes(id)
        ? bookmarkedIds.filter((bid) => bid !== id)
        : [...bookmarkedIds, id];

      setBookmarkedIds(updated);
      localStorage.setItem('bookmarked', JSON.stringify(updated));
    };

  const myRecipesPreview = recipes.slice(0, 4); 
  const popularRecipesPreview = recipes.slice(4, 12);

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

  // useEffect(() => {
  //   const filtered = selectedCategory
  //     ? recipes.filter((r) =>
  //         r.categories?.some((cat) =>
  //           cat.category_name.toLowerCase() === selectedCategory.toLowerCase()
  //         )
  //       )
  //     : recipes;

  //   setFilteredRecipes(filtered);
  //   setCurrentPage(1);
  // }, [recipes, selectedCategory]);

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
      </div>

      {/* {loading ? (
        <div className="text-center py-10 text-gray-500">Memuat resep...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Belum ada resep sesuai kategori
        </div>
      ) : (
        <> */}
          <div className="px-8">
            {myRecipesPreview.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {myRecipesPreview.map((recipe) => (
                  <RecipeCard
                    key={`my-recipe-${recipe.id}`}
                    id={recipe.id}
                    title={recipe.title}
                    image={recipe.photo}
                    user={recipe.user?.name || formData.name}
                    cook_time={recipe.cook_time}
                    label={recipe.label}
                    rating={recipe.rating}
                    calories={0}
                    initialIsBookmarked={bookmarkedIds.includes(recipe.id)}
                    onBookmarkToggle={() => toggleBookmark(recipe.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border-t mt-4"><p className="text-gray-500">Sabar load.</p></div>
            )}
          </div>

          {/* {totalPages > 1 && (
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
      )} */}

      <Footer />
    </div>
  );
}
