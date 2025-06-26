import { getAuth, postAuth, putAuth, deleteAuth } from './api';

export interface Ingredient {
  id: string;
  recipe_id: string;
  ingredient_name: string;
  ingredient_amount: number;
  ingredient_unit: string;
}

export interface IngredientsApiResponse {
  data: {
    ingredients: Ingredient[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
  };
}

interface SingleIngredientApiResponse {
  data: Ingredient;
}

export const getIngredients = async (recipeId: string): Promise<Ingredient[]> => {
  if (!recipeId) return [];

  try {
    const response = await getAuth<IngredientsApiResponse>(
      `/user/recipes/${recipeId}/ingredients`
    );
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching ingredients for recipe_id ${recipeId}:`, error);
    return [];
  }
};

//creator
export const addIngredientToRecipe = async (recipeId: string, ingredientData: { ingredient_name: string, ingredient_amount: number, ingredient_unit: string }): Promise<Ingredient> => {
  const response = await postAuth<SingleIngredientApiResponse>(`/creator/recipes/${recipeId}/ingredients`, ingredientData);
  return response.data;
};

export const updateIngredient = async (recipeId: string, ingredientId: string, ingredientData: { ingredient_name?: string, ingredient_amount?: number, ingredient_unit?: string }): Promise<Ingredient> => {
  const response = await putAuth<SingleIngredientApiResponse>(`/creator/recipes/${recipeId}/ingredients/${ingredientId}`, ingredientData);
  return response.data;
};

export const deleteIngredient = async (recipeId: string, ingredientId: string): Promise<void> => {
  await deleteAuth(`/creator/recipes/${recipeId}/ingredients/${ingredientId}`);
};