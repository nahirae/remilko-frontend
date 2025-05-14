import { CircleChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-[#fffcee] px-6 py-14 rounded-2xl m-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold leading-tight mb-4">
            Bikin Masak Semudah itu!
          </h2>
          <p className="text-3xl font-semibold">
            Temukan Rahasia <span className="text-blue-900">Masak Enak</span> Ala <span className="text-blue-900">Anak Kos</span> Tanpa Ribet
          </p>
          <p className="text-gray-600 mt-10">Modal Receh Hasilnya Premium - Resep Jitu Anak Kos!</p>
          <p className="text-gray-600">Masak Itu Gampang! Yuk Explor Ribuan Resep Menarik di Remilko.</p>
          <Link href="/RecipeAll" className="flex mt-10 w-48 gap-3 px-6 py-3 bg-[#608BC1] text-white rounded-xl mb-5 hover:bg-[#6282a9]">
            <span>Explore Resep </span>
            <CircleChevronRight className='w-6 h-6'/>
          </Link>
        
        </div>
        <img src="/asset/food.png" alt="Dish" className="w-[580px] rounded-xl" />
      </div>
    </section>
  );
}
