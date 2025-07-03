import { getAuth } from './api';
import { getRecipes } from './recipes';

export interface RecipeCategory {
  id: string;
  recipe_id: string;
  category_name: string;
  photo_category: string | null;
  created_at?: string;
  updated_at?: string;
}

interface RecipeCategoryApiResponse {
  data: {
    categories: RecipeCategory[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
  };
}

export const getAllCategoriesFromRecipes = async (): Promise<string[]> => {
  try {
    const allCategories: Set<string> = new Set();
    let page = 1;
    let lastPage = 1;

    do {
      const { recipes, pagination } = await getRecipes(page);
      recipes.forEach((r) => {
        r.categories?.forEach((cat) => {
          if (cat.category_name) {
            allCategories.add(cat.category_name.trim());
          }
        });
      });
      lastPage = pagination.total_pages;
      page++;
    } while (page <= lastPage);

    return Array.from(allCategories);
  } catch (error) {
    console.error("Gagal mengambil kategori dari resep:", error);
    return [];
  }
};

// Fetch all categories for a given recipe
export const getRecipeCategories = async (recipeId: string): Promise<RecipeCategory[]> => {
  const response: RecipeCategoryApiResponse = await getAuth(`/recipes/${recipeId}/categories`);
  return response.data.categories;
};

export async function getAllCategories(): Promise<RecipeCategory[]> {
  try {
    const response = await getAuth<{ data: RecipeCategory[] }>('/user/recipe-categories');
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil daftar kategori:", error);
    throw error;
  }
}
