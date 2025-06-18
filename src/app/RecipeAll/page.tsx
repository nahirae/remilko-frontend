import Navbar from "../Dashboard/Components/Navbar";
import Footer from "../Dashboard/Components/Footer";
import RecipeCard from "../Dashboard/Components/RecipeCard";

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

export default function RecipeAll(){
    return(
        <div className="min-h-screen bg-white text-black">
            <Navbar/>
            <h2 className="text-3xl font-bold pl-10 pt-10 pb-5">Semua Resep</h2>
            <div className="flex flex-wrap gap-10 justify-center"> 
                {recipes.map((r, i) => (
                    <RecipeCard key={i} title={r.title} image={r.image} user={r.user} profile={r.profile} />
                ))}
            </div>

            <div className="flex flex-wrap gap-10 justify-center"> 
                {recipes.map((r, i) => (
                    <RecipeCard key={i} title={r.title} image={r.image} user={r.user} profile={r.profile} />
                ))}
            </div>

            <Footer/>
        </div>
    );
}