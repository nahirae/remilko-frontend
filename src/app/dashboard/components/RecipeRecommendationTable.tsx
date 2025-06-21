// FILE INI HARUS BERADA DI: src/app/dashboard/components/RecipeRecommendationTable.tsx
// HANYA UNTUK DATA RECIPES

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image'; // Pastikan Image diimpor
import { Recipe, PaginationMeta, getRecipesWithRecommendationStatus, toggleRecommendation } from '@/lib/admin';
import Pagination from './Pagination'; // Pastikan path ini benar

interface RecipeRecommendationTableProps {
  onUpdateDashboardStats: () => void;
}

export default function RecipeRecommendationTable({ onUpdateDashboardStats }: RecipeRecommendationTableProps) {
  // Variabel state ini untuk DATA RECIPES
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Mengubah default filter ke 'all' agar semua resep muncul secara default
  const [activeFilter, setActiveFilter] = useState<'all' | 'recommended' | 'not_recommended'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    current_page: 1, last_page: 1, per_page: 10, total: 0, from: 0, to: 0
  });
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    setActionMessage(null);
    try {
      console.log(`[RecipeRecommendationTable] Memuat resep dengan filter: ${activeFilter}, halaman: ${currentPage}`);
      const response = await getRecipesWithRecommendationStatus({
        filter: activeFilter,
        page: currentPage,
        per_page: 10,
      });

      console.log("[RecipeRecommendationTable] Respon API penuh untuk Resep:", response);

      // Pastikan mengakses data resep dengan benar. Data resep ada di response.data
      const fetchedRecipes = response.data?.data ?? response.data ?? []; // Coba akses response.data.data (jika API Resource Collection dengan data di dalam data), atau langsung response.data
      setRecipes(fetchedRecipes);
      
      if (response.meta?.pagination) {
        setPaginationMeta(response.meta.pagination);
        console.log("[RecipeRecommendationTable] Meta paginasi resep:", response.meta.pagination);
      } else {
        setPaginationMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0, from: 0, to: 0 });
        console.log("[RecipeRecommendationTable] Meta paginasi resep tidak ditemukan, diatur ke default.");
      }

    } catch (err: any) {
      console.error("[RecipeRecommendationTable] Gagal memuat resep:", err);
      setError(err.message || "Gagal memuat resep. Pastikan server API berjalan dan data tersedia.");
      setRecipes([]);
      setPaginationMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0, from: 0, to: 0 });
    } finally {
      setLoading(false);
      console.log("[RecipeRecommendationTable] Loading resep selesai.");
    }
  }, [activeFilter, currentPage]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filter: 'all' | 'recommended' | 'not_recommended') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleToggleRecommendation = async (recipeId: string) => {
    setActionLoadingId(recipeId);
    setActionMessage(null);
    try {
      const response = await toggleRecommendation(recipeId);
      const message = response?.meta?.message || "Status rekomendasi berhasil diperbarui.";
      setActionMessage(message);
      await fetchRecipes(); // Refresh data setelah aksi
      onUpdateDashboardStats();
    } catch (err: any) {
      console.error("[RecipeRecommendationTable] Gagal mengubah status rekomendasi:", err);
      setActionMessage(err.message || "Gagal mengubah status rekomendasi.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return <div className="bg-white p-6 rounded-xl shadow mb-10 text-center">Memuat daftar resep...</div>;
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Manajemen Resep & Rekomendasi</h2>

      {actionMessage && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          {actionMessage}
        </div>
      )}

      {/* Filter Rekomendasi */}
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Semua Resep
        </button>
        <button
          onClick={() => handleFilterChange('recommended')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === 'recommended' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Direkomendasikan
        </button>
        <button
          onClick={() => handleFilterChange('not_recommended')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === 'not_recommended' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Belum Direkomendasikan
        </button>
      </div>

      {Array.isArray(recipes) && recipes.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resep
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status Rekomendasi
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {recipe.recipe_photo ? ( // Gunakan recipe_photo
                      <Image
                        src={recipe.recipe_photo}
                        alt={recipe.title || 'N/A'}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none'; // Sembunyikan jika error
                          console.error(`[RecipeRecommendationTable] Gagal memuat gambar resep ${recipe.id}: ${recipe.recipe_photo}`);
                        }}
                      />
                    ) : (
                      // Jika tidak ada foto, tampilkan div dengan inisial nama resep
                      <div className="w-[60px] h-[60px] bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs font-semibold">
                        {recipe.title ? recipe.title.charAt(0).toUpperCase() + recipe.title.charAt(1).toUpperCase() : '??'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{recipe.title || 'Resep Tidak Dikenal'}</div>
                    <div className="text-xs text-gray-500">by {recipe.user_name || 'Pengguna Tidak Dikenal'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis">
                    {recipe.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${recipe.is_recommended ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {recipe.is_recommended ? 'Direkomendasikan' : 'Tidak Direkomendasikan'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleRecommendation(recipe.id); }}
                      className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={actionLoadingId === recipe.id}
                    >
                      {actionLoadingId === recipe.id ? '...' : (recipe.is_recommended ? 'Batalkan Rekomendasi' : 'Rekomendasikan')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-6">Tidak ada resep untuk ditampilkan.</p>
      )}

      {paginationMeta.total > 0 && (
        <Pagination pagination={paginationMeta} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
