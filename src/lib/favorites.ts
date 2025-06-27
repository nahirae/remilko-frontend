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

export async function addFavorite(recipeId: number) {
  return await postAuth('/creator/favorites', { recipe_id: recipeId });
}

export async function removeFavorite(recipeId: number) {
  return await deleteAuth(`/creator/favorites/${recipeId}`);
}

// export const getFavorites = async (): Promise<Favorite[]> => {
//   return await getAuth('/creator/favorites');
// };

export const getFavorites = async (): Promise<any[]> => {
  try {
    const res = await getAuth("/user/favorites");
    return res.data || [];
  } catch (err) {
    return [];
  }
};

export const checkFavorite = async (recipeId: number): Promise<boolean> => {
  const response = await postAuth('/creator/favorites/check', { recipe_id: recipeId });
  return response.is_favorited;
};

