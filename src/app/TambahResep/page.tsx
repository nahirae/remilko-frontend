"use client";
import Navbar from "../Dashboard/Components/Navbar";
import Footer from "../Dashboard/Components/Footer";
import { useState } from "react";

export default function TambahResep() {
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    ingredients: [""],
    instructions: [""],
    portions: { jam: 0, menit: 0 },
    cookingTime: { jam: 0, menit: 0 },
    category: "Makan Siang",
    nutrition: {
      calories: "",
      totalFat: "",
      protein: "",
      carbohydrates: "",
      cholesterol: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handlePortionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      portions: { ...prev.portions, [name]: parseInt(value) || 0 },
    }));
  };

  const handleCookingTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      cookingTime: { ...prev.cookingTime, [name]: parseInt(value) || 0 },
    }));
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      nutrition: { ...prev.nutrition, [name]: value },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMsg("Resep berhasil disimpan!");
  };

  const currentDateTime = "12:53 PM WIB, Thursday, May 15, 2025";

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Navbar />
        <div className="flex-grow p-5">
            <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">Buat Resep Baru</h2>
            <button
                onClick={handleSave}
                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
            >
                Simpan
            </button>
            </div>
            <hr className="bg-blue-900 w-full border-none rounded h-1 mb-5" />
        </div>

        <div className="max-w-full mx-56 bg-white rounded-xl shadow p-6 space-y-6">
        <div>
            <label className="block font-bold text-gray-800 mb-4">Judul Resep</label>
            <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan judul resep"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
        </div>

        <div>
            <label className="block font-bold text-gray-800 mb-4">Gambar Resep</label>
            {formData.image ? (
            <img
                src={formData.image}
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
            <label className="block font-bold text-gray-800 mb-4">Deskripsi</label>
            <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Masukkan deskripsi resep"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
        </div>

        <div>
            <label className="block font-bold text-gray-800 mb-4">Bahan-bahan</label>
            <div className="space-y-2">
            {formData.ingredients.map((item, index) => (
                <input
                key={index}
                value={item}
                onChange={(e) => handleArrayChange(e, index, "ingredients")}
                placeholder={`Bahan ${index + 1}`}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                />
            ))}
            </div>
            <button
            type="button"
            onClick={() =>
                setFormData((prev) => ({
                ...prev,
                ingredients: [...prev.ingredients, ""],
                }))
            }
            className="mt-2 text-sm text-blue-600 hover:underline"
            >
            + Tambah bahan
            </button>
        </div>

        <div>
            <label className="block font-bold text-gray-800 mb-4">Instruksi Memasak</label>
            <div className="space-y-2">
            {formData.instructions.map((item, index) => (
                <textarea
                key={index}
                value={item}
                onChange={(e) => handleArrayChange(e, index, "instructions")}
                placeholder={`Langkah ${index + 1}`}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                rows={2}
                />
            ))}
            </div>
            <button
            type="button"
            onClick={() =>
                setFormData((prev) => ({
                ...prev,
                instructions: [...prev.instructions, ""],
                }))
            }
            className="mt-2 text-sm text-blue-600 hover:underline"
            >
            + Tambah langkah
            </button>
        </div>

        <div>
            <label className="block font-bold text-black mb-3">Persiapan & Waktu Memasak</label>
            <div>
                <label className="font-medium text-black mb-2">Persiapan Bahan :</label>
                <div className="flex items-center gap-2 mt-1">
                <input
                    type="number"
                    name="jam"
                    value={formData.portions.jam}
                    onChange={handlePortionChange}
                    className="w-20 p-1 border border-gray-300 rounded-md"
                />
                <span>Jam</span>
                <input
                    type="number"
                    name="menit"
                    value={formData.portions.menit}
                    onChange={handlePortionChange}
                    className="w-20 p-1 border border-gray-300 rounded-md"
                />
                <span>Menit</span>
                </div>
            </div>
        </div>

        <div>
            <label className="font-medium text-black mb-4">Waktu Memasak :</label>
            <div className="flex items-center gap-2 mt-1">
            <input
                type="number"
                name="jam"
                value={formData.cookingTime.jam}
                onChange={handleCookingTimeChange}
                className="w-20 p-1 border border-gray-300 rounded-md"
            />
            <span>Jam</span>
            <input
                type="number"
                name="menit"
                value={formData.cookingTime.menit}
                onChange={handleCookingTimeChange}
                className="w-20 p-1 border border-gray-300 rounded-md"
            />
            <span>Menit</span>
            </div>
        </div>

        <div>
            <label className="block font-bold text-black mb-4">Kategori</label>
            <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            >
            <option>Makan Siang</option>
            <option>Makan Malam</option>
            <option>Sarapan</option>
            <option>Snack</option>
            <option>Minuman</option>
            <option>Salad</option>
            </select>
        </div>

        <div>
            <label className="block font-bold text-gray-800 mb-4">Informasi Nutrisi</label>
            <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData.nutrition).map((key) => (
                <div key={key}>
                <label className="block text-sm text-gray-600 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                    type="text"
                    name={key}
                    value={formData.nutrition[key]}
                    onChange={handleNutritionChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                />
                </div>
            ))}
            </div>
        </div>

        {msg && (
            <p className={`text-center ${msg.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
            {msg}
            </p>
        )}
        </div>

      <Footer />
    </div>
  );
}