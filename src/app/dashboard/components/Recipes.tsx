import RecipeCard from "./RecipeCard";

export default function Recipe() {
  const recipes = [
    {
      title: "Creamy Pasta dan Daging Ayam",
      image: "/pasta.jpg",
      user: "Hani Nafilah"
    },
    {
      title: "Bola - bola Daging Ayam Krim Keju",
      image: "/meatballs.jpg",
      user: "Najwah Kamila"
    },
    {
      title: "Nasi Ayam Sederhana",
      image: "/nasi-ayam.jpg",
      user: "Albert Flores"
    },
  ];

  return (
    <section className="py-12 px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Resep yang Lagi Trend Nih!</h2>
        <button className="text-blue-500 hover:underline">Lihat Semua</button>
      </div>
      <div className="flex flex-wrap gap-6">
        {recipes.map((r, i) => (
          <RecipeCard key={i} title={r.title} image={r.image} user={r.user} />
        ))}
      </div>
    </section>
  );
}
