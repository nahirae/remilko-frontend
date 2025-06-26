"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import { postAuth } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function TambahRecook() {
  const router = useRouter();
  const params = useParams(); 
  const recipeId = params.id; 

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState("Mudah");
  const [taste, setTaste] = useState("Enak");
  const [description, setDescription] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo || !description) {
      toast.error("Harap lengkapi semua field (foto dan ulasan).");
      return;
    }
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("photo_recook", photo);
    formData.append("difficulty", difficulty);
    formData.append("taste", taste);
    formData.append("description", description);

    try {
      await postAuth(`/user/recipes/${recipeId}/recooks`, formData);

      toast.success("Recook berhasil dikirim dan menunggu verifikasi admin!");
      
      // Arahkan pengguna kembali ke halaman detail setelah 2 detik
      setTimeout(() => {
        router.push(`/DetailResep/${recipeId}`);
      }, 2000);

    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat mengirim recook.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Toaster position="top-center" />
      <Navbar />
      <div className="flex-grow p-5">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-5">Bagikan Hasil Recook Kamu</h2>
          <hr className="mb-6" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-bold text-gray-800 mb-2">Foto Hasil Recook</label>
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-64 object-cover rounded-md mb-2" />
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                  <span className="text-gray-500">Pratinjau Gambar</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} required className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            </div>

            <div>
                <label className="block font-bold text-gray-800 mb-2">Tingkat Kesulitan</label>
                <select name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                </select>
            </div>
            
            <div>
                <label className="block font-bold text-gray-800 mb-2">Penilaian Rasa</label>
                <select name="taste" value={taste} onChange={(e) => setTaste(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="Enak">Enak</option>
                    <option value="Biasa">Biasa</option>
                    <option value="Tidak Enak">Tidak Enak</option>
                </select>
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-2">Ulasan Singkat</label>
              <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Bagikan pengalaman memasak ulangmu..." className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 disabled:opacity-60">
              {isSubmitting ? "Mengajukan..." : "Ajukan Recook"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}