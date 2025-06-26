'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import RecipeCard from "./RecipeCard";
import { ThumbsUp, Share2 } from "lucide-react";
import { getRecipes, type Recipe } from "@/lib/recipes";
import { getFavorites } from "@/lib/favorites";
import { getRecooksByRecipe, type Recook } from "@/lib/recook";
import { getAllCategories, type RecipeCategory } from "@/lib/category";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [previewRecooks, setPreviewRecooks] = useState<Recook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecookPreview = async () => {
      try {
        const recipeList = await getRecipes();
        const recipes = recipeList.recipes;
        if (!recipes || recipes.length === 0) return;

        const maxTries = 5; // coba sampai 5 resep random
        let foundRecooks: Recook[] = [];

        for (let i = 0; i < maxTries; i++) {
          const randomIndex = Math.floor(Math.random() * recipes.length);
          const randomRecipe = recipes[randomIndex];

          const recooks = await getRecooksByRecipe(randomRecipe.id);
          if (recooks.length > 0) {
            foundRecooks = recooks.slice(0, 3);
            break;
          }
        }

        setPreviewRecooks(foundRecooks);
      } catch (error) {
        console.error("Gagal memuat recook preview:", error);
      }
    };

  fetchRecookPreview();
}, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipeResponse, favoriteResponse, categoryResponse] = await Promise.all([
          getRecipes(),
          getFavorites(),
          getAllCategories()
        ]);

        setRecipes(recipeResponse.recipes);
        setFavoriteIds(new Set(favoriteResponse.map((fav) => fav.recipe_id.toString())));
        setCategories(categoryResponse);
      } catch (err: any) {
        console.error("Gagal memuat data untuk komponen Recipes:", err);
        setError(err.message || "Gagal memuat data halaman.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookmarkToggle = (recipeId: string, isFavorited: boolean) => {
    const newFavoriteIds = new Set(favoriteIds);
    if (isFavorited) {
      newFavoriteIds.add(recipeId);
    } else {
      newFavoriteIds.delete(recipeId);
    }
    setFavoriteIds(newFavoriteIds);
  };

  if (loading) {
    return (
      <section className="py-12 px-8 text-center">
        <p className="text-gray-500">Memuat resep-resep terbaik untukmu...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-8 text-center">
        <p className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-12 px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Resep yang Lagi Trend Nih!</h2>
          <p className="text-gray-600 mt-2 text-sm">Yuk cobain resep yang lagi nge-trend ini pasti kamu suka</p>
        </div>
        <Link href="/RecipeAll" className="text-gray-600 hover:underline font-medium">
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {recipes.slice(0, 4).map((r) => (
          <RecipeCard
            key={`trend-${r.id}`}
            id={r.id}
            title={r.title}
            image={r.photo}
            user={r.user || "Konten Kreator"}
            profile={r.profile || "/asset/profile.png"}
            cook_time={r.cook_time}
            label={r.label}
            rating={r.rating}
            calories={0}
            initialIsBookmarked={favoriteIds.has(r.id)}
            onBookmarkToggle={handleBookmarkToggle}
          />
        ))}
      </div>
      <div className="m-2 mt-16 rounded-xl bg-blue-50">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl p-8 lg:pl-10">
            <p className="text-3xl font-semibold">Setiap Orang Bisa Menjadi Koki di Dapur Mereka Sendiri</p>
            <p className="text-gray-600 mt-6 text-sm mb-7">
              Resep kami adalah jantung dan jiwa komunitas kuliner kami, dan resep kami mencerminkan komitmen kami untuk memberi Anda pengalaman bersantap yang berkesan dan menyenangkan.
            </p>
            <Link
            href="/AboutUs"
            className="px-6 py-3 bg-blue-900 text-white rounded-xl"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
          <img src="/asset/cook.png" alt="Cooking illustration" className="w-full max-w-md lg:w-[500px]" />
        </div>
      </div>
      <div className="flex items-center justify-between mb-6 mt-10">
        <div>
          <h2 className="text-3xl font-bold">Explore Resep Enak Andalanmu</h2>
          <p className="text-gray-600 mt-2 text-sm">Masak apa ya hari ini? Yuk cari inspirasi dari dapur kosanmu!</p>
        </div>
        <Link href="/RecipeAll" className="text-gray-600 hover:underline font-medium">
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {recipes.slice(0, 4).map((r) => (
          <RecipeCard
            key={`trend-${r.id}`}
            id={r.id}
            title={r.title}
            image={r.photo}
            user={r.user || "Konten Kreator"}
            profile={r.profile || "/asset/profile.png"}
            cook_time={r.cook_time}
            label={r.label}
            rating={r.rating}
            calories={0}
            initialIsBookmarked={favoriteIds.has(r.id)}
            onBookmarkToggle={handleBookmarkToggle}
          />
        ))}
      </div>
      <div className="flex items-center text-center justify-center mt-20">
        <div>
          <h2 className="text-3xl font-bold">Kategori Resep</h2>
          <p className="text-gray-600 mb-6 mt-2">Butuh ide? Pilih kategori favoritmu disini.</p>
        </div>
      </div>
      <div className="flex gap-10 w-full justify-center flex-wrap">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/RecipeAll?category=${encodeURIComponent(cat.category_name)}`}
            className="flex flex-col items-center gap-3 group"
            legacyBehavior>
            <div className="w-24 h-24 bg-white rounded-xl shadow p-2 flex items-center justify-center hover:shadow-lg transition-shadow">
              <img src={`/asset/${cat.photo_category}`} alt={cat.category_name} className="w-full h-full object-contain" />
            </div>
            <p className="text-sm font-medium group-hover:text-orange-600">{cat.category_name}</p>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between mt-20">
        <div>
          <h2 className="text-3xl font-bold">Resep Dari Konten Kreator</h2>
          <p className="text-gray-600 mb-6 mt-2">Cobain masak resep dari konten kreator favoritmu!</p>
        </div>
        <Link href="/KontenKreator" className="text-gray-600 hover:underline">Lihat Semua</Link>
      </div>
      <div className="flex gap-10 overflow-x-auto pb-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex-shrink-0 bg-gray-50 rounded-xl shadow-md overflow-hidden w-full max-w-xs">
            <div className="bg-[#c7a956] flex items-center gap-3 mb-1 mt-4 p-1 w-48 rounded-r-full">
              <img src="/asset/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover ml-4" />
              <div>
                <p className="font-semibold text-white text-sm">Najwah Kamila</p>
                <p className="text-xs text-gray-100">127 Resep</p>
              </div>
            </div>
            <div className="flex justify-between p-3 text-left">
              <img src="/asset/img2.png" alt="Resep" className="w-28 h-24 object-cover rounded-lg" />
              <div className="w-40 pl-3">
                <h3 className="text-[16px] font-semibold">Bola - bola Daging Ayam Krim Keju</h3>
                <button className="text-xs text-gray-500 mt-2 hover:underline">Lihat Semua Resep</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-20">
        <div>
          <h2 className="text-3xl font-bold">Hasil Recook Resep</h2>
          <p className="text-gray-600 mb-6 mt-2">Yuk, bikin versi recook -mu juga !</p>
        </div>
        <Link href="/Recook" className="text-gray-600 hover:underline">Lihat Semua</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewRecooks.length > 0 ? (
  previewRecooks.map((recook) => (
    <div key={recook.id} className="bg-gray-50 rounded-xl shadow-md p-4">
      <div className="flex items-center gap-3 mb-2">
        <img src={recook.user?.photo_user || "/asset/profile.png"} alt="User" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-sm">{recook.recipe?.title || "Judul Resep"}</p>
          <p className="text-xs text-gray-500">{recook.user?.name || "Pengguna"}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-yellow-500 text-sm">
        {Array(5).fill(null).map((_, idx) => (
          (<span key={idx}>{idx < 4 ? "★" : "☆"}</span>) // Opsional: sesuaikan dengan rating jika ada
        ))}
      </div>
      <p className="text-sm text-gray-700 mt-2">“{recook.description || 'Recook ini belum ada deskripsi.'}”</p>
      <img src={recook.photo_recook || "/asset/img1.png"} alt="Recook" className="w-full h-48 object-cover mt-2 rounded-xl" />
      <div className="flex text-sm text-gray-600 mt-3 items-center">
        <span className="flex cursor-pointer items-center gap-1 hover:text-blue-600">
          <ThumbsUp className="w-5 h-5" /> 0
        </span>
        <span className="flex gap-1 cursor-pointer ml-7 items-center hover:text-blue-600">
          <Share2 className="w-5 h-5" /> Share
        </span>
      </div>
    </div>
  ))
) : (
  <p className="text-sm text-gray-500">Belum ada hasil recook yang bisa ditampilkan.</p>
)}

      </div>
    </section>
  );
}
