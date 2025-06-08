"use client";

import Navbar from "@/app/dashboard/components/Navbar";
import Footer from "@/app/dashboard/components/Footer";
import CookingSteps from "./CookingSteps";
import PreviewRecook from "./PreviewRecook";
import Comentar from "./Comentar";
import { Timer, Utensils, Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getAuth, postAuth } from "@/lib/api";

type Recipe = {
  title: string;
  description: string;
  photo: string;
  category: string;
  cook_time: number;
  created_at: string;
};

type Nutrition = {
  name: string;
  amount: number;
  unit: string;
};

type Step = {
  step_number: number;
  description: string;
};

type Ingredient = {
  name: string;
  amount: string;
};

type Tool = {
  name: string;
};

export default function ReceiptInformation({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [nutritions, setNutritions] = useState<Nutrition[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const [recipeRes, stepsRes, nutritionRes, ingredientsRes, toolsRes] = await Promise.all([
          getAuth(`/user/recipes/${params.id}`, token),
          getAuth(`/user/recipes/${params.id}/steps`, token),
          getAuth(`/user/recipes/${params.id}/nutritions`, token),
          getAuth(`/user/recipes/${params.id}/ingredients`, token),
          getAuth(`/user/recipes/${params.id}/tools`, token),
        ]);

        const favoriteCheck = await postAuth("/user/favorites/check", { recipe_id: params.id }, token);
        setIsBookmarked(favoriteCheck.is_favorited);

        setRecipe(recipeRes);
        setSteps(stepsRes || []);
        setNutritions(Array.isArray(nutritionRes) ? nutritionRes : []);
        setIngredients(Array.isArray(ingredientsRes) ? ingredientsRes : []);
        setTools(Array.isArray(toolsRes) ? toolsRes : []);
      } catch (err: any) {
        setError(err.message || "Gagal memuat data. Pastikan server berjalan.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const toggleBookmark = async () => {
    const token = localStorage.getItem("token");

    try {
      if (isBookmarked) {
        await deleteAuth(`/user/recipes/${params.id}/favorites`, token);
        setIsBookmarked(false);
        toast.success("Dihapus dari favorit.");
      } else {
        await postAuth(`/user/recipes/${params.id}/favorites`, {}, token);
        setIsBookmarked(true);
        toast.success("Ditambahkan ke favorit.");
      }
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui status favorit.");
      toast.error("Terjadi kesalahan saat memperbarui favorit.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!recipe) return <div className="text-center py-10">Resep tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Toaster position="top-center" />
      <Navbar />
      <p className="text-3xl font-bold pl-10 pt-10 pb-5">{recipe.title || "Judul tidak tersedia"}</p>
      <div className="flex items-center justify-between mt-2 text-gray-700 w-xl pl-5 text-sm gap-2">
        <div className="flex gap-2.5">
          <img src="/asset/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover ml-4" />
          <span>
            <p className="font-bold text-xs pb-1">Renjana Braga</p>
            <p className="text-xs">{recipe.created_at ? new Date(recipe.created_at).toLocaleDateString("id-ID") : "Tanggal tidak tersedia"}</p>
          </span>
        </div>
        <div className="flex gap-2.5">
          <Timer />
          <span>
            <p className="text-xs font-bold pb-1">Persiapan</p>
            <p className="text-xs">10 Menit</p>
          </span>
        </div>
        <div className="flex gap-2.5">
          <Timer />
          <span>
            <p className="text-xs font-bold pb-1">Waktu Masak</p>
            <p className="text-xs">{recipe.cook_time || "Tidak tersedia"} Menit</p>
          </span>
        </div>
        <div className="flex gap-2.5">
          <Utensils className="h-5 w-5" />
          <span>
            <p className="text-xs pt-1">{recipe.category || "Tidak tersedia"}</p>
          </span>
        </div>
      </div>
      <div className="justify-items-end rounded-full mr-10 mt-4 flex justify-end">
        <button
          onClick={toggleBookmark}
          className="flex items-center justify-center rounded-full w-10 h-10 bg-[#C9D7DD]"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-orange-600" />
          ) : (
            <Bookmark className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      <div className="flex justify-between pt-5">
        <img
          className="rounded-xl w-[700px] pl-10"
          src={recipe.photo ? `/asset/${recipe.photo}` : "/asset/placeholder.png"}
          alt={recipe.title || "Gambar tidak tersedia"}
        />
        <div className="rounded-xl bg-[#C9D7DD] p-7 ml-8 mr-10 w-full">
          <p className="font-bold text-xl mb-5">Informasi Nutrisi</p>
          {nutritions.length > 0 ? (
            <>
              {nutritions.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <p>{item.name || "Tidak diketahui"}</p>
                    <p className="font-bold">
                      {item.amount || "0"} {item.unit || ""}
                    </p>
                  </div>
                  <hr className="text-gray-400 my-2" />
                </div>
              ))}
            </>
          ) : (
            <p className="text-sm text-gray-600">Informasi nutrisi tidak tersedia.</p>
          )}
        </div>
      </div>
      <p className="p-10 text-gray-600">{recipe.description || "Deskripsi tidak tersedia."}</p>
      <CookingSteps recipe={recipe} steps={steps} ingredients={ingredients} tools={tools} />
      <PreviewRecook />
      <Comentar recipeId={params.id} />
      <Footer />
    </div>
  );
}
