// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// Import komponen-komponen dashboard
import StatsCard from "./components/StatsCard";
import RecookVerificationTable from "./components/RecookVerificationTable";
// Pastikan ini adalah komponen yang benar untuk tabel rekomendasi resep
import RecipeRecommendationTable from "./components/RecipeRecommendationTable"; 
import CreatorInvite from "./components/CreatorInvite";

// Impor fungsi API dan interfaces
import {
  getDashboardStats,
  getRecookVerifications,
  getRecipesWithRecommendationStatus,
  toggleRecommendation,
  Recook, // Impor interface Recook (dari admin.ts)
  Recipe, // Impor interface Recipe (dari admin.ts)
} from "@/lib/admin";

interface StatItem {
  title: string;
  count: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [recookVerifications, setRecookVerifications] = useState<Recook[]>([]);
  // Data resep rekomendasi akan ditangani oleh RecipeRecommendationTable itu sendiri
  // const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]); // Tidak perlu di sini lagi

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthReady(true);
      } else {
        setError("Anda belum login atau sesi telah berakhir.");
        setLoading(false);
      }
    }
  }, []);

  const refreshDashboardStats = useCallback(async () => {
    if (!isAuthReady) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Ambil Data Dashboard Summary
      const dashboardSummary = await getDashboardStats();
      const formattedStats: StatItem[] = [
        { title: 'Total Resep', count: dashboardSummary.total_recipes || 0 },
        { title: 'Jumlah Recook', count: dashboardSummary.total_recooks || 0 },
        { title: 'Pending Recook', count: dashboardSummary.pending_recooks || 0 },
      ];
      setStats(formattedStats);

    } catch (err: any) {
      console.error("Gagal memuat data dashboard:", err);
      if (err instanceof Error && err.message.includes("Sesi login Anda telah berakhir.")) {
        setError("Sesi login Anda telah berakhir. Silakan login ulang.");
      } else {
        setError("Terjadi kesalahan saat memuat data dashboard. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthReady]);


  useEffect(() => {
    if (isAuthReady) {
      refreshDashboardStats();
    }
  }, [isAuthReady, refreshDashboardStats]);

  if (loading || (!isAuthReady && !error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-700">Memuat data dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-red-100 p-4 rounded-lg shadow-md mx-auto my-auto max-w-lg">
        <p className="text-lg text-red-700 text-center mb-4">{error}</p>
        {error.includes("login ulang") && (
            <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                Login
            </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-black">
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Selamat Datang, Admin!</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {stats.map((statItem, index) => (
              <StatsCard
                key={index}
                label={statItem.title}
                value={statItem.count}
              />
            ))}
          </div>

          {/* Tabel Verifikasi Recook */}
          <RecookVerificationTable
            // RecookVerificationTable sudah menangani fetching datanya sendiri dan paginasi
            // Jadi, kita hanya perlu meneruskan callback untuk update statistik dashboard
            onUpdateDashboardStats={refreshDashboardStats}
          />

          {/* Bagian Undangan Kreator */}
          <CreatorInvite />

          {/* Bagian Resep Rekomendasi - Menggunakan RecipeRecommendationTable */}
          <RecipeRecommendationTable
            onUpdateDashboardStats={refreshDashboardStats} // Teruskan ini untuk refresh statistik setelah aksi
          />
        </div>
      </main>
    </div>
  );
}
