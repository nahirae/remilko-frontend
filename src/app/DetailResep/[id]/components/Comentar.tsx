"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2, Send, Edit, Trash2 } from "lucide-react";
import { getComments, postComment, updateComment, deleteComment, type Comment } from "@/lib/comments";

const useAuth = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export default function Comentar({ recipeId }: { recipeId: string }) {
  const loggedInUser = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ rating: 0 });

  useEffect(() => {
    if (!recipeId) return;
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const data = await getComments(recipeId);
        setComments(data);
      } catch (error) {
        console.error("Gagal fetch komentar:", error);
        toast.error("Gagal memuat daftar komentar.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [recipeId]);

  const handlePostComment = async () => {
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const addedComment = await postComment(recipeId, newComment, formData.rating);

      setComments(prev => [addedComment, ...prev]);
      setNewComment("");
      toast.success("Komentar berhasil dikirim!");
    } catch (err) {
      toast.error("Gagal mengirim komentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editText.trim()) return;
    setLoading(true);
    try {
      const updatedData = await updateComment(recipeId, commentId, editText);
      setComments(prev => prev.map(c => (c.id === commentId ? updatedData : c)));
      setEditingCommentId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengupdate komentar");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Yakin ingin menghapus komentar ini?")) return;
    setLoading(true);
    try {
      await deleteComment(recipeId, commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus komentar");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (value: number) => {
    setFormData(prev => ({ ...prev, rating: value }));
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const visibleComments = comments.slice(0, visibleCount);

  return (
    <div className="mt-10">
      <hr className="bg-blue-900 w-full border-none rounded h-1 mb-6" />
      <h2 className="font-bold text-2xl">Komentar</h2>

      {loggedInUser && (
        <div className="flex items-start gap-4 my-8">
          <img 
            src={loggedInUser.photo_user || "/asset/profile.png"} 
            alt="Profil Anda" 
            className="w-10 h-10 rounded-full object-cover" 
          />
          <div className="w-full">
            <textarea
              placeholder="Bagikan opini Anda tentang resep ini..."
              className="w-full h-24 p-3 border bg-gray-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="text-right mt-2">
              <button
                className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
                onClick={handlePostComment}
                disabled={isSubmitting || !newComment.trim()}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmitting ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6 mt-6">
        {isLoading ? (
          <p className="text-gray-500 text-center py-4">Memuat komentar...</p>
        ) : comments.length > 0 ? (
          visibleComments.map((c) => (
            <div key={c.id} className="flex items-start gap-4 border-t pt-6">
              <img 
                src={c.profile || "/asset/profile.png"} 
                alt={c.user} 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900">{c.user}</p>
                  <span className="text-xs text-gray-400">{c.time}</span>
                </div>

                {editingCommentId === c.id ? (
                  <div className="mt-2">
                    <textarea 
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => handleUpdateComment(c.id)} 
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-60" 
                        disabled={loading}
                      >
                        {loading ? "Menyimpan..." : "Simpan"}
                      </button>
                      <button 
                        onClick={() => setEditingCommentId(null)} 
                        className="text-sm text-gray-600 hover:text-black"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1">
                    <div className="flex space-x-1 text-yellow-400 text-sm mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={c.rating >= star ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{c.comment_text}</p>
                  </div>
                )}

                {loggedInUser?.name === c.user && editingCommentId !== c.id && (
                  <div className="flex items-center gap-4 mt-2">
                    <button 
                      onClick={() => {
                        setEditingCommentId(c.id);
                        setEditText(c.comment_text);
                      }} 
                      className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteComment(c.id)} 
                      className="flex items-center gap-1 text-xs text-red-600 hover:underline"
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4 border-t mt-4">Jadilah yang pertama berkomentar!</p>
        )}
      </div>

      {!isLoading && visibleCount < comments.length && (
        <div className="text-center mt-8">
          <button 
            onClick={handleLoadMore} 
            className="border border-blue-900 text-blue-900 font-semibold px-5 py-2 rounded-md text-sm hover:bg-blue-50 focus:outline-none transition-colors"
          >
            Tampilkan lebih banyak komentar
          </button>
        </div>
      )}

      <div className="mt-12 border-t pt-6">
        <h3 className="text-xl font-semibold mb-3">Nilai Resep Ini dan Bagikan Opini Anda</h3>
        <div className="flex space-x-1 items-center mb-3 text-2xl">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={formData.rating >= star ? "text-yellow-400" : "text-gray-300"}
            >★</button>
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
            onClick={handlePostComment}
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Posting"}
          </button>
        </div>
      </div>
    </div>
  );
}
