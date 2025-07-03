import { getAuth, postAuth } from "./api";
import { getSteps } from "./steps";

// Sebaiknya tipe-tipe ini berada di satu file terpusat (misal: types.ts) agar bisa diimpor di mana saja.
type Recipe = { id: string; title: string; description: string; photo: string; category: string | null; cook_time: number; created_at: string; };
type Nutrition = { name: string; amount: number; unit: string; };
type Step = { id: string; recipe_id: string; step_number: number; step_description: string; photo_step?: string; };
type Ingredient = { name: string; amount: string; };
type Tool = { name: string; };

export interface RecipeDetailBundle {
  recipe: Recipe;
  nutritions: Nutrition[];
  ingredients: Ingredient[];
  tools: Tool[];
  steps: Step[];
  isBookmarked: boolean;
}

export async function getRecipeDetailBundle(recipeId: string): Promise<RecipeDetailBundle> {
  if (!recipeId) {
    throw new Error("ID resep tidak valid untuk fetching.");
  }

  try {
    const responses = await Promise.all([
      getAuth(`/user/recipes/${recipeId}`),
      getAuth(`/user/recipes/${recipeId}/nutritions`),
      getAuth(`/user/recipes/${recipeId}/ingredients`),
      getAuth(`/user/recipes/${recipeId}/tools`),
      getSteps(recipeId, 1),
      postAuth("/user/favorites/check", { recipe_id: recipeId }),
    ]);

    const [recipeRes, nutritionRes, ingredientsRes, toolsRes, stepsRes, favoriteCheck] = responses;
    
    if (!recipeRes || recipeRes.meta?.code !== 200 || !recipeRes.data) {
      throw new Error(`Resep dengan ID ${recipeId} tidak dapat ditemukan.`);
    }

    return {
      recipe: recipeRes.data,
      nutritions: Array.isArray(nutritionRes?.data) ? nutritionRes.data : [],
      ingredients: Array.isArray(ingredientsRes?.data) ? ingredientsRes.data : [],
      tools: Array.isArray(toolsRes?.data) ? toolsRes.data : [],
      steps: stepsRes || [],
      isBookmarked: favoriteCheck?.is_favorited || false,
    };
  } catch (error) {
    console.error("Terjadi kesalahan di dalam getRecipeDetailBundle:", error);
    throw error;
  }
}