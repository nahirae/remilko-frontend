import Image from "next/image";

const recommendedRecipes = [
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Kebab",
    image: "/img/kebab.jpeg",
    creator: "Remilko",
    rating: 5,
    reviews: 10,
    category: "Tambah ke Rekomendasi",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

export default function RekomendasiPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-10">Rekomendasi Resep</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {recommendedRecipes.map((recipe, i) => (
          <div
            key={i}
            className="bg-[#F9F9E0] p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 relative -mt-16">
              <Image
                src={recipe.image}
                alt={recipe.title}
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-white"
              />
            </div>
            <div className="mt-6 space-y-2 px-2">
              <div className="flex justify-center gap-1 text-yellow-500 text-sm">
                {Array.from({ length: recipe.rating }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-sm text-gray-600">Chef {recipe.creator}</p>
              <p className="text-xs text-gray-500">{recipe.description}</p>
              <button className="mt-3 px-4 py-1 bg-[#839ED1] text-white text-sm rounded-full hover:bg-[#6b89c1]">
                {recipe.category}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
