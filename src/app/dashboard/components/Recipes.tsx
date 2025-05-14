import RecipeCard from "./RecipeCard";
import { ThumbsUp, Share2 } from "lucide-react";
import Link from "next/link";

export default function Recipes() {
  const recipes = [
    {
      title: "Creamy Pasta dan Daging Ayam",
      image: "/asset/img1.png",
      user: "Hani Nafilah",
      profile: "/asset/profile.png"
    },
    {
      title: "Bola - bola Daging Ayam Krim Keju",
      image: "/asset/img2.png",
      user: "Najwah Kamila",
      profile: "/asset/profile.png"
    },
    {
      title: "Nasi Ayam Sederhana",
      image: "/asset/img3.png",
      user: "Albert Flores",
      profile: "/asset/profile.png" 
    },
    {
      title: "Creamy Pasta dan Daging Ayam",
      image: "/asset/img1.png",
      user: "Hani Nafilah",
      profile: "/asset/profile.png"
    },
    {
      title: "Bola - bola Daging Ayam Krim Keju",
      image: "/asset/img2.png",
      user: "Najwah Kamila",
      profile: "/asset/profile.png"
    },
    {
      title: "Nasi Ayam Sederhana",
      image: "/asset/img3.png",
      user: "Albert Flores",
      profile: "/asset/profile.png" 
    },
  ];

  return (
    <section className="py-12 px-8">
      <div className="flex items-center justify-between">
        <div className="flex-col lg:flex-row">
          <h2 className="text-3xl font-bold">Resep yang Lagi Trend Nih!</h2>
          <p className="text-gray-600 mb-6 mt-2 text-sm">Yuk cobain resep yang lagi nge-trend ini pasti kamu suka</p>
        </div>
        <Link
        href="/Recipe"
        className="text-gray-600 hover:underline"
        >
          Lihat Semua
        </Link>
        
      </div>

      <div className="flex flex-wrap gap-10"> 
        {recipes.map((r, i) => (
          <RecipeCard key={i} title={r.title} image={r.image} user={r.user} profile={r.profile} />
        ))}
      </div>

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

      <div className="flex items-center justify-between mt-20">
        <div className="flex-col lg:flex-row">
          <h2 className="text-3xl font-bold">Explore Resep Enak Andalanmu</h2>
          <p className="text-gray-600 mb-6 mt-2">Masak apa ya hari ini? Yuk cari inspirasidari dapur kosanmu!</p>
        </div>
        
        <Link
        href="/Recipe"
        className="text-gray-600 hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="flex flex-wrap gap-10">
        {recipes.map((r, i) => (
          <RecipeCard key={i} title={r.title} image={r.image} user={r.user} profile={r.profile} />
        ))}
      </div>

      <div className="flex items-center text-center justify-center mt-20">
        <div className="flex-col lg:flex-row">
          <h2 className="text-3xl font-bold">Kategori Resep</h2>
          <p className="text-gray-600 mb-6 mt-2">Butuh ide? Pilih kategori favoritmu disini.</p>
        </div>
      </div>

      {/* <div className="flex gap-10 w-full justify-center flex-wrap">
        {["Sarapan", "Makan Siang", "Makan Malam", "Salad", "Minuman", "Snack"].map((kategori, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="w-30 h-35 bg-white rounded-xl shadow p-2 flex items-center justify-center">
              <img src={`/asset/kategori1-${i + 1}.png`} alt={kategori} className="w-full h-full object-contain" />
            </div>
            <p className="text-sm">{kategori}</p>
          </div>
        ))}
      </div> */}

      <div className="flex gap-10 w-full justify-center flex-wrap">
        <div className="flex flex-col items-center gap-3">
          <div className="w-30 h-35 bg-white rounded-xl shadow p-2 flex items-center justify-center">
            <img src={`/asset/kategori1.png`} alt="kategori1" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm">Sarapan</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-30 h-35 bg-white rounded-xl shadow p-2 flex items-center justify-center">
            <img src={`/asset/kategori2.png`} alt="kategori1" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm">Makan Siang</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-30 h-35 bg-white rounded-xl shadow p-2 flex items-center justify-center">
            <img src={`/asset/kategori3.png`} alt="kategori1" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm">Makan Malam</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-30 h-35 bg-white rounded-xl shadow p-2 flex items-center justify-center">
            <img src={`/asset/kategori4.png`} alt="kategori1" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm">Salad</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-30 h-35 bg-white rounded-xl shadow p-2 flex items-center justify-center">
            <img src={`/asset/kategori5.png`} alt="kategori1" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm">Minuman</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-30 h-35 bg-white rounded-xl shadow p-2 flex items-center justify-center">
            <img src={`/asset/ketegori6.png`} alt="kategori1" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm">Snack</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-20">
        <div className="flex-col lg:flex-row">
          <h2 className="text-3xl font-bold">Resep Dari Konten Kreator</h2>
          <p className="text-gray-600 mb-6 mt-2">Cobain masak resep dari konten kreator favoritmu!</p>
        </div>
        
        <Link
        href="/KontenKreator"
        className="text-gray-600 hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="flex gap-10">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-gray-50 rounded-xl shadow-md overflow-hidden w-full max-w-[9.7cm]">
            <div className="bg-[#c7a956] flex items-center gap-3 mb-1 mt-4 p-1 w-48 rounded-r-full">
              <img src="/asset/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover ml-4" />
              <div>
                <p className="font-semibold text-gray-50 text-sm ">Najwah Kamila</p>
                <p className="text-xs text-gray-100">127 Resep</p>
              </div>
            </div>
            <div className="flex justify-between p-3 text-left ">
              <img src="/asset/img2.png" alt="Resep" className="w-38 h-24 object-cover rounded-lg" />
              <div className=" w-40">
                <h3 className="mt-2 mb-3 text-[16px] font-semibold">Bola - bola Daging Ayam Krim Keju</h3>
                <button className="text-xs text-gray-500 mt-2.5 hover:underline">Lihat Semua Resep</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-20">
        <div className="flex-col lg:flex-row">
          <h2 className="text-3xl font-bold">Hasil Recook Resep</h2>
          <p className="text-gray-600 mb-6 mt-2">Yuk, bikin versi recook -mu juga !</p>
        </div>
        
        <Link
        href="/Recook"
        className="text-gray-600 hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-gray-50 rounded-xl shadow-md p-4">
            <div className="flex items-center gap-3 mb-2">
              <img src="/asset/profile.png" alt="User" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-sm">Fresh Garden Salad</p>
                <p className="text-xs text-gray-500">Lilac Laura</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            </div>

            <p className="text-sm text-gray-700 mt-2">
              “Saya sebagai penggemar pasta, dan resep pasta ini benar-benar mahakarya kuliner dan telah membawa saya terhadap olahan noodle ke tingkat benar-benar baru.”
            </p>

            <img src="/asset/img1.png" alt="Recook" className="w-full h-48 object-cover mt-2 rounded-xl" />

            <div className="flex text-sm text-gray-600 mt-3">
              <span className="flex cursor-pointer items-center gap-1"> <ThumbsUp className="w-5 h-5" /> 1</span>
              <span className="flex gap-1 cursor-pointer ml-7"> <Share2 className="w-5 h-5"/> Share</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
