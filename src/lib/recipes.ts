import { getAuth, postAuth, putAuth, deleteAuth } from './api';

export interface RecipeStep {
  id: string;
  step_number: number;
  description: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
}

export interface RecipeNutrition {
  id: string;
  nutrient: string;
  value: string;
}

export interface RecipeTool {
  id: string;
  name: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  photo: string;
  rating: number;
  cook_time: number;
  portion_size: string;
  category: string | null;
  label: string | null;
  created_at: string;
  user: {
    id: string;
    name: string;
    photo_user: string | null;
    profile?: string;
  };
  ingredients?: any[];
  tools?: any[];
  nutrition?: any[];
  steps?: any[];
  recooks?: any[];
  comments?: any[];
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

interface RecipesResponse {
  data: {
    recipes: Recipe[];
  };
  meta: {
    pagination: Pagination;
  };
}

interface SingleRecipeResponse {
  data: Recipe;
}

export interface RecipeFilters {
  page?: number;
  category?: string | null;
  ingredients?: string[];
}

export const getRecipes = async (page: number = 1, category?: string | null): Promise<{ recipes: Recipe[]; pagination: Pagination }> => {
  try {
    let url = `/user/recipes?page=${page}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await getAuth<RecipesResponse>(url);

    return {
      recipes: response.data.recipes,
      pagination: response.meta.pagination,
    };
  } catch (error) {
    console.error(`Gagal mengambil resep (page: ${page}, category: ${category}):`, error);
    throw error;
  }
};

export const getFilteredRecipes = async (filters: RecipeFilters = {}, page: number = 1) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());

  if (filters.category) {
    params.append("category", filters.category);
  }

  if (filters.ingredients && filters.ingredients.length > 0) {
    filters.ingredients.forEach((ing) => {
      params.append("recipeIngredient", ing);
    });
  }


  if (filters.page) params.append('page', filters.page.toString());

  const response = await getAuth(`/user/recipes/filters?${params.toString()}`);

  // return response.data.recipes ? response.data.recipes : [];
  return {
    recipes: response.data,
    pagination: response.meta.pagination,
  };
};

export const getRecipeById = async (id: string): Promise<{ recipe: Recipe }> => {
  const response = await getAuth(`/user/recipes/${id}`);
  return response.data;
};

export const getRecipeSteps = async (recipeId: string): Promise<RecipeStep[]> => {
    const response = await getAuth<{ data: RecipeStep[] }>(`/user/recipes/${recipeId}/steps`);
    return response.data;
};

export const getRecipeIngredients = async (recipeId: string): Promise<RecipeIngredient[]> => {
    const response = await getAuth<{ data: RecipeIngredient[] }>(`/user/recipes/${recipeId}/ingredients`);
    return response.data;
};

export const getRecipeNutritions = async (recipeId: string): Promise<RecipeNutrition[]> => {
    const response = await getAuth<{ data: RecipeNutrition[] }>(`/user/recipes/${recipeId}/nutritions`);
    return response.data;
};

export const getRecipeTools = async (recipeId: string): Promise<RecipeTool[]> => {
    const response = await getAuth<{ data: RecipeTool[] }>(`/user/recipes/${recipeId}/tools`);
    return response.data;
};

//creator
export const getMyCreatorRecipes = async (page: number = 1): Promise<{ recipes: Recipe[]; pagination: Pagination }> => {
  const response = await getAuth<PaginatedRecipesResponse>(`/creator/recipes?page=${page}`);
  return {
    recipes: response.data,
    pagination: response.meta.pagination,
  };
};

export const getCreatorRecipeById = async (recipeId: string): Promise<Recipe> => {
    const response = await getAuth<SingleRecipeResponse>(`/creator/recipes/${recipeId}`);
    return response.data;
};

export const createRecipe = async (recipeData: FormData): Promise<Recipe> => {
    const response = await postAuth<SingleRecipeResponse>('/creator/recipes', recipeData);
    return response.data;
};

export const updateRecipe = async (recipeId: string, recipeData: FormData): Promise<Recipe> => {
    recipeData.append('_method', 'PUT');
    const response = await postAuth<SingleRecipeResponse>(`/creator/recipes/${recipeId}`, recipeData);
    return response.data;
};

export const deleteRecipe = async (recipeId: string): Promise<void> => {
    await deleteAuth(`/creator/recipes/${recipeId}`);
};
