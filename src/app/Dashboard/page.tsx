import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import Recipes from "./Components/Recipe";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <Recipes />
      <Footer />
    </main>
  );
}
