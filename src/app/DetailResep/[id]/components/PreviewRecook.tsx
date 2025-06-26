'use client';

import { ThumbsUp, Share2 } from "lucide-react";
import Link from "next/link";

interface Recook {
  id: string;
  description: string;
  recook_photo: string | null;
  user: {
    name: string;
    photo_user: string | null;
  };
}

export default function PreviewRecook({ recooks }: { recooks: Recook[] }) {
  return (
    <div className="mt-10">
      <hr className="bg-blue-900 h-1 border-none" />
      <h2 className="mt-5 font-bold text-2xl mb-5">Recook</h2>
      <Link href='/TambahRecook' className="px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800">
        Bagikan Hasil Recookmu
      </Link>
      
      {recooks && recooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {recooks.map((recook) => (
            <div key={recook.id} className="bg-gray-50 rounded-xl shadow-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <img src={recook.user?.photo_user || "/asset/profile.png"} alt={recook.user?.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm">{recook.user?.name || "User"}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2 italic">"{recook.description}"</p>
              {recook.recook_photo && (
                <img src={recook.recook_photo} alt="Foto Recook" className="w-full h-48 object-cover mt-3 rounded-xl" />
              )}
               <div className="flex text-sm text-gray-600 mt-3 items-center">
                  <span className="flex cursor-pointer items-center gap-1 hover:text-blue-600"> <ThumbsUp className="w-5 h-5" /> 1</span>
                  <span className="flex gap-1 cursor-pointer ml-7 items-center hover:text-blue-600"> <Share2 className="w-5 h-5"/> Share</span>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-500">Jadilah yang pertama me-recook resep ini!</p>
      )}
    </div>
  );
}