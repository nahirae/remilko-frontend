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
        <div className="flex-grow flex items-center justify-center mb-10">
            <img 
            src="/asset/slice.png" 
            alt="slice" 
            className="w-xl rounded-xl mr-5"
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

      <div className="flex items-center text-center justify-center mt-20">
        <div className="flex-col lg:flex-row">
          <h2 className="text-3xl font-bold">Kategori Resep</h2>
          <p className="text-gray-600 mb-6 mt-2">Butuh ide? Pilih kategori favoritmu disini.</p>
        </div>
      </div>

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
