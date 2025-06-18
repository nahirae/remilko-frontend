import Navbar from "../Dashboard/Components/Navbar";
import Footer from "../Dashboard/Components/Footer";
import RecipeCard from "../Dashboard/Components/RecipeCard";
import Link from "next/link";

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
      image: "/asset/img4.png",
      user: "Hani Nafilah",
      profile: "/asset/profile.png"
    },
    {
      title: "Bola - bola Daging Ayam Krim Keju",
      image: "/asset/img5.png",
      user: "Najwah Kamila",
      profile: "/asset/profile.png"
    },
    {
      title: "Nasi Ayam Sederhana",
      image: "/asset/img6.png",
      user: "Albert Flores",
      profile: "/asset/profile.png" 
    },
];

export default function ResepSaya() {
  return (
    <div className="min-h-full bg-white text-black">
      <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center p-5">
          <div className="bg-gray-100 shadow-md rounded-2xl pb-8 w-full max-w-md text-center relative">
            <div className="flex-grow flex items-center justify-center">
              <div className="bg-[#c7a956] w-20 h-20 rounded-b-full flex items-center justify-center">
                <img
                    src="/asset/profile.png"
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">Naya Nasywa</h2>
            <p className="text-gray-500 text-sm">@hiraetna</p>
            <p className="text-gray-700 text-sm mt-1 mb-7">127 Resep</p>
            <Link 
            href="/TambahResep"
            className=" bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Tambah Resep Baru
            </Link>
            </div>
        </div>

        <h2 className="text-3xl font-bold px-8">Resep yang Sering Dikunjungi</h2>
        <div className="flex flex-wrap gap-10 justify-center"> 
            {recipes.map((r, i) => (
                <RecipeCard key={i} title={r.title} image={r.image} user={r.user} profile={r.profile} />
            ))}
        </div>

      <Footer />
    </div>
  );
}
