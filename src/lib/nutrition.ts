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

interface NutritionsResponse {
  data: {
    nutritions: Nutrition[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
  };
}

export const getPublicRecipeNutritions = async (recipeId: string): Promise<Nutrition[]> => {
  if (!recipeId) return [];
  try {
    const response = await getAuth<NutritionsResponse>(`/user/recipes/${recipeId}/nutritions`);    
    return response.data.nutrition || [];

  } catch (error) {
    console.error(`Error fetching nutritions for recipe ${recipeId}:`, error);
    return [];
  }
};

export const getNutritions = async (recipeId: string, page: number = 1): Promise<Nutrition[]> => {
  const response = await getAuth<NutritionsResponse>(`/user/recipes/${recipeId}/nutritions?page=${page}`);
  return response.data.nutritions;
};