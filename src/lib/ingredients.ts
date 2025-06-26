import { getAuth } from "./api";

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

// export const getIngredients = async (recipeId: string, page: number = 1): Promise<Ingredient[]> => {
//   try {
//     const response = await getAuth<IngredientsApiResponse>(
//       `/user/recipes/${recipeId}/ingredients?page=${page}`
//     );
//     return response.data.ingredients || [];
//   } catch (error) {
//     console.error(`Error fetching ingredients for recipe_id ${recipeId}:`, error);
//     return [];
//   }
// };

// export default { getIngredients };  

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