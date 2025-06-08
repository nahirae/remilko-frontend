'use client'

import { useEffect, useState } from "react";
import { ThumbsUp, Share2, MessageSquare } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  time: string;
  message: string;
  likes: number;
  profile: string;
}

export default function Comentar({ recipeId }: { recipeId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ rating: 0, review: "" });

  const [visibleCount, setVisibleCount] = useState(3); // Jumlah komentar yang ditampilkan

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?recipeId=${recipeId}`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error('Gagal fetch komentar:', error);
      }
    };
    fetchComments();
  }, [recipeId]);

  const handlePostComment = async () => {
    if (newComment.trim() === '') return;
    setLoading(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newComment, recipeId }),
      });

      if (!res.ok) throw new Error('Gagal kirim komentar');

      const newData: Comment = await res.json();
      setComments((prev) => [newData, ...prev]); // prepend komentar baru
      setNewComment('');
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim komentar');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (value: number) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleComments = comments.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-white p-10">
      <hr className="bg-blue-900 w-3xl border-none rounded h-1 mt-10" />
      <h2 className="mt-5 mb-5 font-bold text-2xl">Komentar</h2>

      {visibleComments.map((c) => (
        <div key={c.id} className="border-b pb-4 mb-3">
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

      {visibleCount < comments.length && (
        <div className="text-center">
          <button
            className="mt-5 border border-blue-900 px-5 py-2 rounded-md text-sm hover:bg-gray-100 focus:outline-none"
            onClick={handleLoadMore}
          >
            Tampilkan lebih banyak komentar
          </button>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-1">Nilai Resep Ini dan Bagikan Opini Anda</h2>
        <div className="flex space-x-1 items-center mb-3 text-xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingChange(star)}
              className={`text-2xl ${
                formData.rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          placeholder="Tulis disini..."
          className="w-full h-32 p-4 border bg-gray-100 border-gray-400 rounded-md focus:outline-none resize-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="text-right mt-2">
          <button
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            onClick={handlePostComment}
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Posting'}
          </button>
        </div>
      </div>
    </div>
  );
}
