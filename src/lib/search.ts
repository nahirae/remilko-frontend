import { getAuth } from "./api";
import type { Recipe } from "./recipes";

interface SearchRecipe {
  id: string;
  title: string;
}

interface SearchIngredient {
  id: string;
  ingredient_name: string;
  recipe_id: string;
  created_at: string;
  updated_at: string;
}

interface SearchCreator {
  id: string;
  name: string;
  username: string;
  photo_user: string | null;
  role: string;
  email: string;
}

export interface SearchResults {
  recipes: SearchRecipe[];
  ingredients: SearchIngredient[];
  creators: SearchCreator[];
}

interface SearchApiResponse {
  data: SearchResults;
  meta: any;
  // meta: {
  //   code: number;
  //   status: string;
  //   message: string;
  // };
}

interface GlobalSearchResult {
  recipes: Recipe[];
  ingredients: any[];
  creators: any[];
}

export const globalSearch = async (query: string): Promise<SearchApiResponse> => {
  if (!query.trim()) {
    // Jika query kosong, kembalikan hasil kosong tanpa memanggil API
    return { 
      data: { recipes: [], ingredients: [], creators: [] },
      meta: {}
    };
  }
  
  const response = await getAuth(`/dashboard/search?q=${encodeURIComponent(query)}`);
  return response;
};

export const getSearchResults = async (query: string): Promise<SearchResults> => {
  const response = await getAuth(`/dashboard/search?q=${encodeURIComponent(query)}`);
  return response.data;
};