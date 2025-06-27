'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Navbar from "../Dashboard/Components/Navbar";
import Footer from "../Dashboard/Components/Footer";
import RecipeCard from "../Dashboard/Components/RecipeCard";
import { getMyCreatorRecipes, getPublicRecipes, type Recipe } from "@/lib/recipes";
import { getProfile } from '@/lib/auth';

interface FormData {
  username: string;
  name: string;
  photo_user: '/asset/profile.png';
}

export default function ResepSaya() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [publicRecipes, setPublicRecipes] = useState<Recipe[]>([]);
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

  return (
    <div className="min-h-full bg-white text-black">
      <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center p-5">
          <div className="bg-gray-100 shadow-md rounded-2xl pb-8 w-full max-w-md text-center relative">
            <div className="flex-grow flex items-center justify-center">
              <div className="bg-[#c7a956] w-20 h-20 rounded-b-full flex items-center justify-center">
                <img
                    src={formData.photo_user || '/asset/profile.png'}
                    alt="Profile Illustration"
                    className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col items-center mt-4">
              <h2 className="text-xl font-semibold text-gray-900">{formData.name}</h2>
              <p className="text-gray-500 text-sm">{formData.username}</p>
            </div>

            <p className="text-gray-700 text-sm mt-1 mb-7">{myRecipes.length} Resep</p>
            <Link 
            href="/TambahResep"
            className=" bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Tambah Resep Baru
            </Link>
            </div>
        </div>

        <div className="flex items-center justify-between mb-6 px-8">
          <div>
            <h2 className="text-3xl font-bold">Resep Buatan Kamu!</h2>
            <p className="text-gray-600 mt-2 text-sm">Ini daftar resep milikmu yang telah dipublikasikan.</p>
          </div>
        </div>
        <div className='px-8'>
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
      </div>
      <Footer />
    </div>
  );
}
