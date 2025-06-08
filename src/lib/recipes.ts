import { getAuth } from './api';

export interface RecipeStep {
  id: number;
  step_number: number;
  description: string;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  quantity: string;
}

export interface RecipeNutrition {
  id: number;
  nutrient: string;
  value: string;
}

export interface RecipeTool {
  id: number;
  name: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  rating: number;
  price_estimate: number;
  cook_time: number;
  portion_size: string;
  category: string | null;
  label: string;
  photo: string;
  url_video: string;
  created_at: string;
  updated_at: string;
  user?: string;
  profile?: string;
}

interface RecipesResponse {
  data: {
    recipes: Recipe[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

// Dapatkan semua resep (dengan pagination)
export const getRecipes = async (
  page: number = 1
): Promise<{ recipes: Recipe[]; pagination: Pagination }> => {
  const response = await getAuth<RecipesResponse>(`/user/recipes?page=${page}`);
  return {
    recipes: response.data.recipes,
    pagination: response.meta.pagination,
  };
};

// Filter resep (kategori, dll)
export const getFilteredRecipes = async (
  filters: { category?: string },
  page: number = 1
): Promise<Recipe[]> => {
  const response = await getAuth<RecipesResponse>('/user/recipes/filters', {
    params: { ...filters, page },
  });
  return response.data.recipes;
};

// Detail resep berdasarkan ID
export const getRecipeById = async (id: number): Promise<Recipe> => {
  return await getAuth<Recipe>(`/user/recipes/${id}`);
};

// Langkah memasak
export const getRecipeSteps = async (recipeId: number): Promise<RecipeStep[]> => {
  return await getAuth<RecipeStep[]>(`/user/recipes/${recipeId}/steps`);
};

// Bahan-bahan resep
export const getRecipeIngredients = async (recipeId: number): Promise<RecipeIngredient[]> => {
  return await getAuth<RecipeIngredient[]>(`/user/recipes/${recipeId}/ingredients`);
};

// Informasi gizi
export const getRecipeNutritions = async (recipeId: number): Promise<RecipeNutrition[]> => {
  return await getAuth<RecipeNutrition[]>(`/user/recipes/${recipeId}/nutritions`);
};

// Alat yang digunakan
export const getRecipeTools = async (recipeId: number): Promise<RecipeTool[]> => {
  return await getAuth<RecipeTool[]>(`/user/recipes/${recipeId}/tools`);
};
