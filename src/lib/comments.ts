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

export const getComments = async (recipeId: string): Promise<Comment[]> => {
  if (!recipeId) return [];
  try {
    const response = await getAuth<CommentsApiResponse>(`/user/recipes/${recipeId}/comments`);
    return response.data.comments || [];
    
  } catch (error) {
    console.warn(`Gagal mengambil komentar untuk resep ${recipeId}.`);
    return [];
  }
};

export const postComment = async (
  recipeId: string,
  comment_text: string,
  rating: number
): Promise<Comment> => {
  const response = await postAuth<SingleCommentApiResponse>(
    `/user/recipes/${recipeId}/comments`,
    { comment_text, rating }
  );
  return response.data;
};

export const updateComment = async (recipeId: string, commentId: string, comment_text: string): Promise<Comment> => {
  const response = await putAuth<SingleCommentApiResponse>(`/user/recipes/${recipeId}/comments/${commentId}`, { comment_text });
  return response.data;
};

export const deleteComment = async (recipeId: string, commentId: string): Promise<void> => {
  await deleteAuth(`/user/recipes/${recipeId}/comments/${commentId}`);
};