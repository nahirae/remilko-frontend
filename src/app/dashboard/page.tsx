import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Recipes from "./components/Recipes"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <Recipes />
    </main>
  );
}
