'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../dashboard/components/Navbar';
import Footer from '@/components/Footer';
import { getSearchResults, SearchResult } from '@/lib/search';
import RecipeCard from '../dashboard/components/RecipeCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getSearchResults(query);
        setResults(res);
      } catch (err: any) {
        console.error(err);
        setError('Gagal memuat hasil pencarian.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [query]);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Hasil Pencarian untuk: "{query}"</h2>

        {loading && <p>Memuat...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && results && (
          <>
            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-2">Resep</h3>
              {results.recipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.recipes.map((r) => (
                    <RecipeCard
                      key={r.id}
                      id={r.id}
                      title={r.title}
                      image={r.photo}
                      cook_time={r.cook_time}
                      label={r.label}
                      rating={r.rating}
                      initialIsBookmarked={false}
                      onBookmarkToggle={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Tidak ada resep ditemukan.</p>
              )}
            </section>

            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-2">Bahan Masakan</h3>
              {results.ingredients.length > 0 ? (
                <ul className="list-disc list-inside text-sm">
                  {results.ingredients.map((bahan) => (
                    <li key={bahan.id}>{bahan.ingredient_name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Tidak ada bahan ditemukan.</p>
              )}
            </section>

            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-2">Konten Kreator</h3>
              {results.creators.length > 0 ? (
                <div className="flex flex-wrap gap-6">
                  {results.creators.map((creator) => (
                    <div
                      key={creator.id}
                      className="border border-gray-200 rounded-lg p-4 w-60 text-center"
                    >
                      <img
                        src={creator.photo_user || '/asset/profile.png'}
                        alt={creator.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                      />
                      <p className="font-semibold">{creator.name}</p>
                      <p className="text-sm text-gray-500">@{creator.username}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Tidak ada kreator ditemukan.</p>
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
