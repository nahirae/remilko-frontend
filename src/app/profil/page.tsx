'use client';

import { FaPen, FaBookmark, FaBookOpen } from 'react-icons/fa';
import Image from 'next/image';

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Profil</h1>

        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center w-full md:w-1/3">
            <div className="relative w-32 h-32">
              <Image
                src="/img/unknown2.jpeg" 
                alt="Foto Profil"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
              <button
                className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
                aria-label="Ganti foto profil"
              >
                <FaPen className="text-sm text-gray-600" />
              </button>
            </div>
            <p className="mt-4 text-lg font-semibold">Sabrina Carpenter</p>
            <p className="text-sm text-gray-500">@meinadzz</p>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            {[
              { label: 'USERNAME', value: 'meinadzz', type: 'text' },
              { label: 'NAMA', value: 'Sabrina Carpenter', type: 'text' },
              { label: 'EMAIL', value: 'meinadzz@gmail.com', type: 'email' },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full border rounded-lg px-4 py-2 bg-white text-gray-800 outline-none cursor-text transition duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
                />
              </div>
            ))}

            <div className="flex gap-4 pt-2">
              <button className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition">
                <FaBookOpen /> Recook Saya
              </button>
              <button className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition">
                <FaBookmark /> Bookmark
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
