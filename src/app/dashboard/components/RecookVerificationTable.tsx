// src/app/dashboard/components/RecookVerificationTable.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Recook, PaginationMeta, getRecookVerifications, approveRecook, rejectRecook } from '@/lib/admin';
import Pagination from './Pagination'; // Pastikan path ini benar

interface RecookVerificationTableProps {
  onUpdateDashboardStats: () => void;
}

export default function RecookVerificationTable({ onUpdateDashboardStats }: RecookVerificationTableProps) {
  // Menggunakan 'recooks' untuk data daftar recook
  const [recooks, setRecooks] = useState<Recook[]>([]); // Inisialisasi sebagai array kosong
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // PERUBAHAN: Tambahkan 'all' sebagai opsi filter status
  const [activeStatusFilter, setActiveStatusFilter] = useState<'menunggu' | 'diterima' | 'ditolak' | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    current_page: 1, last_page: 1, per_page: 10, total: 0, from: 0, to: 0
  });
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchRecooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    setActionMessage(null);
    try {
      console.log(`[RecookTable] Memuat recook dengan status: ${activeStatusFilter}, halaman: ${currentPage}`);
      const response = await getRecookVerifications({
        // Mengirim status yang dipilih, termasuk 'all'
        status: activeStatusFilter,
        page: currentPage,
        per_page: 10,
      });

      console.log("[RecookTable] Respon API penuh:", response); // PENTING: Log respons API
      
      const fetchedRecooks = response.data?.recooks ?? [];
      setRecooks(fetchedRecooks);
      console.log("[RecookTable] Data recook setelah diset:", fetchedRecooks);

      if (response.meta?.pagination) {
        setPaginationMeta(response.meta.pagination);
        console.log("[RecookTable] Meta paginasi:", response.meta.pagination);
      } else {
        setPaginationMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0, from: 0, to: 0 });
        console.log("[RecookTable] Meta paginasi tidak ditemukan, diatur ke default.");
      }

    } catch (err: any) {
      console.error("[RecookTable] Gagal memuat verifikasi recook:", err);
      setError(err.message || "Gagal memuat verifikasi recook. Pastikan server API berjalan dan data tersedia.");
      setRecooks([]);
      setPaginationMeta({ current_page: 1, last_page: 1, per_page: 10, total: 0, from: 0, to: 0 });
    } finally {
      setLoading(false);
      console.log("[RecookTable] Loading selesai.");
    }
  }, [activeStatusFilter, currentPage]);

  useEffect(() => {
    fetchRecooks();
  }, [fetchRecooks]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // PERUBAHAN: Menerima 'all' sebagai opsi status
  const handleStatusFilterChange = (status: 'menunggu' | 'diterima' | 'ditolak' | 'all') => {
    setActiveStatusFilter(status);
    setCurrentPage(1); // Selalu reset ke halaman 1 saat filter berubah
  };

  const handleApprove = async (recookId: string) => {
    setActionLoadingId(recookId);
    setActionMessage(null);
    try {
      const message = await approveRecook(recookId);
      setActionMessage(message);
      await fetchRecooks();
      onUpdateDashboardStats();
    } catch (err: any) {
      console.error("[RecookTable] Gagal menyetujui recook:", err);
      setActionMessage(err.message || "Gagal menyetujui recook.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (recookId: string) => {
    setActionLoadingId(recookId);
    setActionMessage(null);
    try {
      const message = await rejectRecook(recookId);
      setActionMessage(message);
      await fetchRecooks();
      onUpdateDashboardStats();
    } catch (err: any) {
      console.error("[RecookTable] Gagal menolak recook:", err);
      setActionMessage(err.message || "Gagal menolak recook.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusColorClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'diterima': return 'bg-green-100 text-green-800';
      case 'ditolak': return 'bg-red-100 text-red-800';
      case 'menunggu': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="bg-white p-6 rounded-xl shadow mb-10 text-center">Memuat verifikasi recook...</div>;
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
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Verifikasi Recook</h2>

      {actionMessage && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          {actionMessage}
        </div>
      )}

      {/* Filter Status */}
      <div className="mb-4 flex space-x-2">
        {/* Tombol 'Semua' baru */}
        <button
          onClick={() => handleStatusFilterChange('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeStatusFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Semua
        </button>
        <button
          onClick={() => handleStatusFilterChange('menunggu')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeStatusFilter === 'menunggu' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Menunggu
        </button>
        <button
          onClick={() => handleStatusFilterChange('diterima')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeStatusFilter === 'diterima' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Diterima
        </button>
        <button
          onClick={() => handleStatusFilterChange('ditolak')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeStatusFilter === 'ditolak' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Ditolak
        </button>
      </div>

      {Array.isArray(recooks) && recooks.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Foto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resep & Pengguna
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deskripsi Singkat
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kesulitan & Rasa
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recooks.map((recook) => {
                console.log("[RecookTable] Objek recook yang sedang dirender:", recook);
                const isPending = recook.status && recook.status.toLowerCase() === 'menunggu';
                return (
                <tr key={recook.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {recook.recook_photo ? (
                      <Image
                        src={recook.recook_photo}
                        alt={`Recook of ${recook.recipe_title || 'N/A'}`}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none'; // Sembunyikan jika error
                          console.error(`[RecookTable] Gagal memuat gambar recook ${recook.id}: ${recook.recook_photo}`);
                        }}
                      />
                    ) : (
                      // Jika tidak ada foto, tampilkan div kosong atau inisial nama resep
                      <div className="w-[60px] h-[60px] bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs font-semibold">
                        {recook.recipe_title ? recook.recipe_title.charAt(0).toUpperCase() + recook.recipe_title.charAt(1).toUpperCase() : '??'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{recook.recipe_title || 'Resep Tidak Dikenal'}</div>
                    <div className="text-xs text-gray-500">by {recook.user_name || 'Pengguna Tidak Dikenal'}</div>
                    <div className="text-xs text-gray-500">{recook.created_at_human || '-'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis">
                    {recook.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="block">Kesulitan: {recook.difficulty || '-'}</span>
                    <span className="block">Rasa: {recook.taste || '-'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(recook.status || '')}`}>
                      {recook.status ? (recook.status.charAt(0).toUpperCase() + recook.status.slice(1)) : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {isPending && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleApprove(recook.id); }}
                          className="text-green-600 hover:text-green-900 px-3 py-1 rounded-md border border-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          disabled={actionLoadingId === recook.id}
                        >
                          {actionLoadingId === recook.id ? '...' : 'Terima'}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleReject(recook.id); }}
                          className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md border border-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          disabled={actionLoadingId === recook.id}
                        >
                          {actionLoadingId === recook.id ? '...' : 'Tolak'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-6">Tidak ada verifikasi recook untuk ditampilkan.</p>
      )}

      {paginationMeta.total > 0 && (
        <Pagination pagination={paginationMeta} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
