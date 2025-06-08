"use client";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import RecipeCard from "../dashboard/components/RecipeCard";
import { getRecipes } from "@/lib/recipes";
import type { Recipe } from "@/lib/recipes";
import { useEffect, useState } from 'react';

const categories = [
  "Salad",
  "Sarapan",
  "Makan Siang",
  "Makan Malam",
  "Snack",
  "Minuman",
];

const ingredients = {
  A: [
    "Ayam",
    "Ati Ampela",
    "Abon",
    "Asparagus",
    "Apukat",
    "Ayam Kampung",
    "Apel",
  ],
  B: [
    "Bawang Merah",
    "Bawang Putih",
    "Bawang Bombai",
    "Brokoli",
    "Bayam",
    "Bakso",
    "Bihun",
    "Buncis",
  ],
  C: [
    "Cabai (rawit, merah, keriting)",
    "Cumi-cumi"],
   D: [
    "Daun Jeruk",
    "Daun Bawang",
    "Daun Salam",
    "Daun Pandan",
    "Daun Kelor",
    "Daging Ayam",
    "Daging Sapi",
    "Daging Kambing"
  ],
  E: [
    "Ebi",
    "Ebi Kering"
  ],
  F: [
    "Furikake"
  ],
  G: [
    "Garam",
    "Gula Pasir",
    "Gula Jawa",
    "Gula Aren",
    "Garam Himalaya",
    "Garam Laut"
  ],
  H: [
    "Hati Ayam",
    "Hati Sapi",
    "Hati Ampela",
    "Hati Kambing",
    "Hati Bebek"
  ],
  I: [
    "Ikan Tuna",
    "Ikan Lele",
    "Ikan Tongkol",
    "Ikan Kembung",
    "Ikan Bandeng"
  ],
  J: [
    "Jamur Tiram",
    "Jamur Kancing",
    "Jamur Kuping",
    "Jamur Enoki"
  ],
  K: [
    "Kentang",
    "Kacang Panjang",
    "Kacang Merah",
    "Kacang Tanah",
    "Kacang Hijau",
    "Kol",
    "Kubis"
  ],
  L: [
    "Lada",
    "Lengkuas",
    "Lemon",
    "Lada Hitam",
    "Laos",
    "Leunca"
  ],
  M: [
    "Minyak Goreng",
    "Margarin",
    "Mentega",
    "Mie",
    "Mie Instan",
    "Minyak Wijen"
  ],
  N: [
    "Nasi",
    "Nasi Putih",
    "Nasi Merah",
    "Nasi Jagung"
  ],
  O: [
    "Oregano",
    "Oncom"
  ],
  P: [
    "Penyedap Rasa",
    "Petai",
    "Pepaya",
    "Pisang",
    "Pala",
    "Peterseli",
    "Paprika"
  ],
  Q: [
    "Quinoa"
  ],
  R: [
    "Roti Tawar",
    "Roti Gandum",
    "Roti Burger",
    "Roti Lapis"
  ],
  S: [
    "Sosis",
    "Susu Cair",
    "Susu Kental Manis",
    "Santan",
    "Sawi",
    "Seledri",
    "Saos Tiram",
    "Saos Tomat",
    "Saos Sambal"
  ],
  T: [
    "Telur",
    "Tempe",
    "Tahu",
    "Tepung Terigu",
    "Tepung Beras",
    "Tepung Maizena"
  ],
  U: [
    "Udang",
    "Ubi",
    "Ubi Ungu",
    "Ubi Jalar"
  ],
  V: [
    "Vanili",
    "Vetsin"
  ],
  W: [
    "Wortel",
    "Wijen"
  ],
  X: [],
  Y: [
    "Yakult",
    "Yoghurt"
  ],
  Z: [
    "Zaitun",
    "Zucchini"
  ]
};

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { recipes } = await getRecipes();
        setRecipes(recipes);
      } catch (err: any) {
        setError(err.message || "Gagal memuat resep.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Navbar />

      <div className="flex px-10 py-10 gap-10 flex-grow">
        <div className="w-1/4">
          <h2 className="text-3xl font-bold mb-2">Pilihan</h2>
          <hr className="bg-blue-900 w-24 border-none rounded h-1 mb-5" />
          <div className="border border-blue-900 rounded-xl p-5">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Kategori</h3>
              <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                  <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                  {cat}
                  </span>
              ))}
              </div>
          </div>
          <hr className="bg-blue-900 w-full border-none rounded h-1 mb-5" />

          <div>
          <h3 className="font-semibold mb-2">Bahan - bahan</h3>
          <div className="max-h-64 overflow-y-auto pr-2">
            {Object.entries(ingredients).map(([letter, items]) => (
              <div key={letter} className="mb-4">
                <h4 className="font-bold text-blue-900">{letter}</h4>
                {items.map((item, idx) => (
                  <div key={idx}>
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="form-checkbox" />
                      <span>{item}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
            
        <div className="w-3/4">
          <h2 className="text-3xl font-bold mb-2">Resep</h2>
          <hr className="bg-blue-900 w-24 border-none rounded h-1 mb-5" />
          {loading && (
            <div className="text-center py-10 text-gray-500">Memuat resep...</div>
          )}

          {error && (
            <div className="text-center text-red-500 py-10">{error}</div>
          )}

          <div className="flex flex-wrap gap-10 justify-center">
            {recipes.map((r, i) => (
              <RecipeCard
                key={r.id}
                title={r.title}
                image={r.photo}
                user={r.user || "Konten Kreator"}
                profile={r.profile || "/asset/profile.png"} // default klo belum ada dari be
                cook_time={r.cook_time}
                category={r.category || "Umum"}
                rating={r.rating}
                calories={0} 
              />
            ))}
          </div>

          <div className="flex justify-center mt-10 space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`w-10 h-10 rounded-full border ${
                  num === 1 ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
