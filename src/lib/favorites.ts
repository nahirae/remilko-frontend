import { getAuth, postAuth, deleteAuth } from "./api";

// Tipe untuk data favorit
export interface FavoriteRecipe {
  id: string;
  recipe_id: string;
  recipe: {
    id: string;
    title: string;
    label: string;
    cook_time: number;
    rating: number;
    photo: string;
    user?: string;
    profile?: string;
  };
}

export const getFavorites = async (): Promise<FavoriteRecipe[]> => {
  const res = await getAuth("/user/favorites");
  return res.data;
};

export const addFavorite = async (recipeId: string): Promise<void> => {
  await postAuth(`/user/recipes/${recipeId}/favorites`, {});
};

export const removeFavorite = async (recipeId: string): Promise<void> => {
  await deleteAuth(`/user/recipes/${recipeId}/favorites`);
};
