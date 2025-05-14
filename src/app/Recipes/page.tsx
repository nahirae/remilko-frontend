"use client";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import RecipeCard from "../dashboard/components/RecipeCard";

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
  C: ["Cabai (rawit, merah, keriting)", "Cumi-cumi"],
};

const recipes = [
  {
    title: "Creamy Pasta dan Daging Ayam",
    image: "/asset/img1.png",
    user: "Hani Nafilah",
    profile: "/asset/profile.png",
  },
  {
    title: "Bola - bola Daging Ayam Krim Keju",
    image: "/asset/img2.png",
    user: "Najwah Kamila",
    profile: "/asset/profile.png",
  },
  {
    title: "Nasi Ayam Sederhana",
    image: "/asset/img3.png",
    user: "Albert Flores",
    profile: "/asset/profile.png",
  },
  {
    title: "Creamy Pasta dan Daging Ayam",
    image: "/asset/img4.png",
    user: "Hani Nafilah",
    profile: "/asset/profile.png",
  },
  {
    title: "Bola - bola Daging Ayam Krim Keju",
    image: "/asset/img5.png",
    user: "Najwah Kamila",
    profile: "/asset/profile.png",
  },
  {
    title: "Nasi Ayam Sederhana",
    image: "/asset/img6.png",
    user: "Albert Flores",
    profile: "/asset/profile.png",
  },
];

export default function Recipes() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
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
            
        <div className="w-3/4">
          <h2 className="text-3xl font-bold mb-2">Resep</h2>
          <hr className="bg-blue-900 w-24 border-none rounded h-1 mb-5" />
          <div className="grid grid-cols-3 gap-6">
            {recipes.map((r, i) => (
              <RecipeCard
                key={i} title={r.title} image={r.image} user={r.user} profile={r.profile}
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
