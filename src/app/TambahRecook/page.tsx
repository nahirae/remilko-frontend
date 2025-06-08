"use client";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function TambahRecook({ recipeId }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    image: null,
    rating: 0,
    review: "",
    status: "Menunggu Verifikasi",
  });
  
  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image || !formData.rating || !formData.review) {
      setMsg("Harap lengkapi semua field (foto, rating, dan ulasan).");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("review", formData.review);
    formDataToSend.append("status", formData.status);

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/user/recipes/${recipeId}/recooks`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        setMsg("Recook berhasil dikirim dan menunggu verifikasi.");
        router.push(`/recipes/${recipeId}`); //redirect stlh sukses
      } else {
        setMsg(res.data.message || "Gagal mengirim recook.");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Terjadi kesalahan saat mengirim recook.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Navbar />
      <div className="flex-grow p-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Bagikan Recook Kamu</h2>
        </div>
        <hr className="bg-blue-900 w-full border-none rounded h-1 mb-5" />

        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="max-w-full mx-56 bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <label className="block font-bold text-gray-800 mb-4">Foto Hasil Recook</label>
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="w-full h-64 object-cover rounded-md mb-2"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                <span className="text-gray-500">Belum ada gambar</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-4">Rating</label>
            <div className="flex space-x-1">
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
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-4">Ulasan</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              rows={4}
              placeholder="Bagikan pengalaman memasak ulangmu..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
          >
            Ajukan
          </button>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Status</label>
            <p className="italic text-sm text-orange-600">{formData.status}</p>
          </div>

          {msg && <p className="text-center text-red-600">{msg}</p>}
        </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}