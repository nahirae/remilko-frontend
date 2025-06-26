import { getAuth } from './api';

interface Nutrition {
  id: string;
  recipe_id: string;
  nutrition_name: string;
  nutrition_value: number;
  nutrition_unit: string;
  created_at: string;
  updated_at: string;
}

interface NutritionsApiResponse {
  data: {
    nutritions: Nutrition[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
  };
}

interface SingleNutritionApiResponse {
  data: Nutrition;
}

export const getPublicRecipeNutritions = async (recipeId: string): Promise<Nutrition[]> => {
  if (!recipeId) return [];
  try {
    const response = await getAuth<{ data: Nutrition[] }>(`/user/recipes/${recipeId}/nutritions`);
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching nutritions for recipe ${recipeId}:`, error);
    return [];
  }
};

export const getNutritions = async (recipeId: string, page: number = 1): Promise<Nutrition[]> => {
  const response = await getAuth<NutritionsApiResponse>(`/user/recipes/${recipeId}/nutritions?page=${page}`);
  return response.data.nutritions;
};

//creator
export const addNutritionToRecipe = async (recipeId: string, nutritionData: { nutrition_name: string, nutrition_value: number, nutrition_unit: string }): Promise<Nutrition> => {
  const response = await postAuth<SingleNutritionApiResponse>(`/creator/recipes/${recipeId}/nutritions`, nutritionData);
  return response.data;
};

export const updateNutrition = async (recipeId: string, nutritionId: string, nutritionData: { nutrition_name?: string, nutrition_value?: number, nutrition_unit?: string }): Promise<Nutrition> => {
  const response = await putAuth<SingleNutritionApiResponse>(`/creator/recipes/${recipeId}/nutritions/${nutritionId}`, nutritionData);
  return response.data;
};

export const deleteNutrition = async (recipeId: string, nutritionId: string): Promise<void> => {
  await deleteAuth(`/creator/recipes/${recipeId}/nutritions/${nutritionId}`);
};