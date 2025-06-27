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
    const url = `/creator/recipes/${recipeId}/comments`;
    const response = await getAuth<CommentsApiResponse>(url);
    return response.data.comments || [];
  } catch (error) {
    console.warn(`Gagal mengambil komentar untuk resep ${recipeId}`);
    return [];
  }
};

export const postComment = async (recipeId: string, comment_text: string): Promise<Comment> => {
  const url = `/creator/recipes/${recipeId}/comments`;
  const response = await postAuth<SingleCommentApiResponse>(url, { comment_text });
  return response.data;
};

export const updateComment = async (recipeId: string, commentId: string, comment_text: string): Promise<Comment> => {
  const url = `/creator/recipes/${recipeId}/comments/${commentId}`;
  const response = await putAuth<SingleCommentApiResponse>(url, { comment_text });
  return response.data;
};

export const deleteComment = async (recipeId: string, commentId: string): Promise<void> => {
  const url = `/creator/recipes/${recipeId}/comments/${commentId}`;
  await deleteAuth(url);
};