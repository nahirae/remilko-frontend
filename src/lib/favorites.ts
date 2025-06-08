import { getAuth, postAuth, deleteAuth } from './api';

interface Favorite {
  id: number;
  recipe_id: number;
}

export async function addFavorite(recipeId: number) {
  return await postAuth('/user/favorites', { recipe_id: recipeId });
}

export async function removeFavorite(recipeId: number) {
  return await deleteAuth(`/user/favorites/${recipeId}`);
}

export const getFavorites = async (): Promise<Favorite[]> => {
  return await getAuth('/user/favorites');
};

export const checkFavorite = async (recipeId: number): Promise<boolean> => {
  const response = await postAuth('/user/favorites/check', { recipe_id: recipeId });
  return response.is_favorited;
};
