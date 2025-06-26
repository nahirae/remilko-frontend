"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Timer, Bookmark, BookmarkCheck, Flame, Utensils, Loader2 } from "lucide-react";
import { addFavorite, removeFavorite } from "@/lib/favorites";
import toast from "react-hot-toast";

type Props = {
  id: string;
  title: string;
  image: string;
  user?: string;
  profile?: string;
  cook_time?: number;
  label?: string;
  rating?: number;
  calories?: number;
  initialIsBookmarked: boolean;
  onBookmarkToggle: (recipeId: string, isFavorited: boolean) => void;
};

export default function RecipeCard({
  id,
  title,
  image,
  user = "Pengguna",
  profile = "/asset/profile.png",
  cook_time = 0,
  label = "Umum",
  rating = 0,
  calories = 0,
  initialIsBookmarked,
  onBookmarkToggle,
}: Props) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsBookmarked(initialIsBookmarked);
  }, [initialIsBookmarked]);

  const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Mencegah navigasi saat tombol bookmark di-klik
    e.stopPropagation(); 
    e.preventDefault();

     if (isBookmarking) return;
    setIsBookmarking(true);
    const newBookmarkStatus = !isBookmarked;

    try {
      if (newBookmarkStatus) {
        await addFavorite(id);
        toast.success("Ditambahkan ke favorit!");
      } else {
        await removeFavorite(id);
        toast.success("Dihapus dari favorit.");
      }
      
      setIsBookmarked(newBookmarkStatus);
      onBookmarkToggle(id, newBookmarkStatus);
      router.refresh(); 

     } catch (error) {
      console.error("Gagal memperbarui status bookmark:", error);
      toast.error("Gagal menyimpan perubahan.");
    } finally {
      setIsBookmarking(false); 
    }
  };

  return (
    <Link
      href={`/DetailResep/${id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-[9.7cm] block cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg pb-3 truncate group-hover:text-orange-600 transition-colors">{title}</h3>

        <div className="flex items-center justify-between mt-2 text-gray-700 text-sm gap-2">
          <div className="flex gap-1.5 items-center"><Timer className="w-4 h-4" /><span>{cook_time} menit</span></div>
          <div className="flex gap-1.5 items-center"><Utensils className="w-4 h-4" /><span>{label || "Umum"}</span></div>
          <div className="flex gap-1.5 items-center"><Flame className="w-4 h-4" /><span>{calories} Cals</span></div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-gray-700 font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img src={profile} alt={user} className="w-8 h-8 rounded-full object-cover" />
            <span className="font-medium">{user}</span>
          </div>

          <button
            onClick={handleBookmark}
            disabled={isBookmarking}
            className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-100 hover:bg-gray-200 transition z-10 disabled:cursor-not-allowed"
            aria-label="Bookmark resep"
          >
            {isBookmarking ? (
              <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
            ) : isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-orange-500" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}