import Image from "next/image";

const recipes = [
  {
    title: "Nasi Goreng Acar",
    image: "/img/Nasi Goreng.jpeg",
    username: "Meivika",
    createdAt: "2025-04-29",
  },
  {
    title: "Salad Buah",
    image: "/img/Salad Buah.jpeg",
    username: "Rahmawati",
    createdAt: "2025-04-27",
  },
  {
    title: "Bola-bola Daging Ayam Krim Keju",
    image: "/img/Bola Daging Ayam.jpeg",
    username: "Nadila",
    createdAt: "2025-04-25",
  },
  {
    title: "Beef Teriyaki",
    image: "/img/Beef Teriyaki.jpeg",
    username: "meinadzz",
    createdAt: "2025-04-23",
  },
  {
    title: "Sandwich Barbeque",
    image: "/img/Sandwich Barbeque.jpeg",
    username: "Anonymous",
    createdAt: "2025-04-22",
  },
];

export default function ReviewPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Tinjau Recook</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="flex bg-white border rounded-xl shadow-md p-4 gap-4 items-start hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={96}
              height={96}
              className="rounded-lg object-cover w-24 h-24 flex-shrink-0"
            />
            <div className="flex-1 overflow-hidden">
              <h3 className="font-semibold text-lg mb-1 truncate">{recipe.title}</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Created by:</span> {recipe.username}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Diunggah pada:</span>{" "}
                  {recipe.createdAt}
                </p>
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-1.5 px-4 rounded"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
