"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../dashboard/components/Navbar";
import Footer from "@/components/Footer";
import { ThumbsUp, Share2 } from "lucide-react";
import { getPublicRecookFeed, type Recook } from "@/lib/recook";
import type { Pagination } from "@/lib/recipes";

const tasteToRating = (taste: string): number => {
  switch (taste?.toLowerCase()) {
    case 'enak':
      return 5;
    case 'biasa':
      return 3;
    case 'tidak enak':
      return 1;
    default:
      return 0; // Default jika tidak ada data rasa
  }
};

export default function Recook() {
  const [recooks, setRecooks] = useState<Recook[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPublicRecookFeed(currentPage);
        setRecooks(data.recooks);
        setPagination(data.pagination);
      } catch (err: any) {
        setError(err.message || "Gagal mengambil data recook.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecooks();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && (!pagination || newPage <= pagination.total_pages)) {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-10 py-8">
        <h2 className="text-3xl font-bold pb-5">Semua Hasil Recook</h2>

        {loading ? (
          <p className="col-span-3 text-center text-gray-500 py-10">Memuat data recook...</p>
        ) : error ? (
          <p className="col-span-3 text-center text-red-500 py-10">{error}</p>
        ) : recooks.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500 py-10">Belum ada hasil recook yang dibagikan.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recooks.map((recook) => (
                <div key={recook.id} className="bg-gray-50 rounded-xl shadow-md p-4 border flex flex-col">\
                  <div className="flex items-center gap-3 mb-2">
                    <img src={recook.user?.photo_user || "/asset/profile.png"} alt={recook.user?.name} className="w-10 h-10 rounded-full object-cover"/>
                    <div>
                      <p className="font-semibold text-sm">{recook.user?.name || "User"}</p>
                      <p className="text-xs text-gray-500">me-recook resep:</p>
                    </div>
                  </div>
                  
                  <Link
                    href={`/DetailResep/${recook.recipe.id}`}
                    className="block mb-3 p-2 bg-white rounded-lg border hover:bg-gray-100 transition-colors"
                    legacyBehavior>
                    <p className="font-bold text-sm text-blue-800 truncate">{recook.recipe.title}</p>
                  </Link>
                  
                  <img src={recook.photo_recook || "/asset/placeholder.png"} alt={`Recook dari ${recook.recipe.title}`} className="w-full h-48 object-cover mt-1 rounded-xl" />
                  
                  <p className="text-sm text-gray-700 mt-3 flex-grow italic">"{recook.description}"</p>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg mt-2">
                      {"★".repeat(tasteToRating(recook.taste))}
                      {"☆".repeat(5 - tasteToRating(recook.taste))}
                  </div>

                  <div className="flex text-sm text-gray-600 mt-3 pt-3 border-t">
                    <span className="flex cursor-pointer items-center gap-1 hover:text-blue-600"><ThumbsUp className="w-4 h-4" /> 1</span>
                    <span className="flex gap-1 cursor-pointer ml-5 items-center hover:text-blue-600"><Share2 className="w-4 h-4" /> Share</span>
                  </div>
                </div>
              ))}
            </div>

            {pagination && pagination.total_pages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Sebelumnya</button>
                    <span>Halaman {pagination.current_page} dari {pagination.total_pages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.total_pages} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Berikutnya</button>
                </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}