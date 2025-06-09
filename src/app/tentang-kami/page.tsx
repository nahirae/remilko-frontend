import Image from "next/image";

export default function TentangKamiPage() {
  return (
    <div className="bg-white">
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">Tentang Kami</h1>
      </div>

      <div className="relative">
        <Image
          src="/img/img3.jpg" 
          alt="Makanan"
          width={1200}
          height={500}
          className="w-full h-[350px] object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-xl text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Setiap orang bisa menjadi koki di dapur mereka sendiri
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Resep kami adalah jantung dan jiwa komunitas kuliner kami, dan resep kami mencerminkan komitmen kami untuk memberi Anda pengalaman bersantap yang berkesan dan menyenangkan.
          </p>
        </div>
      </div>
    </div>
  );
}
