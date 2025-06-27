"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/app/Dashboard/Components/Navbar";
import Footer from "@/app/Dashboard/Components/Footer";

import { createRecipe } from "@/lib/recipes";
import { addStepToRecipe } from "@/lib/steps";
import { addIngredientToRecipe } from "@/lib/ingredients";
import { addToolToRecipe } from "@/lib/tools";
import { addNutritionToRecipe } from "@/lib/nutrition";

interface IngredientState { name: string; amount: string; unit: string; }
interface ToolState { name: string; }
interface StepState { description: string; }
interface NutritionState { name: string; value: string; unit: string; }

export default function TambahResepPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cookTime, setCookTime] = useState("30");
  const [portionSize, setPortionSize] = useState("1 porsi");
  const [category, setCategory] = useState("Makan Siang");
  const [label, setLabel] = useState("Halal");

  const [ingredients, setIngredients] = useState<IngredientState[]>([{ name: '', amount: '', unit: '' }]);
  const [tools, setTools] = useState<ToolState[]>([{ name: '' }]);
  const [steps, setSteps] = useState<StepState[]>([{ description: '' }]);
  const [nutritions, setNutritions] = useState<NutritionState[]>([
    { name: 'Kalori', value: '', unit: 'kcal' },
    { name: 'Lemak', value: '', unit: 'g' },
    { name: 'Protein', value: '', unit: 'g' },
    { name: 'Karbohidrat', value: '', unit: 'g' },
    { name: 'Kolestrol', value: '', unit: 'mg' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDynamicChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: 'ingredients' | 'tools' | 'steps') => {
    if (field === 'ingredients') {
      const list = [...ingredients];
      list[index][event.target.name as keyof IngredientState] = event.target.value;
      setIngredients(list);
    } else if (field === 'tools') {
      const list = [...tools];
      list[index][event.target.name as keyof ToolState] = event.target.value;
      setTools(list);
    } else if (field === 'steps') {
      const list = [...steps];
      list[index][event.target.name as keyof StepState] = event.target.value;
      setSteps(list);
    }
  };

  const handleNutritionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newNutritions = [...nutritions];
    newNutritions[index].value = event.target.value;
    setNutritions(newNutritions);
  };

  const addDynamicField = (field: 'ingredients' | 'tools' | 'steps') => {
    if (field === 'ingredients') setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
    if (field === 'tools') setTools([...tools, { name: '' }]);
    if (field === 'steps') setSteps([...steps, { description: '' }]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !photo) {
      toast.error("Judul dan Foto Resep wajib diisi!");
      return;
    }
    setIsSubmitting(true);
    const loadingToast = toast.loading("Mempublikasikan resep...");

    try {
      const recipeFormData = new FormData();
      recipeFormData.append('title', title);
      recipeFormData.append('description', description);
      recipeFormData.append('photo', photo);
      recipeFormData.append('cook_time', cookTime);
      recipeFormData.append('portion_size', portionSize);
      recipeFormData.append('category', category);
      recipeFormData.append('label', label);

      const newRecipe = await createRecipe(recipeFormData);
      const newRecipeId = newRecipe.id;

      if (!newRecipeId) throw new Error("Gagal membuat resep utama.");

      toast.loading("Menambahkan detail resep...", { id: loadingToast });

      const detailPromises = [
        ...ingredients.filter(i => i.name).map(i => addIngredientToRecipe(newRecipeId, {
          ingredient_name: i.name, ingredient_amount: parseFloat(i.amount) || 0, ingredient_unit: i.unit
        })),
        ...tools.filter(t => t.name).map(t => addToolToRecipe(newRecipeId, { tool_name: t.name })),
        ...steps.filter(s => s.description).map((s, i) => addStepToRecipe(newRecipeId, { step_number: i + 1, step_description: s.description })),
        ...nutritions.filter(n => n.value).map(n => addNutritionToRecipe(newRecipeId, {
          nutrition_name: n.name, nutrition_value: parseFloat(n.value) || 0, nutrition_unit: n.unit
        }))
      ];

      await Promise.all(detailPromises);

      toast.success("Resep berhasil dipublikasikan!", { id: loadingToast });
      router.push('/ResepSaya');
      router.refresh();

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan.";
      console.error("ERROR DETAIL:", err.response?.data || err);
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Toaster position="top-center" />
      <Navbar />
      <form onSubmit={handleSubmit} className="flex-grow p-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Buat Resep Baru</h2>
          <button type="submit" disabled={isSubmitting} className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-60">
            {isSubmitting ? "Memublikasikan..." : "Publikasikan"}
          </button>
        </div>
        <hr className="bg-blue-900 w-full border-none rounded h-1 mb-5" />

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block font-bold text-gray-800 mb-2">Judul Resep</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300" required />
          </div>
          <div>
            <label className="block font-bold text-gray-800 mb-2">Gambar Resep</label>
            {photoPreview ? (
             <img src={photoPreview} alt="Preview" className="w-full h-64 object-cover rounded-md mb-2" />
             ) : (
              <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                  <span className="text-gray-500">Belum ada gambar</span>
              </div>
              )}
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </div>
          <div>
            <label className="block font-bold text-gray-800 mb-2">Deskripsi</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300" />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-2">Alat-alat</label>
            {tools.map((tool, i) => (
              <input key={i} value={tool.name} name="name" onChange={e => handleDynamicChange(i, e, 'tools')} placeholder={`Alat ${i + 1}`} className="w-full p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300 mb-2" />
            ))}
            <button type="button" onClick={() => addDynamicField('tools')} className="text-sm text-blue-600 hover:underline">+ Tambah alat</button>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block font-bold text-gray-800 mb-2">Bahan-bahan</label>
            {ingredients.map((ing, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={ing.name} name="name" onChange={e => handleDynamicChange(i, e, 'ingredients')} placeholder={`Bahan ${i + 1}`} className="flex-grow p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300" />
                <input value={ing.amount} name="amount" onChange={e => handleDynamicChange(i, e, 'ingredients')} placeholder="Jumlah" className="w-24 p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300" />
                <input value={ing.unit} name="unit" onChange={e => handleDynamicChange(i, e, 'ingredients')} placeholder="Satuan" className="w-32 p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300" />
              </div>
            ))}
            <button type="button" onClick={() => addDynamicField('ingredients')} className="text-sm text-blue-600 hover:underline">+ Tambah bahan</button>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-2">Instruksi Memasak</label>
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <span className="font-bold pt-2">{i + 1}.</span>
                <textarea value={step.description} name="description" onChange={e => handleDynamicChange(i, e, 'steps')} className="w-full p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300" rows={2} />
              </div>
            ))}
            <button type="button" onClick={() => addDynamicField('steps')} className="text-sm text-blue-600 hover:underline">+ Tambah langkah</button>
          </div>

          {/* Info Tambahan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
            <div>
              <label className="block font-bold text-gray-800 mb-2">Waktu Memasak (menit)</label>
              <input type="number" value={cookTime} onChange={e => setCookTime(e.target.value)} className="w-full p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300" />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-2">Porsi</label>
              <input type="text" value={portionSize} onChange={e => setPortionSize(e.target.value)} className="w-full p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300" />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-2">Kategori</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300 bg-white">
                <option>Makan Siang</option>
                <option>Makan Malam</option>
                <option>Sarapan</option>
                <option>Snack</option>
                <option>Minuman</option>
                <option>Salad</option>
              </select>
            </div>
          </div>

          {/* Nutrisi */}
          <div>
            <label className="block font-bold text-gray-800 mb-4">Informasi Nutrisi</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nutritions.map((item, index) => (
                <div key={item.name}>
                  <label className="block text-sm text-gray-600 mb-1">{item.name} ({item.unit})</label>
                  <input type="number" step="any" value={item.value} onChange={e => handleNutritionChange(index, e)} className="w-full p-2 border border-gray-500 rounded-md focus:ring focus:ring-blue-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}
