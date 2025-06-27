'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import RecipeCard from "./RecipeCard"; 
import { getMyCreatorRecipes, getPublicRecipes, type Recipe } from "@/lib/recipes";
import { getProfile } from '@/lib/auth';

interface FormData {
  username: string;
  name: string;
  photo_user: '/asset/profile.png';
}

// import { getAllCategories, type RecipeCategory } from "@/lib/category";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [publicRecipes, setPublicRecipes] = useState<Recipe[]>([]);
  // const [categories, setCategories] = useState<RecipeCategory[]>([]);
  // const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const router = useRouter();
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
          // favoriteResponse, 
          // categoryResponse
        ] = await Promise.all([
          getMyCreatorRecipes(),
          getPublicRecipes({ page: 1 }),
          // getFavorites(),
          // getAllCategories(),
        ]);

        setMyRecipes(myRecipesResponse.recipes);
        setPublicRecipes(publicRecipesResponse.recipes);
        // setFavoriteIds(new Set(favoriteResponse.map((fav) => fav.id)));
        // setCategories(categoryResponse);
      } catch (err: any) {
        console.error("Gagal mengambil data kreator:", err);
        setError(err.message || "Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   const handleBookmarkToggle = (recipeId: string, isFavorited: boolean) => {
    //   const newFavoriteIds = new Set(favoriteIds);
    //   if (isFavorited) newFavoriteIds.add(recipeId);
    //   else newFavoriteIds.delete(recipeId);
    //   setFavoriteIds(newFavoriteIds);
    // };

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


  if (loading) {
    return (
      <section className="py-12 px-8 text-center text-gray-600">
        <p>Memuat Dashboard...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-8 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  const myRecipesPreview = recipes.slice(0, 4); 
  const popularRecipesPreview = recipes.slice(4, 12);

  return (
    <section className="py-8 px-8">
      <div className="flex-grow flex items-center justify-center mb-10 p-8 rounded-xl">
        <img 
          src="/asset/slice.png" 
          alt="slice" 
          className="w-lg rounded-xl mr-5"
        />
        <div className="ml-8">
          <p className="font-bold text-center text-3xl">Bagikan Resep Anda</p>
          <p className="text-gray-700 text-sm p-5 mb-10">
            Ada rasa yang tak bisa diungkapkan kata-kata - aroma masakan yang membangkitkan kenangan, 
            makanan pertama yang kamu buat dan hidangan sederhana yang selalu menghangatkan hari. 
            Yuk, bagikan resepmu dan biarkan rasanya mengalir dalam cerita.
          </p>
          <Link
            href="/TambahResep"
            className="w-full bg-blue-900 text-white py-3 ml-44 rounded-lg hover:bg-blue-800 text-center p-10"
          >
            Buat Resep Baru
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Resep Terbaru Kamu</h2>
          <p className="text-gray-600 mt-2 text-sm">Ini daftar resep milikmu yang telah dipublikasikan.</p>
        </div>
        <Link href="/ResepSaya" className="text-gray-600 hover:underline font-medium">Lihat Semua</Link>
      </div>

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
        <div className="text-center py-10 border-t mt-4"><p className="text-gray-500">Anda belum membuat resep apapun.</p></div>
      )}

      <div className="flex items-center justify-between mt-10 mb-6">
        <div>
          <h2 className="text-3xl font-bold">Resep yang Sedang Populer</h2>
          <p className="text-gray-600 mt-2 text-sm">Lihat apa yang sedang populer di komunitas.</p>
        </div>
        <Link href="/RecipeALL" className="text-gray-600 hover:underline font-medium">Lihat Semua</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {popularRecipesPreview.map((recipe) => (
          <RecipeCard
            key={`public-${recipe.id}`}
            id={recipe.id}
            title={recipe.title}
            image={recipe.photo}
            user={recipe.user?.name || "Kreator"}
            cook_time={recipe.cook_time}
            label={recipe.label}
            rating={recipe.rating}
            calories={0}
            initialIsBookmarked={bookmarkedIds.includes(recipe.id)}
            onBookmarkToggle={() => toggleBookmark(recipe.id)}
          />
        ))}
      </div>

      {/* 
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
          >
            <div className="w-24 h-24 bg-white rounded-xl shadow p-2 flex items-center justify-center hover:shadow-lg">
              <img src={`/asset/${cat.photo_category}`} alt={cat.category_name} className="w-full h-full object-contain" />
            </div>
            <p className="text-sm font-medium group-hover:text-orange-600">{cat.category_name}</p>
          </Link>
        ))}
      </div> 
      */}

      <div className="m-2 mt-16 rounded-xl bg-blue-50">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl pl-10 bg-transparent mt-4">
            <p className="text-3xl font-semibold">
            Setiap Orang Bisa Menjadi Koki di Dapur Mereka Sendiri
            </p>
            <p className="text-gray-600 mt-10 text-sm">Resep kami adalah jantung dan jiwa komunitas kuliner kami, 
            dan resep kami mencerminkan komitmen kami untuk memberi Anda pengalaman bersantap yang berkesan dan menyenangkan.</p>
            <button className="px-6 py-3 bg-blue-900 text-white rounded-xl mb-7 mt-16">Pelajari Lebih Lanjut</button>
          </div>
          <img src="/asset/cook.png" alt="Dish" className="w-[500px]" />
        </div>
      </div>
    </section>
  );
}
