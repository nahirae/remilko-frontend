import { getAuth } from './api';
import type { Recipe } from './recipes'; 

// Interface lain yang spesifik untuk dashboard
interface RecookResult {
  id: string;
  photo_recook: string | null;
  recipe_id: string;
  user_id: string;
  status: string;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

// Tipe data untuk keseluruhan respons API dashboard
interface DashboardApiResponse {
  data: {
    trending: Recipe[];
    explore: Recipe[];
    recommended: Recipe[];
    creator_recipes: Recipe[];
    recook_results: RecookResult[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
  };
}

type DashboardData = DashboardApiResponse['data'];

export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await getAuth<DashboardData>('/dashboard');
  return response;
};