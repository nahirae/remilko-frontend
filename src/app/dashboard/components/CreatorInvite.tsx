// src/app/dashboard/components/CreatorInvite.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
// Import InviteCreatorParams dari admin.ts
import { getCreatorsList, inviteCreator, updateCreatorInvitationStatus, Creator, PaginationMeta, InviteCreatorParams } from '@/lib/admin';
import Pagination from './Pagination';

export default function CreatorInvite() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States baru untuk form undangan kreator
  const [inviteName, setInviteName] = useState('');
  const [inviteUsername, setInviteUsername] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePassword, setInvitePassword] = useState('');


  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteMessage, setInviteMessage] = useState<string | null>(null);

  const [activeStatusFilter, setActiveStatusFilter] = useState<'pending' | 'accepted' | 'rejected' | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    current_page: 1, last_page: 1, per_page: 10, total: 0, from: 0, to: 0
  });
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);


  const fetchCreators = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCreatorsList({
        status: activeStatusFilter,
        page: currentPage,
        per_page: 10,
      });
      setCreators(response.data.creators);
      if (response.meta.pagination) {
        setPaginationMeta(response.meta.pagination);
      }
      console.log("Creators fetched:", response.data.creators);
    } catch (err: any) {
      console.error("Failed to fetch creators list:", err);
      setError(err.message || "Gagal memuat daftar kreator.");
    } finally {
      setLoading(false);
    }
  }, [activeStatusFilter, currentPage]);

  useEffect(() => {
    fetchCreators();
  }, [fetchCreators]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (status: 'pending' | 'accepted' | 'rejected' | 'all') => {
    setActiveStatusFilter(status);
    setCurrentPage(1);
  };

  const handleInviteCreator = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi sederhana
    if (!inviteName || !inviteUsername || !inviteEmail || !invitePassword) {
      setInviteMessage('Semua kolom harus diisi.');
      return;
    }

    setInviteLoading(true);
    setInviteMessage(null);
    try {
      const params: InviteCreatorParams = {
        name: inviteName,
        username: inviteUsername,
        email: inviteEmail,
        password: invitePassword,
      };
      const message = await inviteCreator(params); // Panggil fungsi dengan semua parameter
      setInviteMessage(message);
      // Clear form
      setInviteName('');
      setInviteUsername('');
      setInviteEmail('');
      setInvitePassword('');
      await fetchCreators(); // Refresh daftar kreator
    } catch (err: any) {
      console.error("Error inviting creator:", err);
      setInviteMessage(err.message || "Gagal mengirim undangan kreator.");
    } finally {
      setInviteLoading(false);
    }
  };

  const handleUpdateInvitationStatus = async (creatorId: string, status: 'accepted' | 'rejected') => {
    setActionLoadingId(creatorId);
    setActionMessage(null);
    try {
      const message = await updateCreatorInvitationStatus(creatorId, status);
      setActionMessage(message);
      await fetchCreators();
    } catch (err: any) {
      console.error(`Gagal mengubah status undangan untuk ${creatorId}:`, err);
      setActionMessage(err.message || "Gagal mengubah status undangan.");
    } finally {
      setActionLoadingId(null);
    }
  };


  const getStatusColorClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="bg-white p-6 rounded-xl shadow mb-10 text-center">Memuat daftar kreator...</div>;
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
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Undangan Kreator</h2>

      {inviteMessage && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          {inviteMessage}
        </div>
      )}
      {actionMessage && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          {actionMessage}
        </div>
      )}

      {/* Form Undangan Kreator */}
      <form onSubmit={handleInviteCreator} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inviteName" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input
            type="text"
            id="inviteName"
            placeholder="Nama Lengkap Kreator"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="inviteUsername" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="inviteUsername"
            placeholder="Username Kreator"
            value={inviteUsername}
            onChange={(e) => setInviteUsername(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="inviteEmail"
            placeholder="Email Kreator"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="invitePassword" className="block text-sm font-medium text-gray-700">Password (Minimal 8 Karakter)</label>
          <input
            type="password"
            id="invitePassword"
            placeholder="Password Kreator"
            value={invitePassword}
            onChange={(e) => setInvitePassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
            minLength={8}
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
            disabled={inviteLoading}
          >
            {inviteLoading ? 'Mengirim...' : 'Kirim Undangan'}
          </button>
        </div>
      </form>

      {/* Filter Status Undangan */}
      <div className="mb-4 flex space-x-2">
      <button
          onClick={() => handleStatusFilterChange('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeStatusFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Semua
        </button>
        <button
          onClick={() => handleStatusFilterChange('pending')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeStatusFilter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Menunggu
        </button>
        <button
          onClick={() => handleStatusFilterChange('accepted')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeStatusFilter === 'accepted' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Diterima
        </button>
        <button
          onClick={() => handleStatusFilterChange('rejected')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${activeStatusFilter === 'rejected' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Ditolak
        </button>
        
      </div>

      {creators.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 mx-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Foto
                </th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama & Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status Undangan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {creators.map((creator) => (
                <tr key={creator.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {creator.photo_user ? (
                      <Image
                        src={creator.photo_user}
                        alt={`Photo of ${creator.name || creator.username}`}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none';
                          console.error(`Gagal memuat gambar kreator ${creator.id}: ${creator.photo_user}`);
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
                        {creator.name ? creator.name.charAt(0) : (creator.username ? creator.username.charAt(0) : 'U')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{creator.name || creator.username || 'Tidak Dikenal'}</div>
                    <div className="text-xs text-gray-500">{creator.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(creator.status)}`}>
                      {creator.status.charAt(0).toUpperCase() + creator.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {creator.status.toLowerCase() === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateInvitationStatus(creator.id, 'accepted')}
                          className="text-green-600 hover:text-green-900 px-3 py-1 rounded-md border border-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          disabled={actionLoadingId === creator.id}
                        >
                          {actionLoadingId === creator.id ? '...' : 'Terima'}
                        </button>
                        <button
                          onClick={() => handleUpdateInvitationStatus(creator.id, 'rejected')}
                          className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md border border-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          disabled={actionLoadingId === creator.id}
                        >
                          {actionLoadingId === creator.id ? '...' : 'Tolak'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-6">Tidak ada undangan kreator untuk ditampilkan.</p>
      )}

      {paginationMeta.total > 0 && (
        <Pagination pagination={paginationMeta} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
