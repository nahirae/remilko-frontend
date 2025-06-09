'use client';

import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Kontak Kami</h1>

        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row gap-10">
          {/* Image Section */}
          <div className="w-full md:w-1/3 flex justify-center items-center relative top-[-30px]">
            <Image
              src="/img/img2.jpg" 
              alt="Koki Remilko"
              width={300}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>

          {/* Form Section */}
          <form className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NAMA</label>
              <input
                type="text"
                placeholder="Nama Anda..."
                className="w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ALAMAT EMAIL</label>
              <input
                type="email"
                placeholder="Alamat Email Anda..."
                className="w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SUBJEK</label>
              <input
                type="text"
                placeholder="Subjek..."
                className="w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PERTANYAAN</label>
              <input
                type="text"
                placeholder="Pertanyaan..."
                className="w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">PESAN</label>
              <textarea
                placeholder="Tulis Pesan Anda..."
                className="w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none h-32 resize-none"
              />
            </div>
            <div className="col-span-1 md:col-span-2 text-center">
              <button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg transition">
                Edit Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
