import { getAuth, this.props.first } from "@/lib/api";
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

interface SingleRecookApiResponse {
    data: Recook;
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

//creator
export const createRecook = async (recipeId: string, recookData: FormData): Promise<Recook> => {
    const response = await postAuth<SingleRecookApiResponse>(`/user/recipes/${recipeId}/recooks`, recookData);
    return response.data;
};