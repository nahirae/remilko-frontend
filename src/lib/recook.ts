/**
 * @file This file contains the API client for Recook operations.
 * It defines interfaces for API responses and functions to interact with the backend,
 * leveraging the centralized 'api.ts' for requests and authentication.
 */

// Import fungsi-fungsi request dari api.ts yang sudah ada
import { getAuth, postAuth, putAuth, deleteAuth } from './api';
// Import interfaces dari file lain jika diperlukan, misal User dan Recipe dari 'admin.ts'
// Asumsi Anda sudah punya User dan Recipe interface di 'admin.ts' atau 'recipe.ts'
import { User, Recipe } from './admin'; // Atau dari './recipe' jika Anda mendefinisikannya di sana

// --- Interfaces ---

/**
 * Interface untuk metadata respons API yang konsisten.
 * (Bisa diimpor dari tempat lain jika sudah didefinisikan secara global, misal dari api.ts jika ada)
 */
interface ApiResponseMeta {
  code: number;
  status: string; // 'success' | 'error'
  message: string;
  pagination?: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
}

/**
 * Interface untuk Recook model dari backend.
 * Sudah dilengkapi dengan relasi user dan recipe.
 */
export interface Recook {
  id: string; // Menggunakan string karena Str::random(8)
  user_id: string;
  recipe_id: string;
  photo_recook: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  taste: 'Enak' | 'Biasa' | 'Tidak Enak';
  description: string;
  status: 'Menunggu' | 'Diterima' | 'Ditolak';
  created_at: string;
  updated_at: string;
  user?: User; // Relasi user (opsional jika tidak selalu di-load)
  recipe?: Recipe; // Relasi recipe (opsional jika tidak selalu di-load)
}

/**
 * Interface untuk payload saat membuat recook baru.
 */
export interface CreateRecookPayload {
  photo_recook: File; // Menggunakan File untuk upload gambar
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  taste: 'Enak' | 'Biasa' | 'Tidak Enak';
  description: string;
}

/**
 * Interface untuk payload saat memperbarui recook.
 * Semua properti opsional karena ini adalah update (PATCH/PUT).
 */
export interface UpdateRecookPayload {
  photo_recook?: File;
  difficulty?: 'Mudah' | 'Sedang' | 'Sulit';
  taste?: 'Enak' | 'Biasa' | 'Tidak Enak';
  description?: string;
}


// --- API Response Interfaces (sesuai struktur respons Laravel) ---

/**
 * Respons untuk `index` (list recooks user).
 */
interface RecooksListApiResponse {
  data: {
    recooks: Recook[];
  };
  meta: ApiResponseMeta;
}

/**
 * Respons untuk `show`, `store`, `update` (single recook).
 */
interface SingleRecookApiResponse {
  data: {
    recook: Recook;
  };
  meta: ApiResponseMeta;
}

/**
 * Respons untuk `destroy` (hanya meta).
 */
interface RecookDeleteApiResponse {
  meta: ApiResponseMeta;
}

// --- API Functions ---

/**
 * Mendapatkan daftar semua recook milik user yang sedang login.
 * @returns Promise yang resolve ke array Recook.
 */
export const getUserRecooks = async (): Promise<Recook[]> => {
  return (await getAuth<RecooksListApiResponse>('/user/recooks')).data.recooks;
};

/**
 * Mendapatkan detail recook berdasarkan ID recook dan ID resep.
 * @param recipeId ID resep terkait.
 * @param recookId ID recook yang ingin dilihat.
 * @returns Promise yang resolve ke objek Recook.
 */
export const getRecookById = async (recipeId: string, recookId: string): Promise<Recook> => {
  return (await getAuth<SingleRecookApiResponse>(`/user/recipes/${recipeId}/recooks/${recookId}`)).data.recook;
};

/**
 * Membuat recook baru untuk resep tertentu.
 * @param recipeId ID resep yang akan di-recook.
 * @param payload Data untuk membuat recook baru.
 * @returns Promise yang resolve ke objek Recook yang baru dibuat.
 */
export const createRecook = async (recipeId: string, payload: CreateRecookPayload): Promise<Recook> => {
  const formData = new FormData();
  formData.append('photo_recook', payload.photo_recook);
  formData.append('difficulty', payload.difficulty);
  formData.append('taste', payload.taste);
  formData.append('description', payload.description);

  // Axios akan secara otomatis mengatur Content-Type ke multipart/form-data
  return (await postAuth<SingleRecookApiResponse>(`/user/recipes/${recipeId}/recooks`, formData)).data.recook;
};

