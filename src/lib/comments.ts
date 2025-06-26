import { getAuth, postAuth, putAuth, deleteAuth } from './api';

export interface Comment {
  id: string;
  comment_text: string;
  rating: number;
  created_at: string;
  user: {
    id: string;
    name: string;
    photo_user: string | null;
  };
}

interface CommentsApiResponse {
  data: {
    comments: Comment[];
  };
}

interface SingleCommentApiResponse {
    data: Comment;
}

export const getCommentsForCreator = async (recipeId: string): Promise<Comment[]> => {
  if (!recipeId) return [];
  try {
    const url = `/creator/recipes/${recipeId}/comments`;
    const response = await getAuth<CommentsApiResponse>(url);
    return response.data.comments || [];
  } catch (error) {
    console.warn(`Gagal mengambil komentar untuk resep ${recipeId}`);
    return [];
  }
};

export const postCommentAsCreator = async (recipeId: string, comment_text: string): Promise<Comment> => {
  const url = `/creator/recipes/${recipeId}/comments`;
  const response = await postAuth<SingleCommentApiResponse>(url, { comment_text });
  return response.data;
};

export const updateCommentAsCreator = async (recipeId: string, commentId: string, comment_text: string): Promise<Comment> => {
  const url = `/creator/recipes/${recipeId}/comments/${commentId}`;
  const response = await putAuth<SingleCommentApiResponse>(url, { comment_text });
  return response.data;
};

export const deleteCommentAsCreator = async (recipeId: string, commentId: string): Promise<void> => {
  const url = `/creator/recipes/${recipeId}/comments/${commentId}`;
  await deleteAuth(url);
};