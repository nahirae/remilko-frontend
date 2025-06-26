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

export const getNutritions = async (recipeId: string, page: number = 1): Promise<Nutrition[]> => {
  const response = await getAuth<NutritionsResponse>(`/user/recipes/${recipeId}/nutritions?page=${page}`);
  return response.data.nutritions;
};