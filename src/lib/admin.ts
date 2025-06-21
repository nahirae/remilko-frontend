// src/lib/admin.ts
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/admin'; // Ganti jika base URL berbeda

// --- General API Request Function ---
async function apiRequest<T>(method: 'get' | 'post' | 'put' | 'delete' | 'patch', url: string, data?: any, params?: any): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    throw new Error('Anda belum login atau sesi telah berakhir.');
  }

  try {
    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: params,
    };

    if (method === 'post' && data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    const response = await axios({ method, url, data, ...config });

    if (response.data && response.data.meta && response.data.meta.status === 'success') {
      return response.data;
    } else {
      const errorMessage = response.data?.meta?.message || 'Terjadi kesalahan tidak dikenal dari server.';
      throw new Error(errorMessage);
    }
  } catch (error: any) {
    console.error(`API Error (${method.toUpperCase()} ${url}):`, error.response?.data || error.message);

    const apiErrorMessage = error.response?.data?.meta?.message || error.message;
    const validationErrors = error.response?.data?.meta?.errors;

    if (validationErrors) {
      const formattedErrors = Object.values(validationErrors).flat().join(', ');
      throw new Error(`Validasi Gagal: ${formattedErrors}`);
    } else if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
      }
      throw new Error("Sesi login Anda telah berakhir. Silakan login ulang.");
    } else {
      throw new Error(apiErrorMessage);
    }
  }
}

// --- Interfaces ---
export interface PaginationMeta { current_page: number; last_page: number; per_page: number; total: number; from?: number; to?: number; }
export interface ApiResponse<T> { data: T; meta: { code: number; status: string; message: string; pagination?: PaginationMeta; errors?: any; }; }

export interface Recook {
  id: string; user_id: string | null; user_name: string; recipe_id: string | null; recipe_title: string;
  recook_photo: string | null; difficulty: string | null; taste: string | null; description: string;
  status: 'menunggu' | 'diterima' | 'ditolak' | string; notes: string | null; created_at_human: string;
  created_at_iso: string;
}

export interface Recipe {
  id: string; title: string; description: string; rating?: number; price_estimate?: number; cook_time?: string;
  portion_size?: number; label?: string; photo?: string | null; url_video?: string | null; is_recommended: boolean;
  created_at: string; updated_at: string; creator_name?: string; created_at_human?: string;
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  email: string;
  status: 'pending' | 'accepted' | 'rejected' | string;
  photo_user?: string | null;
}


// --- API Call Functions ---
interface DashboardStatsData { total_recipes: number; total_recooks: number; pending_recooks: number; invited_creators_count: number; }
export const getDashboardStats = async (): Promise<DashboardStatsData> => {
  const response = await apiRequest<ApiResponse<DashboardStatsData>>('get', `${API_BASE_URL}/stats`);
  return response.data;
};

interface GetRecookVerificationsData { recooks: Recook[]; }
export interface GetRecookVerificationsParams { status?: 'menunggu' | 'diterima' | 'ditolak'; per_page?: number; page?: number; }
export const getRecookVerifications = async (params: GetRecookVerificationsParams): Promise<ApiResponse<GetRecookVerificationsData>> => {
  const response = await apiRequest<ApiResponse<GetRecookVerificationsData>>('get', `${API_BASE_URL}/recooks-verifications`, null, params);
  return response;
};

interface ApproveRejectRecookData { recook: Recook; }
export const approveRecook = async (recookId: string): Promise<string> => {
  const response = await apiRequest<ApiResponse<ApproveRejectRecookData>>('post', `${API_BASE_URL}/recooks/${recookId}/approve`);
  return response.meta.message;
};

export const rejectRecook = async (recookId: string): Promise<string> => {
  const response = await apiRequest<ApiResponse<ApproveRejectRecookData>>('post', `${API_BASE_URL}/recooks/${recookId}/reject`);
  return response.meta.message;
};

interface GetRecipesRecommendationData { recipes: Recipe[]; }
export interface GetRecipesRecommendationParams { filter?: 'all' | 'recommended' | 'not_recommended'; search?: string; per_page?: number; page?: number; }
export const getRecipesWithRecommendationStatus = async (params: GetRecipesRecommendationParams): Promise<ApiResponse<GetRecipesRecommendationData>> => {
  const response = await apiRequest<ApiResponse<GetRecipesRecommendationData>>('get', `${API_BASE_URL}/recipes-recommendations`, null, params);
  return response;
};

interface ToggleRecommendationResponse { recipe: Recipe; } // Asumsi response data memiliki properti recipe
export const toggleRecommendation = async (recipeId: string): Promise<string> => {
  // PERBAIKAN KRITIS: URL endpoint HARUS cocok persis dengan error backend: /recipes/{recipeId}/recommendations
  // DAN METODE HARUS 'PUT'
  const response = await apiRequest<ApiResponse<ToggleRecommendationResponse>>('put', `${API_BASE_URL}/recipes/${recipeId}/recommendations`);
  return response.meta.message; // Mengembalikan pesan dari meta
};

interface GetCreatorsListData { creators: Creator[]; }
export interface GetCreatorsListParams {
  status?: 'pending' | 'accepted' | 'rejected' | 'all';
  search?: string;
  per_page?: number;
  page?: number;
}
export const getCreatorsList = async (params: GetCreatorsListParams): Promise<ApiResponse<GetCreatorsListData>> => {
  try {
    const response = await apiRequest<ApiResponse<GetCreatorsListData>>('get', `${API_BASE_URL}/creator-invitations`, null, params);
    return response;
  } catch (error) {
    console.error("Error fetching creators list:", error);
    throw error;
  }
};

// NEW INTERFACE: InviteCreatorParams - untuk parameter fungsi inviteCreator
export interface InviteCreatorParams {
  name: string;
  username: string;
  email: string;
  password: string;
}

// UPDATED FUNCTION: inviteCreator
export const inviteCreator = async (params: InviteCreatorParams): Promise<string> => {
  try {
    // Mengirim semua parameter yang diperlukan sebagai body POST
    const response = await apiRequest<ApiResponse<any>>('post', `${API_BASE_URL}/creator-invitations/invite`, params);
    return response.meta.message;
  } catch (error) {
    console.error("Error inviting creator:", error);
    throw error;
  }
};

export const updateCreatorInvitationStatus = async (creatorId: string, status: 'accepted' | 'rejected'): Promise<string> => {
  try {
    const response = await apiRequest<ApiResponse<any>>('post', `${API_BASE_URL}/creator-invitations/${creatorId}/${status}`);
    return response.meta.message;
  } catch (error) {
    console.error(`Error updating creator invitation status for ${creatorId}:`, error);
    throw error;
  }
};