/**
 * Memperbarui recook yang sudah ada.
 * @param recipeId ID resep terkait.
 * @param recookId ID recook yang akan diperbarui.
 * @param payload Data yang akan diperbarui.
 * @returns Promise yang resolve ke objek Recook yang diperbarui.
 */
export const updateRecook = async (recipeId: string, recookId: string, payload: UpdateRecookPayload): Promise<Recook> => {
  const formData = new FormData();
  // Hanya tambahkan ke FormData jika properti ada di payload
  if (payload.photo_recook) {
    formData.append('photo_recook', payload.photo_recook);
  }
  if (payload.difficulty) {
    formData.append('difficulty', payload.difficulty);
  }
  if (payload.taste) {
    formData.append('taste', payload.taste);
  }
  if (payload.description) {
    formData.append('description', payload.description);
  }

  // Laravel juga bisa menerima PUT/PATCH dengan FormData
  // Pastikan metode HTTP di backend Anda benar
  return (await postAuth<SingleRecookApiResponse>(`/user/recipes/${recipeId}/recooks/${recookId}?_method=PUT`, formData)).data.recook;
  // Catatan: Laravel biasanya mengharapkan _method=PUT/PATCH untuk FormData.
  // Jika backend Anda bisa langsung menerima PUT/PATCH dengan FormData tanpa _method,
  // Anda bisa ganti postAuth menjadi putAuth:
  // return (await putAuth<SingleRecookApiResponse>(`/user/recipes/${recipeId}/recooks/${recookId}`, formData)).data.recook;
};

/**
 * Menghapus recook.
 * @param recipeId ID resep terkait.
 * @param recookId ID recook yang akan dihapus.
 * @returns Promise yang resolve ke pesan sukses dari meta.
 */
export const deleteRecook = async (recipeId: string, recookId: string): Promise<string> => {
  return (await deleteAuth<RecookDeleteApiResponse>(`/user/recipes/${recipeId}/recooks/${recookId}`)).meta.message;
};


import { getAuth } from "@/lib/api";
import type { Pagination, Recipe } from "./recipes";

export interface Recook {
  id: string;
  recipe_id: string;
  user_id: string;
  photo_recook: string | null;
  difficulty: string;
  taste: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  recipe?: Recipe;
  user?: {
    id: string;
    name: string;
    photo_user: string | null;
  };
}

interface RecooksApiResponse {
  data: Recook[];
  links: any;
  meta: {
    pagination: Pagination;
  };
}

export const getAllPublicRecooks = async (): Promise<Recook[]> => {
  try {
    const recipeResponse = await getRecipes({ page: 1 });
    const recipes = recipeResponse.recipes;
    const recookPromises = recipes.map(async (recipe) => {
      try {
        const recookRes = await getAuth<{ data: Recook[] }>(`/user/recipes/${recipe.id}/recooks`);
        
        return recookRes.data.map((r) => ({
          ...r,
          recipe: {
            id: recipe.id,
            title: recipe.title,
            photo: recipe.photo,
          },
        }));
      } catch (error) {
        return [];
      }
    });

    const recooksByRecipe = await Promise.all(recookPromises);
    const allRecooks = recooksByRecipe.flat();
    // Urutkan semua recook berdasarkan tanggal terbaru
    allRecooks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return allRecooks;

  } catch (error) {
    console.error("Gagal mengambil semua recook:", error);
    return [];
  }
};

export const getRecooksByRecipe = async (recipeId: string): Promise<Recook[]> => {
  if (!recipeId) return [];
  try {
    const response = await getAuth(`/user/recipes/${recipeId}/recooks`);
    return response.data || [];
  } catch (error) {
    console.warn(`Gagal mengambil data recook untuk resep ${recipeId}:`, error);
    return [];
  }
};

export const getPublicRecookFeed = async (page: number = 1): Promise<{ recooks: Recook[]; pagination: Pagination | null }> => {
  try {
    const response = await getAuth<RecooksApiResponse>(`/user/recooks?page=${page}`);
    return {
      recooks: response.data || [],
      pagination: response.meta?.pagination || null
    };
  } catch (error) {
    console.error("Gagal mengambil feed recook:", error);
    return { recooks: [], pagination: null };
  }
};