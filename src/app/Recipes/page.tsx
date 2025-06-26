"use client";

import { useEffect, useState, useCallback } from 'react';
import debounce from "lodash.debounce";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import RecipeCard from "../dashboard/components/RecipeCard";
import { getRecipes, type Recipe, type Pagination } from "@/lib/recipes";
import { getFavorites } from "@/lib/favorites";

const categories = ["Salad", "Sarapan", "Makan Siang", "Makan Malam", "Snack", "Minuman"];
const ingredients = {
  A: ["Ayam", "Ati Ampela", "Abon", "Asparagus", "Apukat", "Ayam Kampung", "Apel"],
  B: ["Bawang Merah", "Bawang Putih", "Bawang Bombai", "Brokoli", "Bayam", "Bakso", "Bihun", "Buncis"],
  C: ["Cabai (rawit, merah, keriting)", "Cumi-cumi"],
  D: ["Daun Jeruk", "Daun Bawang", "Daun Salam", "Daun Pandan", "Daun Kelor", "Daging Ayam", "Daging Sapi", "Daging Kambing"],
  E: ["Ebi", "Ebi Kering"],
  F: ["Furikake"],
  G: ["Garam", "Gula Pasir", "Gula Jawa", "Gula Aren", "Garam Himalaya", "Garam Laut"],
  H: ["Hati Ayam", "Hati Sapi", "Hati Ampela", "Hati Kambing", "Hati Bebek"],
  I: ["Ikan Tuna", "Ikan Lele", "Ikan Tongkol", "Ikan Kembung", "Ikan Bandeng"],
  J: ["Jamur Tiram", "Jamur Kancing", "Jamur Kuping", "Jamur Enoki"],
  K: ["Kentang", "Kacang Panjang", "Kacang Merah", "Kacang Tanah", "Kacang Hijau", "Kol", "Kubis"],
  L: ["Lada", "Lengkuas", "Lemon", "Lada Hitam", "Laos", "Leunca"],
  M: ["Minyak Goreng", "Margarin", "Mentega", "Mie", "Mie Instan", "Minyak Wijen"],
  N: ["Nasi", "Nasi Putih", "Nasi Merah", "Nasi Jagung"],
  O: ["Oregano", "Oncom"],
  P: ["Penyedap Rasa", "Petai", "Pepaya", "Pisang", "Pala", "Peterseli", "Paprika"],
  Q: ["Quinoa"],
  R: ["Roti Tawar", "Roti Gandum", "Roti Burger", "Roti Lapis"],
  S: ["Sosis", "Susu Cair", "Susu Kental Manis", "Santan", "Sawi", "Seledri", "Saos Tiram", "Saos Tomat", "Saos Sambal"],
  T: ["Telur", "Tempe", "Tahu", "Tepung Terigu", "Tepung Beras", "Tepung Maizena"],
  U: ["Udang", "Ubi", "Ubi Ungu", "Ubi Jalar"],
  V: ["Vanili", "Vetsin"],
  W: ["Wortel", "Wijen"],
  X: [],
  Y: ["Yakult", "Yoghurt"],
  Z: ["Zaitun", "Zucchini"],
};

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(debounce(async (page, category, ingredients) => {
    setLoading(true);
    setError(null);
    try {
      const [recipeData, favoriteData] = await Promise.all([
        getRecipes({ page, category, ingredients }),
        getFavorites(),
      ]);
      setRecipes(recipeData.recipes);
      setPagination(recipeData.pagination);
      setFavoriteIds(new Set(favoriteData.map(fav => fav.id)));
    } catch (err: any) {
      setError(err.message || "Gagal memuat resep.");
    } finally {
      setLoading(false);
    }
  }, 300), []);

  useEffect(() => {
    fetchData(currentPage, activeCategory, selectedIngredients);
  }, [currentPage, activeCategory, selectedIngredients, fetchData]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(prev => (prev === category ? null : category));
    setCurrentPage(1);
  };

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients(prev => {
      const newIngredients = new Set(prev);
      newIngredients.has(ingredient) ? newIngredients.delete(ingredient) : newIngredients.add(ingredient);
      return Array.from(newIngredients);
    });
    setCurrentPage(1);
  };

  const handleBookmarkToggle = (recipeId: string, isFavorited: boolean) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      isFavorited ? newSet.add(recipeId) : newSet.delete(recipeId);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Navbar />
      <div className="flex px-10 py-10 gap-10 flex-grow">
        <aside className="w-1/4">
          <h2 className="text-3xl font-bold mb-2">Pilihan</h2>
          <hr className="bg-blue-900 w-24 border-none rounded h-1 mb-5" />
          <div className="border border-gray-300 rounded-xl p-5 sticky top-24">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Kategori</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      activeCategory === cat
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <hr className="bg-gray-200 h-px mb-5" />
            <div>
              <h3 className="font-semibold mb-2">Bahan - bahan</h3>
              <div className="max-h-96 overflow-y-auto pr-2">
                {Object.entries(ingredients).map(([letter, items]) => (
                  items.length > 0 && (
                    <div key={letter} className="mb-4">
                      <h4 className="font-bold text-blue-900">{letter}</h4>
                      {items.map((item) => (
                        <div key={item}>
                          <label className="flex items-center space-x-2 text-sm cursor-pointer my-1">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                              checked={selectedIngredients.includes(item)}
                              onChange={() => handleIngredientChange(item)}
                            />
                            <span>{item}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="w-3/4">
          <h2 className="text-3xl font-bold mb-2">Resep</h2>
          <hr className="bg-blue-900 w-24 border-none rounded h-1 mb-5" />
          
          {loading && <div className="text-center py-10">Mencari resep...</div>}
          {error && <div className="text-center py-10 text-red-500">{error}</div>}
          
          {!loading && !error && (
            <>
              {recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recipes.map((r) => (
                    <RecipeCard
                      key={r.id}
                      id={r.id}
                      title={r.title}
                      image={r.photo}
                      user={r.user || "Konten Kreator"}
                      cook_time={r.cook_time}
                      label={r.label}
                      rating={r.rating}
                      initialIsBookmarked={favoriteIds.has(r.id)}
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">Tidak ada resep yang cocok dengan filter Anda.</div>
              )}

              {pagination && pagination.total_pages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                  <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="px-4 py-2 border rounded disabled:opacity-50">Sebelumnya</button>
                  <span>Halaman {pagination.current_page} dari {pagination.total_pages}</span>
                  <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === pagination.total_pages} className="px-4 py-2 border rounded disabled:opacity-50">Selanjutnya</button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}