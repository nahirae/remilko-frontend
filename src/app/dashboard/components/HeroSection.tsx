export default function HeroSection() {
    return (
      <section className="bg-[#fffcee] px-6 py-12 rounded-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold leading-tight mb-4">
              Bikin Masak <span className="text-orange-500">Semudah Itu!</span>
            </h2>
            <p className="text-xl font-semibold mb-3">
              Temukan Rahasia <span className="text-blue-600">Masak Enak</span> Ala <span className="text-purple-600">Anak Kos</span> Tanpa Ribet
            </p>
            <p className="text-gray-600 mb-6">Modal Receh Hasilnya Premium - Resep Jitu Anak Kos!</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full">Explore Resep</button>
          </div>
          <img src="/hero-dish.png" alt="Dish" className="w-[400px] rounded-lg shadow-lg" />
        </div>
      </section>
    );
  }
  