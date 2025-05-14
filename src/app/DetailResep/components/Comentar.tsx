'use client'
import { useState } from "react";
import { ThumbsUp, Share2, MessageSquare } from "lucide-react";

export default function Comentar(){
    const comments = [
        {
          user: 'Hirae Aya',
          time: '30 min',
          message: 'Wah, ini looks so yummy! Nasi gorengnya kayaknya crunchy ya karena ada acaranya. Bikin ngiler!',
          likes: 26,
          reply: true,
          profile: "/asset/profile.png",
        },
        {
          user: 'Renjana Braga',
          time: '35 min',
          message: 'Makasih! Iya, teksturnya emang lebih menarik karena ada acar yang renyah. Ditambah pedas-manisnya pas banget. Cobain deh!',
          likes: 27,
          reply: true,
          profile: "/asset/profile.png",
        },
        {
          user: 'Kevin Wilson',
          time: '55 min',
          message: 'Baru coba recook, enak banget! Thanks resepnya!',
          likes: 18,
          reply: true,
          profile: "/asset/profile.png",
        },
      ];
      
          

    return(
        <div className="min-h-screen bg-white p-10" >
            <hr className="bg-blue-900 w-3xl border-none rounded h-1 mt-10" />
            <h2 className="mt-5 mb-5 font-bold text-2xl">Komentar</h2>
      
            {comments.map((c, i) => (
              <div key={i} className="border-b pb-4 mb-3">
                <div className="flex items-center gap-3">
                  <img src={c.profile} alt={c.user} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{c.user}</p>
                    <span className="text-sm text-gray-500">{c.time}</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">{c.message}</p>
      
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-blue-900">
                    <MessageSquare className="w-4 h-4" />
                    Reply
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {c.likes}
                  </div>
                </div>
              </div>
            ))}
      
            <div className="text-center">
              <button className="mt-5 border border-blue-900 px-5 py-2 rounded-md text-sm hover:bg-gray-100 focus:outline-none resize-none">
                Tampilkan lebih banyak komentar
              </button>
            </div>
      
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-1">Nilai Resep Ini dan Bagikan Opini Anda</h2>
              <div className="flex items-center mb-3 text-yellow-400 text-xl">
                ★★★★☆
              </div>
              <textarea
                placeholder="Tulis disini..."
                className="w-full h-32 p-4 border bg-gray-100 border-gray-400 rounded-md focus:outline-none resize-none"
              />
              <div className="text-right mt-2">
                <button className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  Posting
                </button>
              </div>
            </div>
        </div>
    );
}