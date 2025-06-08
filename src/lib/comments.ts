import { getAuth, postAuth, putAuth, deleteAuth } from './api';

interface Comment {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
}

export const getComments = async (recipeId: number): Promise<Comment[]> => {
  return await getAuth(`/user/recipes/${recipeId}/comments`);
};

export const addComment = async (recipeId: number, content: string): Promise<void> => {
  await postAuth(`/user/recipes/${recipeId}/comments`, { content });
};

export const updateComment = async (recipeId: number, commentId: number, content: string): Promise<void> => {
  await putAuth(`/user/recipes/${recipeId}/comments/${commentId}`, { content });
};

export const deleteComment = async (recipeId: number, commentId: number): Promise<void> => {
  await deleteAuth(`/user/recipes/${recipeId}/comments/${commentId}`);
};