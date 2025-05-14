import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Recipes from "./components/Recipes"; 
import Footer from "./components/Footer";

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
